const admin = require("express").Router();
const multer = require("multer");
const { authenticatedAdmin } = require("../middlewares/authenticator.js");
const adminControllor = require("../controllers/adminController.js");
const categoryController = require("../controllers/categoryController");

const upload = multer({ dest: "temp/" });

//  apply admin authentication to all admin routes
admin.use(authenticatedAdmin);

// admin/
admin.get("/", (req, res) => {
  res.redirect("/admin/restaurants");
});

// admin/restaurants/
admin
  .route("/restaurants")
  .get(adminControllor.getRestaurants)
  .post(upload.single("image"), adminControllor.postRestaurant);
admin.get("/restaurants/create", adminControllor.createRestaurant);
admin
  .route("/restaurants/:id")
  .get(adminControllor.getRestaurant)
  .put(upload.single("image"), adminControllor.putRestaurant)
  .delete(adminControllor.deleteRestaurant);
admin.get("/restaurants/:id/edit", adminControllor.editRestaurant);

// admin/users/
admin.get("/users", adminControllor.editUsers);
admin.put("/users/:id", adminControllor.putUsers);

// admin/categories/
admin.get("/categories", categoryController.getCategories);

module.exports = admin;
