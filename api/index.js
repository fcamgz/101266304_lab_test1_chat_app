// libraries
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authenticationRoute = require("./routes/authentication");
const userRoute = require("./routes/user");
const messageRoute = require("./routes/message");
const app = express();

// server setup
dotenv.config();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

const database = process.env.MONGO_DB;

// connect to database
mongoose
  .connect(database)
  .then(() => console.log(`Database connection successful`))
  .catch((err) => console.log(`Database connection error ${err}`));

// routes
app.use("/api", authenticationRoute);
app.use("/api", userRoute);
app.use("/api", messageRoute);

// creating server
app.listen(process.env.PORT || 5000, () =>
  console.log("Server is running on Port 5000")
);
