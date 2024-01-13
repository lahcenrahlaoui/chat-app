const express = require("express");

const { createUser, findUser , findUsers } = require("../controllers/userController.js");

const router = express.Router();

router.post("/", createUser);
router.get("/", findUser);
router.get("/all", findUsers);

module.exports = router;
