const router = require("express").Router();
const upload = require("multer")({ dest: "temp/" });

const adminController = require("../controllers/api/adminController.js");

router
  .route("/admin/restaurants")
  .get(adminController.getRestaurants)
  .post(upload.single("image"), adminController.postRestaurant);

router
  .route("/admin/restaurants/:id")
  .get(adminController.getRestaurant)
  .put(upload.single("image"), adminController.putRestaurant)
  .delete(adminController.deleteRestaurant);

router.get("/admin/categories", adminController.getCategories);

module.exports = router;
