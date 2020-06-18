require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const authRoutes = require("./routes/auth");
const getRoutes = require("./routes/getRoutes");
const gooleStrategy = require("./controller/google-passport");

const app = express();

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
passport.use(gooleStrategy);

app.use("/", getRoutes);
app.use("/auth", getRoutes);

app.listen(3000, function () {
  console.log("Server started on port 3000.");
});
