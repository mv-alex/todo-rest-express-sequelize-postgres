const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const saltRounds = 10;

const { userValidator } = require("./../../config/validation");
const { validationResult } = require("express-validator");

const passport = require("./../../config/passport");

const User = require("./../../models/User");

router.post("/signup", userValidator, async (req, res) => {
  const { username, password, firstname, email } = req.body;

  //validation
  const validated = validationResult(req);
  if (!validated.isEmpty()) {
    return res.status(422).json({ errors: validated.array() });
  }

  //exsist
  const usernameExsist = await User.findOne({ where: { username } });
  if (usernameExsist) {
    return res.status(409).json({
      status: "fail",
      msg: "Username already exsist",
    });
  }
  const emailExist = await User.findOne({ where: { email } });
  if (emailExist) {
    return res.status(409).json({
      status: "fail",
      msg: "Email already exsist",
    });
  }

  //hash password
  const passwordHash = await bcrypt.hashSync(password, saltRounds);
  console.log(passwordHash);
  try {
    const newUser = await User.create({
      username,
      password: passwordHash,
      firstname,
      email,
    });
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({
    status: "created",
    msg: "you singup",
  });
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  return res.status(201).json({
    status: "ok",
  });
});

router.get("/logout", (req, res) => {
  if (req.isAuthenticated()) {
    req.logOut();
    return res.status(200).json({
      status: "ok",
      msg: "you logout",
    });
  }
  return res.status(401).json({
    status: "cancel",
    msg: "Unauthorized",
  });
});

router.get("/profile", (req, res) => {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    const user = req.user;
    return res.status(200).json({
      status: "ok",
      user: {
        username: user.username,
        firstname: user.firstname,
        email: user.email,
      },
    });
  }
  return res.status(401).json({
    status: "cancel",
    msg: "Unauthorized",
  });
});

module.exports = router;
