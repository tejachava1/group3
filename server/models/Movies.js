const mongoose = require("mongoose");
const MovieSchema = new mongoose.Schema({
  movieId: {
    type: Number,
  },
  movieName: {
    type: String,
  },
  movieDescription: {
    type: String,
  },
  movieDirector: {
    type: String,
  },
  movieRating: {
    type: Number,
  }
});

const Movie = mongoose.model("Movie", MovieSchema);
module.exports = Movie;
