const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageModel = new Schema({
    content: String,
    from: String,
    to: String
});

const Message = mongoose.model("Message", messageModel);
module.exports = Message;
