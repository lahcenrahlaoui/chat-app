// imports
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

/// start  this
const http = require("http");
const { Server } = require("socket.io");
// end this

//files imports
const messagesRoute = require("./routes/messagesRoute.js");
const userRoute = require("./routes/userRoute.js");

// create the app
const app = express();

// start this
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://social-media-client-blue.vercel.app", // string[]
        methods: ["GET", "POST"],
        allowedHeaders: [],
        credentials: true,
    },
});
// end this

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
app.use("/api/messages", messagesRoute);
app.use("/api/users", userRoute);

mongoose
    .connect(MONGO_URL)
    .then(
        () => {
            // start this
            server.listen(PORT);
            io.on("connection", () => {});
            // end this
        }
        // app.listen(PORT, () => console.log(`listening on port ${PORT}`))
    )
    .catch((err) => {
        console.log("database connection error", err);
    });
