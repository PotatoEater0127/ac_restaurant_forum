const router = require("express").Router();
const passport = require("../config/passport");

const userController = require("../controllers/userController.js");
const commentController = require("../controllers/commentController.js");
const {
  authenticated,
  authenticatedAdmin
} = require("../middlewares/authenticator.js");
const admin = require("./admin.js");
const user = require("./user");
const rest = require("./restaurant");

//* requests of ~/restaurants
router.get("/", authenticated, (req, res) => {
  res.redirect("/restaurants");
});
router.use("/restaurants", rest);

//* requests of ~/comments
router.post("/comments", authenticated, commentController.postComment);
router.delete(
  "/comments/:id",
  authenticatedAdmin,
  commentController.deleteComment
);

//* requests of ~/admin
router.use("/admin", admin);

//* requests of /users
router.use("/users", user);

//* requests of /favorite
router
  .route("/favorite/:restaurantId")
  .post(authenticated, userController.addFavorite)
  .delete(authenticated, userController.removeFavorite);

//* requests of /like
router
  .route("/like/:restaurantId")
  .post(authenticated, userController.addLike)
  .delete(authenticated, userController.removeLike);

//* requests of /following
router
  .route("/following/:userId")
  .post(authenticated, userController.addFollowing)
  .delete(authenticated, userController.removeFollowing);

//* requests of ~/signup
router
  .route("/signup")
  .get(userController.signUpPage)
  .post(userController.signUp);

//* requests of ~/signin
router
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
router.get("/logout", userController.logout);

module.exports = router;
