const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require("bcrypt");

const localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username: username });
    if (!user) return done({ msg: "user not found " });

    const checkPassword = bcrypt.compare(password, user.password);
    if (!checkPassword) return done({ msg: "user not found " });

    done(null, user);
  } catch (error) {
    done(error);
  }
});
