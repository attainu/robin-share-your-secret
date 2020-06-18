//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
// const passportLocalMongoose = require("passport-local-mongoose");
const googlePassport = require("./config/googlePassport");
const User = require("./model/user");
const authRoutes = require("./routes/auth");
const getRoutes = require("./routes/getRoutes");
const postRoutes = require("./routes/postRoutes");
const db = require("./config/db");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.use("/auth", authRoutes);
app.use("/", getRoutes);
app.use("/post", postRoutes);

app.listen(3000, function () {
  console.log("Server started on port 3000.");
});
