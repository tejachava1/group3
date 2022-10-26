const express = require("express");

const Theater = require("../models/Theaters");
const router = new express.Router();

router.get("/theaters", async (req, res) => {
  try {
    const theraters = await Theater.find({});
    res.send(theraters);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/theaters", async (req, res) => {
  const theater = req.body;
  try {
    await new Theater(theater).save();
    res.status(201).send("inserted");
  } catch (e) {
    res.status(400).send(e);
  }
});

router.put("/theaters/:id", async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);

  try {
    const theater = await Theater.findById(_id);
    updates.forEach((update) => (theater[update] = req.body[update]));
    await theater.save();
    return !theater ? res.sendStatus(404) : res.status(201).send(theater);
  } catch (e) {
    return res.status(400).send(e);
  }
});

module.exports = router;
