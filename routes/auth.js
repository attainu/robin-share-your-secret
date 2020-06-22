const express = require("express");
const router = express.Router();
const passport=require('passport')


router.get("/google", passport.authenticate("google", { scope: ["profile"] }));


router.get(
  "/google/secrets", passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/secrets");
  }
);


router.get('/facebook',
  passport.authenticate('facebook',{scope:['public_profile']}));

  // console.log(profile)

router.get('/facebook/secrets',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res)=> {
    
    res.redirect('/secrets');
  });

module.exports = router;
