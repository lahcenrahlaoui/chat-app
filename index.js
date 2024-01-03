// imports
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//files imports
const userRoute = require("./routes/userRoute.js");
const messagesRoute = require("./routes/messagesRoute.js");
const discussionsRoute = require("./routes/discussionsRoute.js");
const userDataRoute = require("./routes/userDataRoute.js");
// create the app
const app = express();

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// calling routes
app.use("/api/users", userRoute);
app.use("/api/messages", messagesRoute);
app.use("/api/discussion", discussionsRoute);
app.use("/api/user-data", userDataRoute);

app.listen(5000, () => console.log("listening on port"));
