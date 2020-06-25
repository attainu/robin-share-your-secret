const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const User = require("../model/user");

passport.use(
    new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/secrets",
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  (accessToken, refreshToken, profile, cb) =>{
    console.log(profile)
    User.findOrCreate({ facebookId: profile.id }, (err, user)=> {
      return cb(err, user);
    });
  }
));