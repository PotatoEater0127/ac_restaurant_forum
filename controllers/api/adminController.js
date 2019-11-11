const { Restaurant, Category } = require("../../models");

const adminController = {
  getRestaurants: (req, res) => {
    return Restaurant.findAll({ include: [Category] }).then(restaurants => {
      return res.json({ restaurants });
    });
  }
};
module.exports = adminController;
