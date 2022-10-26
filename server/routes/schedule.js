const express = require("express");

const Schedule = require("../models/Schedule");
const router = new express.Router();

router.get("/schedules", async (req, res) => {
  try {
    const schedule = await Schedule.find({});
    res.send(schedule);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/schedules", async (req, res) => {
  const schedule = req.body;
  try {
    await new Schedule(schedule).save();
    res.status(201).send("inserted");
  } catch (e) {
    res.status(400).send(e);
  }
});

router.put("/schedules/:id", async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);

  try {
    const schedule = await Schedule.findById(_id);
    updates.forEach((update) => (schedule[update] = req.body[update]));
    await schedule.save();
    return !schedule ? res.sendStatus(404) : res.status(201).send(schedule);
  } catch (e) {
    return res.status(400).send(e);
  }
});

module.exports = router;
