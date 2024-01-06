const express = require("express");

const { fetchChats } = require("../../controllers/chats/chatsController.js");

const router = express.Router();

// // connect to db
const db = require("../../db.js");

// to get user messages
const fetchDataHelperChat = (req, res, next) => {
    let query = ` SELECT talkWith FROM messages GROUP BY talkWith `;

    db.all(query, [], function (err, rows) {
        if (err) {
            return next(err);
        }

        // get users chat with and remove the duplicate users
        const chats = rows.map((row) => {
            return Object.values(row)[0];
        });

        res.locals.chats = chats;

        next();
    });
};



router.get("/", fetchDataHelperChat, fetchChats);

module.exports = router;
