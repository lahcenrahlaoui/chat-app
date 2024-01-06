const express = require("express");

const router = express.Router();

const table = "users";
// // connect to db.query
const db = require("../../db.js");

const { signin, signup } = require("../../controllers/auth/authController.js");

// fetch all users
const fetchDataHelper = (req, res, next) => {
  
    
    let query = queries.select[tableName];

    db.all(query, [], function (err, rows) {
        if (err) {
            return next(err);
        }

        res.locals[tableName] = rows;

        console.log(res.locals[tableName]);

        next();
    });
};

// fetch the inserted row
const fetchOneHelper = (req, res, next) => {
    let sql = `SELECT * FROM users WHERE id = ${res.locals.user.id}`;

    db.all(sql, [], function (err, rows) {
        if (err) {
            return next(err);
        }
        console.log(rows);
        res.locals.user = rows[0];
        next();
    });
};

// // insert data
const postDataHelper = (req, res, next) => {
    let query = `INSERT INTO users( name,  email ,  password ) VALUES(?,?, ?)`;

    const data = Object.values(req.body);

    db.run(query, data, function (err) {
        if (err) {
            return console.log(err.message);
        }
        res.locals.user = {};
        res.locals.user.id = this.lastID;

        next();
    });
};

// router.post("/", postDataHelper, fetchOneHelper, postData);

router.post("/signin", postDataHelper, fetchOneHelper, signin);

router.post("/signup", postDataHelper, fetchOneHelper, signup);

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
