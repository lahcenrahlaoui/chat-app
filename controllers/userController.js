const User = require("../models/userModel");

const createUser = async (req, res) => {
    const data = {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
    };
    console.log(data);
    try {
        const user = await User.create(data);
        res.send({ user });
    } catch (err) {
        console.log(err);
    }
};
const findUser = async (req, res) => {
    const { phoneNumber } = req.body;

    try {
        const user = await User.find({ phoneNumber: phoneNumber });

        console.log(user);
        res.send({ user });
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    createUser,
    findUser,
};
