const mongoose = require("mongoose");
const { Schema } = mongoose;

const ScheduleSchema = new mongoose.Schema({
  date: {
    type: Date,
  },
  movieId: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
  },
  theaterId: {
    type: Schema.Types.ObjectId,
    ref: "Theater",
  },
  seatAvailable: {
    type: Number,
  },
  time: {
    type: String,
  },
});
const Schedule = mongoose.model("Schedule", ScheduleSchema);
module.exports = Schedule;
