const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/getUser/:userId", async (req, res) => {
  const user = await User.findById(req.params.userId);
  res.send(user);
});

module.exports = router;
