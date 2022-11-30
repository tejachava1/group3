const { response } = require("express");
const express = require("express");

const Payment = require("../models/Payment");
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

router.get("/payment", async (req, res) => {
  try {
    const payments = await Payment.find({});
    res.send([payments]);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/payment/:id/:bookingReference", async (req, res) => {
  const _id = req.params.id;
  const bookingReference = req.params.bookingReference;
  try {
    const payment = await Payment.find({
      userId: _id,
      bookingReference: bookingReference,
    });
    res.send(payment);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.put("/payment/:id/:bookingReference", async (req, res) => {
  const _id = req.params.id;
  const bookingReference = req.params.bookingReference;
  const updates = Object.keys(req.body);
  // console.log(_id);
  // console.log(schedule_id);

  try {
    const payment = await Payment.findOne({
      userId: _id,
      bookingReference: bookingReference,
    });

    console.log(payment);
    updates.forEach((update) => (payment[update] = req.body[update]));
    await payment.save();
    return !payment ? res.sendStatus(404) : res.status(201).send(payment);
  } catch (e) {
    return res.status(400).send(e);
  }
});

module.exports = router;
