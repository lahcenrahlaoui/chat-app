const express = require("express");

const {
    fetchDataHelper,
    fetchOneHelper,
    postDataHelper,
} = require("../utils/helpers.js");
const router = express.Router();

const table = "users";
// // connect to db.query
const db = require("../db.js");

const {
    fetchData,
    postData,
    signin,
    signup,
} = require("../controllers/userController.js");

router.get("/", fetchDataHelper(db, table), fetchData);

router.post(
    "/",
    postDataHelper(db, table),
    fetchOneHelper(db, table),
    postData
);

// router.post("/auth/signin", signin(db, table));


router.post(
    "/auth/signup",
    postDataHelper(db, table),
    fetchOneHelper(db, table),
    signup
);

module.exports = router;

/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
// const deleteData = (req, res, next) => {
//     // delete
//     let deleteFromTableQuery;
//     deleteFromTableQuery = `DELETE FROM users WHERE id = ? `;

//     db.run(deleteFromTableQuery, [1], (err) => {
//         if (err) {
//             return console.log(err.message);
//         }
//     });
//     console.log("delete data ");
//     res.json({
//         data: "data",
//     });
// };

// const dropTable = () => {
//     // delete table
//     router.delete("/", async (req, res) => {
//         // drop table
//         db.run(`DROP TABLE users`);

//         console.log("delete data ");
//         res.json({
//             data: "data",
//         });
//     });
// };

// const updateData = async (req, res, next) => {
//     // router.patch("/:id", async (req, res) => {
//     //     // // update
//     //     let updateTableQuery;
//     //     updateTableQuery = `UPDATE  users  SET first_name = ? WHERE id = ? `;
//     //     db.run(updateTableQuery, ["jack", 1], (err) => {
//     //         if (err) {
//     //             return console.log(err.message);
//     //         }
//     //     });
//     //     console.log("delete data ");
//     //     res.json({
//     //         data: "data",
//     //     });
//     // });
// };
