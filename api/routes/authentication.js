const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { username, password, firstname, lastname } = req.body;
  if (typeof username != "string") {
    return res.send({
      message: "Username needs to be a string",
      status: "error",
    });
  }
  if (typeof password != "string") {
    return res.send({
      message: "Password needs to be a string",
      status: "error",
    });
  }
  if (typeof password.length < 4) {
    return res.send({
      message: "Password length has to be more than 4 characters",
      status: "error",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({
      username: username,
      password: hashedPassword,
      firstname: firstname,
      lastname: lastname,
    });
    res.send({ message: `User ${user.username} has created`, status: "ok" });
  } catch (err) {
    res.send({ message: err.message, status: "error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    username,
  });

  if (!user) {
    return res.send({ status: "error", message: "Invalid username/password" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET
    );
    res.cookie("jwt", token, { httpOnly: true, maxAge: 15000000 });
    return res.send({ status: "ok", data: user });
  }
});

router.get("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/login");
});

module.exports = router;
