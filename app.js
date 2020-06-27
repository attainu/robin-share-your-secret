require("dotenv").config();
const express = require("express");

const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
// const passportLocalMongoose = require("passport-local-mongoose");
const googlePassport = require("./config/googlePassport");
const gacebookPassport = require("./config/facebookPassport");
const User = require("./model/user");
const authRoutes = require("./routes/auth");
const getRoutes = require("./routes/getRoutes");
const postRoutes = require("./routes/postRoutes");
const db = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  express.urlencoded({
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

app.listen(PORT, console.log("Server started on port 3000."));
