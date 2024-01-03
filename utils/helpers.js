const queries = require("./queries.json");

const fetchDataHelper = (db, tableName) => (req, res, next) => {
    console.log("fetchDataHelper from ", tableName);
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

const fetchOneHelper = (db, tableName) => (req, res, next) => {
    let sql = `SELECT * FROM ${tableName} WHERE id = ${res.locals[tableName].id}`;

    console.log("fetchOneHelper after post  from ", tableName);
    db.all(sql, [], function (err, rows) {
        if (err) {
            return next(err);
        }

        res.locals[tableName] = rows;

        next();
    });
};

// // insert data
const postDataHelper = (db, tableName) => (req, res, next) => {
    let query = queries.insert[tableName];

    const data = Object.values(req.body);

    console.log("postDataHelper from ", tableName);
    db.run(query, data, function (err) {
        if (err) {
            return console.log(err.message);
        }
        res.locals[tableName] = {};
        res.locals[tableName].id = this.lastID;

        next();
    });
};






const fetchOneHelperX = (db, tableName) => (req, res, next) => {
    let sql = `SELECT * FROM ${tableName} WHERE id = ${res.locals[tableName].id}`;

    console.log("fetchOneHelper after post  from ", tableName);
    db.all(sql, [], function (err, rows) {
        if (err) {
            return next(err);
        }

        res.locals[tableName] = rows;

        next();
    });
};

// // insert data
const postDataHelperX = (db, tableName) => (req, res, next) => {
    let query = queries.insert[tableName];

    const data = Object.values(req.body);

    console.log("postDataHelper from ", tableName);
    db.run(query, data, function (err) {
        if (err) {
            return console.log(err.message);
        }
        res.locals[tableName] = {};
        res.locals[tableName].id = this.lastID;

        next();
    });
};














// to get tables
const getTables = (db) => (req, res, next) => {
    let insertIntoTableQuery;
    insertIntoTableQuery = `SELECT * FROM messages `;

    console.log("insertIntoTableQuery");
    let sql_query = `SELECT tbl_name FROM sqlite_master WHERE type='table' `;

    db.all(sql_query, [], function (err, rows) {
        if (err) {
            return console.log(err.message);
        }
        console.log(rows);

        next();
    });
};

module.exports = {
    fetchDataHelper,
    fetchOneHelper,
    postDataHelper,
    getTables,
};
