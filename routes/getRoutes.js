const express = require("express");
const router = express.Router();
const getController = require("../controller/getController");

router.get("/", getController.home);

router.get("/login", getController.login);

router.get("/register", getController.register);

router.get("/secrets", getController.secret);

router.get("/submit", getController.submit);

router.get("/logout", getController.logout);

module.exports = router;
