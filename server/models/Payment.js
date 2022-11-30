const mongoose = require("mongoose");
const { Schema } = mongoose;

const PaymentSchema = new mongoose.Schema({
  Id: {
    type: Number,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  scheduleId: {
    type: Schema.Types.ObjectId,
    ref: "Schedule",
  },
  totalAmount: {
    type: Number,
  },
  refundedAmount: {
    type: Number,
  },
  bookingReference: {
    type: String,
  },
});
const Payment = mongoose.model("Payment", PaymentSchema);
module.exports = Payment;
