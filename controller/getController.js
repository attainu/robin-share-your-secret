const express = require("express");
const User = require("../model/user");
const passport = require("passport");

const ITEMS_PER_PAGE = 5;

getController = {};

getController.home = (req, res) => {
  res.render("home");
};

getController.login = (req, res) => {
  res.render("login");
};

getController.register = (req, res) => {
  res.render("register");
};

getController.secret = (req, res) => {
  const page = +req.query.page || 1;
  let totalSecrets;

  User.find({ secret: { $ne: null } })
    .countDocuments()
    .then((numberOfSecrets) => {
      totalSecrets = numberOfSecrets;
      return User.find({ secret: { $ne: null } })
        .sort({ _id: -1 })
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
      console.log(err);
    });
};

getController.submit = (req, res) => {
  if (req.isAuthenticated()) {
    res.render("submit");
  } else {
    res.redirect("/login");
  }
};

getController.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};

module.exports = getController;
