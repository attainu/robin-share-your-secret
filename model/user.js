const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
  secrets: {
    secret: {
      type: String,
    },
    created_date: {
      type: Date,
      default: Date.now,
    },
  },
  facebookId: String,
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("users", userSchema);
module.exports = User;
