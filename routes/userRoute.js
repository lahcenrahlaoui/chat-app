const express = require("express");

const { createUser, findUser } = require("../controllers/userController.js");

const router = express.Router();

router.post("/", createUser);
router.get("/", findUser);

module.exports = router;
