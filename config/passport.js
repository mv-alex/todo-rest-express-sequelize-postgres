const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const options = {
  usernameField: "username",
  passwordField: "password",
  passReqToCallback: false,
};

//verify strategy
async function verify(username, password, done) {
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    }
    const passwordMatch = await verifyPassword(user, password);
    if (!passwordMatch) {
      return done(null, false, { message: "Incorrect password" });
    }
    return done(null, user);
  } catch (err) {
    console.error(err);
    return done(err);
  }
}

//password is match hash password
async function verifyPassword(user, password) {
  const match = await bcrypt.compare(password, user.password);
  console.log(`password is ` + match);
  return match;
}

//add strategy
passport.use("local", new LocalStrategy(options, verify));

//config passport for save user session
passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const user = await User.findByPk(id);
    cb(null, user);
  } catch (err) {
    return cb(err);
  }
});

//  add strategy
passport.use("local", new LocalStrategy(options, verify));

module.exports = passport;
