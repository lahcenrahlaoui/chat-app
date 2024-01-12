const Message = require("../models/messageModel");

const postData = async (req, res) => {
    const data = {
        content: req.body.content,
        from: req.body.from,
        to: req.body.to,
    };
    console.log(data);
    try {
        const message = await Message.create(data);
        res.send({ message });
    } catch (err) {
        console.log(err);
    }
};
const getData = async (req, res) => {
    const { user } = req.body;
    console.log("user");
    console.log(user);
    try {
        const messages = await Message.find({ from: user });

        console.log(messages);
        res.send({ messages });
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    postData,
    getData,
};
