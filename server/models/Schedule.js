const mongoose = require("mongoose");
const { Schema } = mongoose;

const ScheduleSchema = new mongoose.Schema({
  date: {
    type: Date,
  },
  Id: {
    type: Number,
  },
  movieId: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
  },
  theaterId: {
    type: Schema.Types.ObjectId,
    ref: "Theater",
  },
  timeSlot: {
    type : "String",
  },
  day: {
    type : "String",
  },
});
const Schedule = mongoose.model("Schedule", ScheduleSchema);
module.exports = Schedule;
