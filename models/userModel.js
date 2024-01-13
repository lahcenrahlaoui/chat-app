const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userModel = new Schema({
    picture : String , 
    name: String,
    phoneNumber: String,
});

const User = mongoose.model("User", userModel);
module.exports = User;
