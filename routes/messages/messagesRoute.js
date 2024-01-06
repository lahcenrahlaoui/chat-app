const express = require("express");

const {
    fetchMessages,
    postMessage,
    fetchChats,
} = require("../../controllers/messages/messagesController.js");

const Message = require("../../models/messageModel.js");

const router = express.Router();

// // connect to db
const db = require("../../db.js");

// /// to get all messages
// const fetchDataHelper = (req, res, next) => {
//     // let query = ` SELECT * FROM messages `;

//     const { user1 } = req.body;
//     let query = `
//                     SELECT * FROM messages
//                     WHERE (user_sender = ${user1}  OR user_reciever = ${user1})
//                 `;

//     db.all(query, [], function (err, rows) {
//         if (err) {
//             return next(err);
//         }

//         res.locals.messages = rows;

//         next();
//     });
// };

// to get user messages
const fetchDataHelper = (req, res, next) => {
    const { user2 } = req.query;

    let query = ` SELECT * FROM messages WHERE talkWith="${user2}" ORDER BY createdAt DESC `;
    db.all(query, [], function (err, rows) {
        if (err) {
            return next(err);
        }

        res.locals.messages = rows.reverse();
        next();
    });
};
const fetchOneHelper = (req, res, next) => {
    let sql = `SELECT * FROM messages WHERE id = ${res.locals.message.id}`;
    db.all(sql, [], function (err, rows) {
        if (err) {
            return next(err);
        }
        res.locals.message = rows[0];

        next();
    });
};

// // insert data
const postDataHelper = (req, res, next) => {
    let query = `INSERT INTO messages(content , talkWith , status ) VALUES(?,?,?)`;

    const data = [req.body.content, req.body.talkWith, req.body.status];
    db.run(query, data, function (err) {
        if (err) {
            return console.log(err.message);
        }
        res.locals.message = {};
        res.locals.message.id = this.lastID;
        (async () => {
            const message = await Message.create({
                content: req.body.content,
                talkWith: req.body.talkWith,
                status: !req.body.status,
            });
        })();
        next();
    });
};

const messageEventEmitter = Message.watch();

const test = (req, res) => {
    console.log("res");
    console.log(req);
};
messageEventEmitter.on("change", (change) => {
    postDataHelperMongo(change.fullDocument);
});
// // insert data from mongo
const postDataHelperMongo = (datax) => {
    let query = `INSERT INTO messages(content , talkWith , status ) VALUES(?,?,?)`;
    console.log(datax);
    const data = [datax.content, datax.talkWith, datax.status];
    db.run(query, data, function (err) {
        if (err) {
            return console.log(err.message);
        }
        console.log(this);
    });
};

router.get("/", fetchDataHelper, fetchMessages);
router.post("/", postDataHelper, fetchOneHelper, postMessage);

const deleteData = (req, res, next) => {
    // delete
    let deleteFromTableQuery;
    deleteFromTableQuery = `DELETE FROM users WHERE id = ? `;

    db.run(deleteFromTableQuery, [1], (err) => {
        if (err) {
            return console.log(err.message);
        }
    });
    console.log("delete data ");
    res.json({
        data: "data",
    });
};

const dropTable = () => {
    // delete table
    router.delete("/", async (req, res) => {
        // drop table
        db.run(`DROP TABLE users`);

        console.log("delete data ");
        res.json({
            data: "data",
        });
    });
};

const updateData = async (req, res, next) => {
    // router.patch("/:id", async (req, res) => {
    //     // // update
    //     let updateTableQuery;
    //     updateTableQuery = `UPDATE  users  SET first_name = ? WHERE id = ? `;
    //     db.run(updateTableQuery, ["jack", 1], (err) => {
    //         if (err) {
    //             return console.log(err.message);
    //         }
    //     });
    //     console.log("delete data ");
    //     res.json({
    //         data: "data",
    //     });
    // });
};

module.exports = router;
