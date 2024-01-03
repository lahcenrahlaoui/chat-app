const express = require("express");

const {
    fetchMessages,
    postMessage,
} = require("../controllers/messagesController.js");

const router = express.Router();

// // connect to db
const db = require("../db.js");

const fetchDataHelper = (req, res, next) => {
    let query = ` SELECT * FROM messages `;

    db.all(query, [], function (err, rows) {
        if (err) {
            return next(err);
        }

        res.locals.messages = rows;

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
    let query = `INSERT INTO messages(content , user_sender , user_reciever) VALUES(?,?,?)`;

    const data = Object.values(req.body);

    db.run(query, data, function (err) {
        if (err) {
            return console.log(err.message);
        }
        res.locals.message = {};
        res.locals.message.id = this.lastID;

        next();
    });
};

router.get("/", fetchDataHelper, fetchMessages);

// router.get("/:id", fetchDataHelper, fetchData);

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
