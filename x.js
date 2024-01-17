// import dependencies
require("dotenv").config();
const mongoose = require("mongoose");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { createServer } = require("http");
const Socket = require("socket.io");

//files imports
const messagesRoute = require("./routes/messagesRoute.js");
const userRoute = require("./routes/userRoute.js");
const Message = require("./models/messageModel.js");

// create the app
const app = express();
const server = createServer(app);

const corsSocketIo = { origin: "*", methods: ["GET", "POST"] };
const io = require("socket.io")(server, {
    cors: corsSocketIo,
});
////////////////////
////////////////////
////////////////////
////////////////////
io.on("connection", (client) => {
    // Message.watch().on("change", (data) => {
    //     const preparedData = {
    //         content: data.fullDocument.content,
    //         createdAt: data.fullDocument.createdAt,
    //         from: data.fullDocument.from,
    //         to: data.fullDocument.to,
    //     };
    //     const to = preparedData.to;

    //     client.emit(to, preparedData);
    // });

    client.on("custom-id", ({reciever}) => {
        console.log("user connected " + client.id);
        console.log(reciever)

    });
    const sockets = Array.from(io.sockets.sockets).map(socket => socket[0]);
    console.log("sockets");
    console.log(sockets);
    
});
////////////////////
////////////////////
////////////////////
////////////////////

//middlewares
app.use(express.static("public"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

console.log("process.env.NODE_ENV");
console.log(process.env.NODE_ENV);
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

console.log("connet with " + PORT)
server.listen(PORT);
// mongoose
//     .connect(MONGO_URL)
//     .then(() => {
//         console.log(`running server on ${PORT}`);

//         // app.listen(PORT, () => console.log(`listening on port ${PORT}`));
//     })
//     .catch((err) => {
//         console.log("database connection error", err);
//     });
