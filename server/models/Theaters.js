const mongoose = require("mongoose");
const TheaterSchema = new mongoose.Schema({
  theaterName: {
    type: String,
  },
  theaterLocation: {
    type: String,
  },
});

const Theater = mongoose.model("Theaters", TheaterSchema);
module.exports = Theater;
