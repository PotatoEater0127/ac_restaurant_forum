const { Restaurant, Category } = require("../models");

const adminService = {
  getRestaurants: (req, res, callback) => {
    return Restaurant.findAll({
      include: [Category],
      order: [["id", "ASC"]]
    }).then(restaurants => {
      callback({ restaurants });
    });
  }
};

module.exports = adminService;
