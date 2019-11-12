const router = require("express").Router();

const adminController = require("../controllers/api/adminController.js");

router.get("/admin/restaurants", adminController.getRestaurants);

router
  .route("/admin/restaurants/:id")
  .get(adminController.getRestaurant)
  .delete(adminController.deleteRestaurant);

router.get("/admin/categories", adminController.getCategories);

module.exports = router;
