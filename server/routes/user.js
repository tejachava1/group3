const express = require("express");

const User = require("../models/Users");
const router = new express.Router();

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/user", async (req, res) => {
  const user = req.body;
  console.log("data");
  console.log(user);
  try {
    await new User(user).save();
    res.send("inserted");
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/userLogin", async (req, res) => {
  const user = req.body;
  const { emailId, password } = req.body;
  console.log(user);

  try {
    let userEmail = await User.findOne({ emailId });
    let userPassword = await User.findOne({ password });
    if (userEmail && userPassword) {
      res.status(201).send(userEmail);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
