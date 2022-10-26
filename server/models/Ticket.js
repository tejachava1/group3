const mongoose = require("mongoose");
const { Schema } = mongoose;

const TicketSchema = new mongoose.Schema({
  scheduleId: {
    type: Schema.Types.ObjectId,
    ref: "Schedule",
  },
  noOfSeats: {
    type: Number,
  },
  price: {
    type: Number,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
});
