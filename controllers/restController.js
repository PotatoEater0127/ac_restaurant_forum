const { Restaurant, Category } = require("../models");

const restController = {
  getRestaurants: async (req, res) => {
    const where = {};
    let { categoryId } = req.query;
    if (categoryId) {
      categoryId = Number(categoryId);
      where.CategoryId = categoryId;
    }

    const restaurantsRawData = await Restaurant.findAll({
      include: Category,
      where
    });
    const restaurants = restaurantsRawData.map(rest => ({
      ...rest.dataValues,
      description: rest.dataValues.description.substring(0, 50)
    }));
    const categories = await Category.findAll();
    return res.render("restaurants", { restaurants, categories, categoryId });
  },

  getRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id, {
      include: Category
    }).then(restaurant => res.render("restaurant", { restaurant }));
  }
};
module.exports = restController;
