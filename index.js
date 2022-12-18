const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
//Import Routes
const authRoute = require("./routes/auth");

const postRoute = require("./routes/posts");

dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_PASSWORD, { useNewUrlParser: true }, () =>
  console.log("Connected to DB!")
);

//Middleware
app.use(express.json());

//Route middlewares
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);

// app.listen(3000, () => console.log("Server running on port 3000"));

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
