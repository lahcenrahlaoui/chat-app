const fetchChats = (req, res, next) => {
    res.send({
        data: res.locals.chats,
    });
};

module.exports = {
    fetchChats,
};
