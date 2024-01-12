const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userModel = new Schema({
    name: String,
    phoneNumber: String,
});

const User = mongoose.model("User", userModel);
module.exports = User;
