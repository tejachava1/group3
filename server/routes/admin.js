const express = require("express");

const Admin = require("../models/Admin");
const router = new express.Router();

router.get("/admin", async (req, res) => {
  try {
    const admin = await Admin.find({});
    res.send(admin);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/admin", async (req, res) => {
  const admin = req.body;
  try {
    await new Admin(admin).save();
    res.send("inserted");
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/adminLogin", async (req, res) => {
  const user = req.body;
  const { emailId, password } = req.body;
  console.log(user);

  try {
    let userEmail = await Admin.findOne({ emailId });
    let userPassword = await Admin.findOne({ password });
    if (userEmail && userPassword) {
      res.status(201).send("Login Success");
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
