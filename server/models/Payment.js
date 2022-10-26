const mongoose = require("mongoose");
const { Schema } = mongoose;

const PaymentSchema = new mongoose.Schema({
  
 Id: {
  type: Number,
 },
  ticketId: {
    type: Schema.Types.ObjectId,
    ref: "Ticket",
  },
  totalAmount: {
    type: Number,
  },
  date: {
  type: Date,
  },

});
const Payment = mongoose.model("Payment", PaymentSchema);
module.exports = Payment;
