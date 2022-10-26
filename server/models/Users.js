const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userId: {
        type: Number
    },
    name: {
        type: String
    },
    emailId: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    password: {
        type: String
    }
});

const Users = mongoose.model("Users",UserSchema);
module.exports = Users;