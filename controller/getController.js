const express=require('express')
const User=require('../model/user')
const passport=require('passport')

getController={}

getController.home=(req, res)=>{
    res.render("home");
  };

getController.login= (req, res)=>{
    res.render("login");
  };

getController.register=(req, res)=>{
    res.render("register");
  };

getController.secret= (req, res)=>{
    User.find({"secret": {$ne: null}}, function(err, foundUsers){
      if (err){
        console.log(err);
      } else {
        if (foundUsers) {
          res.render("secrets", {usersWithSecrets: foundUsers});
        }
      }
    });
  };


getController.submit=(req, res)=>{
    if (req.isAuthenticated()){
      res.render("submit");
    } else {
      res.redirect("/login");
    }
  };

getController.logout=(req, res)=>{
    req.logout();
    res.redirect("/");
  };











  module.exports=getController;