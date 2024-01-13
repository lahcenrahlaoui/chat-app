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
const findUsers = async (req, res) => {
    const { _ids } = req.query;

    try {
        const users = await User.find({ _id: { $in: _ids } });

        res.send({ users });
    } catch (err) {
        console.log(err);
    }
};
const findUser = async (req, res) => {
    const { _id } = req.query;

    try {
        const user = await User.find({ _id });

        res.send({ user });
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    createUser,
    findUser,
    findUsers,
};
