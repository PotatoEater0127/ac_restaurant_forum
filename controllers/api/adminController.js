const adminService = require("../../services/adminService");
const { Restaurant } = require("../../models");

const adminController = {
  getRestaurants: (req, res) => {
    adminService.getRestaurants(req, res, data => {
      return res.json(data);
    });
  },
  getRestaurant: (req, res) => {
    adminService.getRestaurant(req, res, data => {
      return res.json(data);
    });
  },
  postRestaurant: (req, res) => {
    adminService.postRestaurant(req, res, data => {
      res.json(data);
    });
  },
  deleteRestaurant: (req, res) => {
    adminService.deleteRestaurant(req, res, data => {
      if (data.status === "success") {
        return res.redirect("/admin/restaurants");
      }
    });
  },
  getCategories: (req, res) => {
    adminService.getCategories(req, res, data => {
      return res.json(data);
    });
  }
};

module.exports = adminController;
