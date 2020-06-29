require("dotenv").config();
const express = require("express");
const createError = require("http-errors");

const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
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

//using connect-flash for flash message
app.use(flash());
//Global var
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});
app.use("/favicon.ico", express.static("public/images/favicon.ico"));
app.use("/auth", authRoutes);
app.use("/", getRoutes);
app.use("/post", postRoutes);

//error handling route
app.use((req, res, next) => {
  return next(createError(404, "Content not found"));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  console.error(err);
  const status = err.status || 500;
  res.locals.status = status;
  res.status(status);
  res.render("error");
});

app.listen(PORT, console.log("Server started on port 3000."));
