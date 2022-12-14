const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("auth-token"); //checks when we send request if it has token

  if (!token) return res.status(401).send("Access Denied.");
  try {
    const verified = jwt.verify(token, process.env.SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token.");
  }
};

// You can add this function as a middleware to protect any provate routes, to check if token is available
