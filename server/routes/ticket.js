const express = require("express");

const Ticket = require("../models/Ticket");
const router = new express.Router();

router.post("/ticket", async (req, res) => {
  const ticket = req.body;
  try {
    await new Ticket(ticket).save();
    res.status(201).send(ticket);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
