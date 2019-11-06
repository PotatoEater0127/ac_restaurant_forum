const restController = require("../controllers/restController.js");
const userController = require("../controllers/userController.js");
const commentController = require("../controllers/commentController.js");
const {
  authenticated,
  authenticatedAdmin
} = require("../middlewares/authenticator.js");
const admin = require("./admin.js");
const user = require("./user");

module.exports = (app, passport) => {
  //* requests of ~/restaurants
  app.get("/", authenticated, (req, res) => {
    res.redirect("/restaurants");
  });
  app.get("/restaurants", authenticated, restController.getRestaurants);
  app.get("/restaurants/:id", authenticated, restController.getRestaurant);

  //* requests of ~/comments
  app.post("/comments", authenticated, commentController.postComment);
  app.delete(
    "/comments/:id",
    authenticatedAdmin,
    commentController.deleteComment
  );

  //* requests of ~/admin
  app.use("/admin", admin);

  //* requests of /users
  app.use("/users", user);

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
