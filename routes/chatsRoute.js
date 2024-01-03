const express = require("express");
const router = express.Router();

// // connect to db
const db = require("../db.js");

const { fetchChats, postChat } = require("../controllers/chatController.js");

const fetchDataHelper = (req, res, next) => {
    let query = ` SELECT * FROM chats `;
    db.all(query, [], function (err, rows) {
        if (err) {
            return next(err);
        }
        res.locals.chats = rows;
        next();
    });
};

const fetchOneHelper = (req, res, next) => {
    let sql = `SELECT * FROM chats WHERE id = ${res.locals.chat.id}`;

    db.all(sql, [], function (err, rows) {
        if (err) {
            return next(err);
        }
        res.locals.chat = rows[0];
        next();
    });
};

// // insert data
const postDataHelper = (req, res, next) => {
    let query = `INSERT INTO chats(user1 , user2 ) VALUES(?,?)`;

    const data = Object.values(req.body);

    db.run(query, data, function (err) {
        if (err) {
            return console.log(err.message);
        }
        res.locals.chat = {};
        res.locals.chat.id = this.lastID;

        next();
    });
};
// router.get("/", fetchDataHelper, fetchData);

router.post("/", postDataHelper, fetchOneHelper, fetchChats);

router.get("/", fetchDataHelper, postChat);

module.exports = router;
