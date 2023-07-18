const router = require("express").Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

//Passport user authentication
passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: "Invalid email or password" });
        }

        bcrypt
          .compare(password, user.password)
          .then((isMatch) => {
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, {
                message: "Invalid email or password",
              });
            }
          })
          .catch((error) => done(error));
      })
      .catch((error) => done(error));
  })
);

router.route("/").get((req, res) => {
  User.find()
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

//Add new user
router.route("/register").post((req, res) => {
  const { email, fullname, password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    const newUser = new User({
      email,
      fullname,
      password: hash,
    });

    newUser
      .save()
      .then(() => {
        res.json({ message: "User registered successfully" });
      })
      .catch((err) => {
        res.status(500).json({ message: "Error saving user" });
      });
  });
});

// Login user using passport authentication
router.route("/login").post((req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) {
        return next(err);
      }
      return res.json({ message: "User authenticated successfully" });
    });
  })(req, res, next);
});

module.exports = router;
