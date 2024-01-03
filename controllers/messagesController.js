const fetchData = (req, res, next) => {
    res.send({
        data: res.locals.messages,
    });
};

const postData = (req, res, next) => {
    res.send({
        data: res.locals.messages,
    });
};

module.exports = {
    fetchData,
    postData,
};

////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////

// const queries = require("../utils/queries.json");

// const fetchDataHelper = (db, tableName) => (req, res, next) => {
//     let query = queries.select[tableName];

//     db.all(query, [], function (err, rows) {
//         if (err) {
//             return next(err);
//         }
//         console.log(rows);
//         res.locals.data = rows;

//         next();
//     });
// };

// const fetchOneHelper = (db, tableName) => (req, res, next) => {

//     let sql = `SELECT * FROM ${tableName} WHERE id = ${res.locals.id}`;
//     db.all(sql, [], function (err, rows) {
//         if (err) {
//             return next(err);
//         }

//         res.locals.data = rows;

//         next();
//     });
// };

// // // insert data
// const postDataHelper = (db, tableName) => (req, res, next) => {
//     // let insertIntoTableQuery;
//     // insertIntoTableQuery = `SELECT * FROM tablename `;

//     // sql_query = `SELECT name FROM sqlite_master WHERE type='table'`;

//     // db.run(
//     //     sql_query,
//     //     ["message content ", "sender id ", "reciever id "],
//     //     function (err) {
//     //         if (err) {
//     //             return console.log(err.message);
//     //         }
//     //         res.locals.id = this.lastID;
//     //         next();
//     //     }
//     // );

//     let insertIntoTableQuery;
//     insertIntoTableQuery = `INSERT INTO ${tableName}(content , user_sender , user_reciever) VALUES(?,?,?)`;

//     db.run(
//         insertIntoTableQuery,
//         ["message content ", "sender id ", "reciever id "],
//         function (err) {
//             if (err) {
//                 return console.log(err.message);
//             }
//             res.locals.id = this.lastID;
//             next();
//         }
//     );
// };

// const getTables = (db) => (req, res, next) => {
//     let insertIntoTableQuery;
//     insertIntoTableQuery = `SELECT * FROM messages `;

//     console.log("insertIntoTableQuery");
//     let sql_query = `SELECT tbl_name FROM sqlite_master WHERE type='table' `;

//     db.all(sql_query, [], function (err, rows) {
//         if (err) {
//             return console.log(err.message);
//         }
//         console.log(rows);

//         next();
//     });
// };

// module.exports = {
//     fetchDataHelper,
//     fetchOneHelper,
//     postDataHelper,
//     getTables,
// };
