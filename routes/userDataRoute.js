const express = require("express");
const router = express.Router();

// // connect to db
const db = require("../db.js");

const { getUserData } = require("../controllers/userDataController.js");

const fetchUserData = (db, tableName) => (req, res, next) => {
    console.log(req.query);

    const id = parseInt(req.query.id);
    let query = ` SELECT * FROM users  WHERE id=${id}  `;

    db.all(query, [], function (err, rows) {
        if (err) {
            return next(err);
        }

       
        res.locals.userData = rows;

        next();
    });
};

router.get("/", fetchUserData(db), getUserData);

module.exports = router;
