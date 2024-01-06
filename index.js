// imports
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

//files imports
const authRoute = require("./routes/auth/authRoute.js");
const messagesRoute = require("./routes/messages/messagesRoute.js");
const chatsRoute = require("./routes/chats/chatsRoute.js");

// create the app
const app = express();

// // to delete old results
// console.clear();

//middlewares
app.use(express.static("public"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

if (process.env.NODE_ENV === "development") {
    app.use(cors());
} else {
    app.use(
        cors({
            origin: "https://social-media-client-blue.vercel.app",
            credentials: true,
        })
    );
    app.set("trust proxy", 1);
}

// constants
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;

// calling routes
app.use("/api/auth", authRoute);
// app.use("/api/user-data", userDataRoute);

app.use("/api/chats", chatsRoute);
app.use("/api/messages", messagesRoute);

mongoose
    .connect(MONGO_URL)
    .then(() =>
        app.listen(PORT, () => console.log(`listening on port ${PORT}`))
    )
    .catch((err) => {
        console.log("database connection error", err);
    });
