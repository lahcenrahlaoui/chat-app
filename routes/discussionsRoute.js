const express = require("express");
const router = express.Router();

// // connect to db
const db = require("../db.js");

const { getDiscussion } = require("../controllers/discussionController.js");

const fetchDiscussionHelper = (db, tableName) => (req, res, next) => {
    console.log(req.query);

    const { user1, user2 } = req.query;

    let query = `   SELECT content , user_sender , user_reciever FROM messages 
                    WHERE ((user_sender = ${user1} AND user_reciever = ${user2}) 
                    OR (user_sender = ${user2} AND user_reciever = ${user1}))
                    
                    `;

    console.log(query);
    db.all(query, [], function (err, rows) {
        if (err) {
            return next(err);
        }
        console.log(rows);
        res.locals.discussion = rows;

        next();
    });

    // UNION
    // SELECT   email , name FROM users WHERE id=${user1} OR id=${user2};
};

router.get("/", fetchDiscussionHelper(db), getDiscussion);

module.exports = router;
