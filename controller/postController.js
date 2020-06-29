const express = require("express");
const User = require("../model/user");
const passport = require("passport");

postController = {};

postController.login = (req, res, next) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, (err) => {
    if (err) {
      next(err);
    } else {
      passport.authenticate("local", {
        successRedirect: "/secrets",
        failureRedirect: "/login",
      })(req, res, next);
    }
  });
};

postController.register = (req, res, next) => {
  User.register(
    { username: req.body.username },
    req.body.password,
    (err, user) => {
      if (err) {
        res.redirect("/register");
        next(err);
      } else {
        passport.authenticate("local")(req, res, () => {
          res.redirect("/secrets");
        });
      }
    }
  );
};

postController.submit = (req, res, next) => {
  const submittedSecret = req.body.secret;

  //Once the user is authenticated and their session gets saved, their user details are saved to req.user.

  User.findById(req.user.id, (err, foundUser) => {
    if (err) {
      next(err);
    } else {
      if (foundUser) {
        foundUser.secret = submittedSecret;
        foundUser.save(() => {
          res.redirect("/secrets");
        });
      }
    }
  });
};

module.exports = postController;
