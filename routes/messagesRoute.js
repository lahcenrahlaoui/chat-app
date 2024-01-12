const express = require("express");



const { postData, getData } = require("../controllers/messagesController.js");

const router = express.Router();

router.post("/", postData);
router.get("/", getData);

module.exports = router;
