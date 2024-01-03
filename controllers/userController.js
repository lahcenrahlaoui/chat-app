const jwt = require("jsonwebtoken");

const { postDataHelper, fetchOneHelper } = require("../utils/helpers");

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
    console.log("res.locals.users");
    console.log(res.locals.users[0].id);
    const token = createToken(res.locals.users[0].id);

    const user = {
        name: res.locals.users[0].first_name, 
        last_name: res.locals.users[0].last_name,
        email: res.locals.users[0].email,
        id: res.locals.users[0].id,
        token
    }
    try {
        res.send({
            user: res.locals.users[0],
            token
        });
    } catch (err) {}
};

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
