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
      return next(err);
    } else {
      passport.authenticate("local", {
        successRedirect: "/secrets",
        successFlash: true,
        failureRedirect: "/login",
        failureFlash: true,
      })(req, res, next);
    }
  });
};

postController.register = (req, res, next) => {
  const { username, password, password2 } = req.body;
  let errors = [];
  //check required fields
  if (!username || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }
  //check password length
  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 charcaters" });
  }
  //Check password match
  if (password !== password2) {
    errors.push({ msg: "Password should match" });
  }
  if (errors.length > 0) {
    return res.render("register", {
      errors,
      username,
      password,
      password2,
    });
  }
  User.register({ username: username }, password, (err, user) => {
    if (err) {
      req.flash("error_msg", err.message);
      return res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, () => {
        req.flash("success_msg", "You are successfully registered!");
        return res.redirect("/secrets");
      });
    }
  });
};

postController.submit = (req, res, next) => {
  const submittedSecret = req.body.secret;
  if (submittedSecret.length > 160) {
    req.flash("error_msg", "Your secret should be 160 characters long!");
    return res.redirect("/submit");
  }
  const secretObject = {
    secret: submittedSecret,
    created_date: Date.now(),
  };

  //Once the user is authenticated and their session gets saved, their user details are saved to req.user.

  User.findById(req.user.id, (err, foundUser) => {
    if (err) {
      return next(err);
    } else {
      if (foundUser) {
        foundUser.secrets = secretObject;
        foundUser.save(() => {
          req.flash(
            "success_msg",
            "You have successfully revealed your secret !"
          );
          return res.redirect("/secrets");
        });
      } else {
        req.flash("error_msg", "You have to login or register first !");
        return res.redirect("/");
      }
    }
  });
};

module.exports = postController;
