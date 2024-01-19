// * import dependencies
console.log(` ********** start  ********* `);
console.log(` ********** start  ********* `);
console.log(` ********** start  ********* `);
console.log(` ********** start  ********* `);
require("dotenv").config();
const mongoose = require("mongoose");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { createServer } = require("http");

// * files imports
const messagesRoute = require("./routes/messagesRoute.js");
const userRoute = require("./routes/userRoute.js");
const Message = require("./models/messageModel.js");

// * create the app and the server
const app = express();

const server = createServer(app);
//connect  to socket io
// * all socket functions are inside this file
const connectedSockets = [];

// * middlewares
app.use(express.static("public"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

if (process.env.NODE_ENV === "development") {
    app.use(cors());
} else {
    app.use(cors());
    // app.use(
    //     cors({
    //         origin: "https://social-media-client-blue.vercel.app",
    //         credentials: true,
    //     })
    // );
    // app.set("trust proxy", 1);
}

// * constants
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;

// * calling routes
app.use("/api/verify", (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    console.log(phoneNumber);
    const code = Math.floor(Math.random() * 999999);
    res.locals.code = code;
    res.json({
        message: `Your phone number is ${phoneNumber}`,
    });
});
app.use("/api/get-verification-code", (req, res) => {
    const verificationCode = req.body.code;

    verificationCode === res.locals.code
        ? res.json({
              status: true,
          })
        : res.json({
              status: false,
          });

    // /////
    // if (verificationCode === res.locals.code) {
    //     res.json({
    //         status: true,
    //     });
    // } else {
    //     res.json({
    //         status: false,
    //     });
    // }
});

app.use("/api/messages", messagesRoute);
app.use("/api/users", userRoute);

mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log(`running server on ${PORT}`);
        require("./socketio")(server, connectedSockets);
        server.listen(PORT);
    })
    .catch((err) => {
        console.log("database connection error", err);
    });

console.log(` ********** end  ********* `);
console.log(` ********** end  ********* `);
console.log(` ********** end  ********* `);
console.log(` ********** end  ********* `);
