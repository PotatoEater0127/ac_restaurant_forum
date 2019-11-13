const router = require("express").Router();
const upload = require("multer")({ dest: "temp/" });

const adminController = require("../controllers/api/adminController.js");
const categoryController = require("../controllers/api/categoryController");

router
  .route("/admin/restaurants")
  .get(adminController.getRestaurants)
  .post(upload.single("image"), adminController.postRestaurant);

router
  .route("/admin/restaurants/:id")
  .get(adminController.getRestaurant)
  .put(upload.single("image"), adminController.putRestaurant)
  .delete(adminController.deleteRestaurant);

router
  .route("/admin/categories")
  .get(categoryController.getCategories)
  .post(categoryController.postCategory);

module.exports = router;
