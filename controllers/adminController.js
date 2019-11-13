const { Restaurant, User, Category } = require("../models");
const adminService = require("../services/adminService");
const { uploadAsync } = require("../util/imgurUtil");

const adminController = {
  // render one restaurant
  getRestaurant: (req, res) => {
    return adminService.getRestaurant(req, res, data => {
      return res.render("admin/restaurant", data);
    });
  },
  // render all restaurants
  getRestaurants: (req, res) => {
    adminService.getRestaurants(req, res, data => {
      return res.render("admin/restaurants", data);
    });
  },
  // render the create-restautant page, which is also the edit-restaurant page
  createRestaurant: (req, res) => {
    Category.findAll().then(categories => {
      return res.render("admin/create", { categories });
    });
  },
  // create a restaurant and then redirect to /admin/restaurants
  postRestaurant: async (req, res) => {
    adminService.postRestaurant(req, res, data => {
      if (data.status === "error") {
        req.flashError(data.message);
        return res.redirect("back");
      }
      req.flashSuccess(data.message);
      res.redirect("/admin/restaurants");
    });
  },
  // render edit-restaurant page, which is also the create Restaurant page
  editRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id).then(restaurant => {
      Category.findAll().then(categories => {
        return res.render("admin/create", {
          categories,
          restaurant
        });
      });
    });
  },
  // update a restaurant data and then redirect to /admin/restaurants
  putRestaurant: async (req, res) => {
    adminService.putRestaurant(req, res, data => {
      if (data.status === "error") {
        req.flashError(data.message);
        return res.redirect("back");
      }
      req.flashSuccess(data.message);
      return res.redirect("/admin/restaurants");
    });
  },
  // delete a restaurant data and then redirect to /admin/restaurants
  deleteRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id).then(restaurant => {
      restaurant.destroy().then(() => res.redirect("/admin/restaurants"));
    });
  },
  // render all users
  editUsers: (req, res) => {
    return User.findAll({ order: [["id", "ASC"]] }).then(users => {
      res.render("admin/users", { users });
    });
  },
  // update a user data and then redirect to /admin/users
  putUsers: (req, res) => {
    return User.findByPk(req.params.id).then(user => {
      user.update({ isAdmin: !user.isAdmin }).then(() => {
        req.flashSuccess(`user: ${user.email} was updated successfully`);
        res.redirect("/admin/users");
      });
    });
  }
};

module.exports = adminController;
