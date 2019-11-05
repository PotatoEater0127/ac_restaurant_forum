const { Restaurant, Category } = require("../models");

const restController = {
  getRestaurants: (req, res) => {
    Restaurant.findAll({ include: Category })
      .then(restaurants =>
        restaurants.map(rest => ({
          ...rest.dataValues,
          description: rest.dataValues.description.substring(0, 50)
        }))
      )
      .then(restaurants => res.render("restaurants", { restaurants }));
  }
};
module.exports = restController;
