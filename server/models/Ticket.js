const mongoose = require("mongoose");
const { Schema } = mongoose;

const TicketSchema = new mongoose.Schema({
  scheduleId: {
    type: Schema.Types.ObjectId,
    ref: "Schedule",
  },
  noOfSeats_ticket: {
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
  bookingReference: {
    type: String,
  },
  seatPosition: {
    type: String,
  },
});
const Ticket = mongoose.model("Ticket", TicketSchema);
module.exports = Ticket;
