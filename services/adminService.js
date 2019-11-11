const { Restaurant, Category } = require("../models");

const adminService = {
  getRestaurants: (req, res, callback) => {
    return Restaurant.findAll({
      include: [Category],
      order: [["id", "ASC"]]
    }).then(restaurants => {
      callback({ restaurants });
    });
  },

  getRestaurant: (req, res, callback) => {
    return Restaurant.findByPk(req.params.id, { include: [Category] }).then(
      restaurant => callback({ restaurant })
    );
  },

  getCategories: (req, res, callback) => {
    return Category.findAll().then(categories => callback({ categories }));
  }
};

module.exports = adminService;
