const router = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");

//Validation schema here
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");

const schema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

const schemaLogin = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

////////////////////////REGISTER USER

router.post("/register", async (req, res) => {
  //Validate the data before creating a user
  const validation = schema.validate(req.body); //will throw an object
  const { error } = validation;
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  //Checking if the user is in database already
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists");

  //HASHing the pass
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(req.body.password, salt);

  //If no errors, and email is unique, then will create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPass,
  });

  try {
    const savedUser = await user.save();
    res.send({ status: "success", user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

///////////////////////LOGIN USER

router.post("/login", async (req, res) => {
  const validationLogin = schemaLogin.validate(req.body); //will throw an object
  const { error } = validationLogin;
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //Checking if the email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email is not found");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Password is incorrect");

  // Create token
  const token = jwt.sign({ _id: user._id }, process.env.SECRET);
  res.header("auth-token", token).send({ token: token });
});

module.exports = router;
