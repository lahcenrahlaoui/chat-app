const express = require("express");

const {
    fetchDataHelper,
    fetchOneHelper,
    postDataHelper,
} = require("../utils/helpers.js");

const table = "messages";
const { fetchData, postData } = require("../controllers/messagesController.js");

const router = express.Router();

// // connect to db
const db = require("../db.js");

router.get("/", fetchDataHelper(db, table), fetchData);

router.post(
    "/",
    postDataHelper(db, table),
    fetchOneHelper(db, table),
    postData
);

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
