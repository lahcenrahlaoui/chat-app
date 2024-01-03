// imports
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//files imports
const authRoute = require("./routes/authRoute.js");
// const userDataRoute = require("./routes/userDataRoute.js");

const messagesRoute = require("./routes/messagesRoute.js");

const chatsRoute = require("./routes/chatsRoute.js");

// create the app
const app = express();

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// calling routes
app.use("/api/auth", authRoute);
// app.use("/api/user-data", userDataRoute);

app.use("/api/messages", messagesRoute);

app.use("/api/chats", chatsRoute);

app.listen(5000, () => console.log("listening on port"));
