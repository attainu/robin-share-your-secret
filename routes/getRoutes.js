const express = require("express");
const router = express.Router();
const getController = require("../controller/getController");

router.get("/", getController.home);

router.get("/about", getController.about);

router.get("/contact", getController.contact);

router.get("/login", getController.login);

router.get("/register", getController.register);

router.get("/secrets", getController.secret);

router.get("/submit", getController.submit);

// router.get("/post", getController.secretPage);

router.get("/logout", getController.logout);

module.exports = router;
