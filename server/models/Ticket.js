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
  status: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  seatNumber: {
    type: Number,
  },
});
const Ticket = mongoose.model("Ticket", TicketSchema);
module.exports = Ticket;
