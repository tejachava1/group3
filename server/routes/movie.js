const express = require("express");

const Movie = require("../models/Movies");
const router = new express.Router();

router.get("/movies", async (req, res) => {
  try {
    const movie = await Movie.find({});
    res.send(movie);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/movies", async (req, res) => {
  const movie = req.body;
  try {
    await new Movie(movie).save();
    res.status(201).send("inserted");
  } catch (e) {
    res.status(400).send(e);
  }
});

router.put("/movies/:id", async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);

  try {
    const movie = await Movie.findById(_id);
    updates.forEach((update) => (movie[update] = req.body[update]));
    await movie.save();
    return !movie ? res.sendStatus(404) : res.status(201).send(movie);
  } catch (e) {
    return res.status(400).send(e);
  }
});

module.exports = router;
