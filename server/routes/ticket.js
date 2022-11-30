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
router.put("/ticket/:id", async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);

  try {
    const ticket = await Ticket.findById(_id);
    updates.forEach((update) => (ticket[update] = req.body[update]));
    await ticket.save();
    return !ticket ? res.sendStatus(404) : res.status(201).send(ticket);
  } catch (e) {
    return res.status(400).send(e);
  }
});
router.get("/ticket/:userId", async (req, res)=> {
  const userId = req.params.userId;
  try {
    const tickets = await Ticket.find({userId: userId});
    res.status(201).send(tickets);
  } catch(e) {
    res.status(400).send(e);
  }
})


router.get("/ticket/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const tickets = await Ticket.find({ userId: userId });
    res.status(201).send(tickets);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
