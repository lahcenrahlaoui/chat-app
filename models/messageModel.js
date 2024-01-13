const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageModel = new Schema(
    {
        content: String, 
        from: String,
        to: String,
    },
    { timestamps: true }
);

const Message = mongoose.model("Message", messageModel);
module.exports = Message;
