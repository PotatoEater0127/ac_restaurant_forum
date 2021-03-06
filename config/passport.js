const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt-nodejs");
const { User, Restaurant } = require("../models");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    (req, username, password, cb) => {
      User.findOne({ where: { email: username } }).then(user => {
        if (!user || !bcrypt.compareSync(password, user.password)) {
          return cb(null, false, req.flashError("帳號或密碼輸入錯誤"));
        }
        return cb(null, user);
      });
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findByPk(id, {
    include: [
      { model: Restaurant, as: "FavoritedRestaurants" },
      { model: Restaurant, as: "LikedRestaurants" },
      { model: User, as: "Followers" },
      { model: User, as: "Followings" }
    ]
  }).then(user => {
    return cb(null, user);
  });
});

module.exports = passport;
