const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  adminId: {
    type: Number,
  },
  name: {
    type: String,
  },
  emailId: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  password: {
    type: String,
  },
});

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
