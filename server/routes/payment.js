const express = require("express");

const Payment = require("../models/Movies");
const router = new express.Router();


router.post("/payment", async (req, res) => {
  const payment = req.body;
  try {
    await new Payment(payment).save();
    res.status(201).send("inserted");
  } catch (e) {
    res.status(400).send(e);
  }
});

router.put("/payment/:id", async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);

  try {
    const payment = await Payment.findById(_id);
    updates.forEach((update) => (payment[update] = req.body[update]));
    await payment.save();
    return !payment ? res.sendStatus(404) : res.status(201).send(payment);
  } catch (e) {
    return res.status(400).send(e);
  }
});

module.exports = router;
