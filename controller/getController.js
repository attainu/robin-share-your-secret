const express = require("express");
const User = require("../model/user");
const passport = require("passport");

const ITEMS_PER_PAGE = 7;

getController = {};

getController.home = (req, res) => {
  return res.render("home");
};

getController.login = (req, res) => {
  return res.render("login");
};

getController.register = (req, res) => {
  return res.render("register");
};

getController.secret = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error_msg", "You have to login or register first !");
    return res.redirect("/");
  }
  const page = +req.query.page || 1;
  let totalSecrets;

  User.find({ "secrets.secret": { $exists: true, $ne: null } })
    .countDocuments()
    .then((numberOfSecrets) => {
      totalSecrets = numberOfSecrets;
      return User.find({ "secrets.secret": { $exists: true, $ne: null } })
        .sort({ "secrets.created_date": -1 })
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then((users) => {
      if (users) {
        res.render("secrets", {
          usersWithSecrets: users,
          currentPage: page,
          hasNextPage: ITEMS_PER_PAGE * page < totalSecrets,
          hasPreviousPage: page > 1,
          nextPage: page + 1,
          previousPage: page - 1,
          lastPage: Math.ceil(totalSecrets / ITEMS_PER_PAGE),
        });
      }
    })
    .catch((err) => {
      next(err);
    });
};

getController.submit = (req, res) => {
  if (req.isAuthenticated()) {
    return res.render("submit");
  } else {
    return res.redirect("/login");
  }
};

getController.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "You are now successfully logged out!");
  return res.redirect("/");
};

module.exports = getController;
