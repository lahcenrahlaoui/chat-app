const sqlite3 = require("sqlite3");
const mkdirp = require("mkdirp");

mkdirp.sync("./db");
const db = new sqlite3.Database("./db/test.db");

db.serialize(() => {
    // users table
    let createTableQuery = `CREATE TABLE IF NOT EXISTS users( 
                            id INTEGER PRIMARY KEY , 
                       
                            name ,  
                            password ,
                            email )`;

    db.run(createTableQuery);

    // message table
    let createTableQuerym;
    createTableQuerym = `CREATE TABLE IF NOT EXISTS messages(
                        id INTEGER PRIMARY KEY ,
                        content ,
                        user_sender ,
                        user_reciever
                        
                        )`;
    db.run(createTableQuerym);

    // message table
    let createTableQueryc;
    createTableQueryc = `CREATE TABLE IF NOT EXISTS chats(
                        id INTEGER PRIMARY KEY ,
                        user1 ,
                        user2 
                )`;
    db.run(createTableQueryc);
});

module.exports = db;
