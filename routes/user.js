const user = require("express").Router();
const multer = require("multer");
const { authenticatedUser } = require("../middlewares/authenticator");
const userController = require("../controllers/userController");

const upload = multer({ dest: "temp/" });

user
  .route("/:id")
  .get(authenticatedUser, userController.getUser)
  .put(authenticatedUser, upload.single("image"), userController.putUser);

user.get("/:id/edit", authenticatedUser, userController.editUser);

module.exports = user;
