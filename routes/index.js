const restController = require("../controllers/restController.js");
const userController = require("../controllers/userController.js");
const { authenticated } = require("../middlewares/authenticator.js");
const admin = require("./admin.js");

module.exports = (app, passport) => {
  //* requests of ~/restaurants
  app.get("/", authenticated, (req, res) => {
    res.redirect("/restaurants");
  });
  app.get("/restaurants", authenticated, restController.getRestaurants);

  //* requests of ~/admin
  app.use("/admin", admin);

  //* requests of ~/signup
  app
    .route("/signup")
    .get(userController.signUpPage)
    .post(userController.signUp);

  //* requests of ~/signin
  app
    .route("/signin")
    .get(userController.signInpage)
    .post(
      passport.authenticate("local", {
        failureRedirect: "signin",
        failureFlash: true
      }),
      userController.signIn
    );
  //* request of ~/logout
  app.get("/logout", userController.logout);
};
