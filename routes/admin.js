const admin = require("express").Router();
const multer = require("multer");
const adminControllor = require("../controllers/adminController.js");

const upload = multer({ dest: "temp/" });

const authenticatedAdmin = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.isAdmin) {
      return next();
    }
    return res.redirect("/");
  }
  return res.redirect("/signin");
};

//  apply admin authentication to all admin routes
admin.use(authenticatedAdmin);
admin.get("/", (req, res) => {
  res.redirect("/admin/restaurants");
});
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

module.exports = admin;
