const userController = require("../controllers/userController.js");
const commentController = require("../controllers/commentController.js");
const {
  authenticated,
  authenticatedAdmin
} = require("../middlewares/authenticator.js");
const admin = require("./admin.js");
const user = require("./user");
const rest = require("./restaurant");

module.exports = (app, passport) => {
  //* requests of ~/restaurants
  app.get("/", authenticated, (req, res) => {
    res.redirect("/restaurants");
  });
  app.use("/restaurants", rest);

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

  //* requests of /favorite
  app.post(
    "/favorite/:restaurantId",
    authenticated,
    userController.addFavorite
  );
  app.delete(
    "/favorite/:restaurantId",
    authenticated,
    userController.removeFavorite
  );

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
