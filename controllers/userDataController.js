const getUserData = (req, res, next) => {
    res.send({
        data: res.locals.userData,
    });
};

module.exports = {
    getUserData,
};
