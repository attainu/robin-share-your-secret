const express = require("express");
const router = express.Router();

const postController = require("../controller/postController");

router.post("/register", postController.register);

router.post("/login", postController.login);

router.post("/submit", postController.submit);

module.exports = router;
