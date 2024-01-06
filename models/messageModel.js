const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageModel = new Schema({
    content: String,
    talkWith: String,
    status: Boolean,
});

const Message = mongoose.model("Message", messageModel);
module.exports = Message;
