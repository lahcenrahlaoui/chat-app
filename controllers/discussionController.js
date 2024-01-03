const getDiscussion = (req, res, next) => {
    res.send({
        data: res.locals.discussion,
    });
};

module.exports = {
    getDiscussion,
};
