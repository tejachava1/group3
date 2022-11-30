const mongoose = require("mongoose");
const TheaterSchema = new mongoose.Schema({
  theaterName: {
    type: String,
  },
  theaterLocation: {
    type: String,
  },
  numberOfSeats: {
    type: Number,
  },
  pricePerSeat: {
    type: Number,
  },
});

const Theater = mongoose.model("Theaters", TheaterSchema);
module.exports = Theater;
