const jwt = require("jsonwebtoken");

const jwtKey = "fioq2euyfiouqwyeofuiywefqef";
const createToken = (id) => {
    return jwt.sign({ id }, jwtKey, { expiresIn: "2d" });
};

const signin = async (req, res) => {
    res.send({
        user: "user",
    });
};

const signup = async (req, res) => {
    const token = createToken(res.locals.user.id);

    const user = {
        id: res.locals.user.id,
        name: res.locals.user.name,
        email: res.locals.user.email,
        token,
    };
    try {
        res.send({ user });
    } catch (err) {}
};

////////////////////////////
////////////////////////////
////////////////////////////
////////////////////////////
////////////////////////////
////////////////////////////
////////////////////////////
////////////////////////////
const fetchData = (req, res, next) => {
    res.send({
        data: res.locals.users,
    });
};

const postData = (req, res, next) => {
    res.send({
        data: res.locals.users,
    });
};

module.exports = {
    fetchData,
    postData,
    signin,
    signup,
};
