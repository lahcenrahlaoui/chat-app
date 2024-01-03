const fetchChats = (req, res, next) => {
    res.send({
        data: res.locals.chats,
    });
};

const postChat = (req, res, next) => {
    res.send({
        data: res.locals.chat,
    });
};

module.exports = {
    fetchChats,
    postChat,
};
