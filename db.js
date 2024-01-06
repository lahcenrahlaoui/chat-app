const sqlite3 = require("sqlite3");
const mkdirp = require("mkdirp");

mkdirp.sync("./db");
const db = new sqlite3.Database("./db/test.db");

db.serialize(() => {
    const usersTable = `    CREATE TABLE IF NOT EXISTS users(
                                userId INT NOT NULL, 
                                PRIMARY KEY(userId) 
                    )`;

    db.run(usersTable);

    const messageTable = `  CREATE TABLE IF NOT EXISTS messages( 
                                id INTEGER PRIMARY KEY ,
                                content  , 
                                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP ,
                                talkWith ,
                                status , 
                                FOREIGN KEY (talkWith) REFERENCES users(userId) 
                        )`;

    db.run(messageTable);

    // insert INTO messages( content , talkWith ,status  ) values("contetn" , "u3" , "1"  )
});

module.exports = db;
