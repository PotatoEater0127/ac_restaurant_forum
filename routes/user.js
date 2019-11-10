const user = require("express").Router();
const multer = require("multer");
const {
  authenticated,
  authenticatedUser
} = require("../middlewares/authenticator");
const userController = require("../controllers/userController");

const upload = multer({ dest: "temp/" });

user.get("/top", authenticated, userController.getTopUser);

user
  .route("/:id")
  .get(authenticated, userController.getUser)
  .put(authenticatedUser, upload.single("image"), userController.putUser);

user.get("/:id/edit", authenticatedUser, userController.editUser);

module.exports = user;
