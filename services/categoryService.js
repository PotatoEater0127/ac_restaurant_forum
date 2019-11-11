const { Category } = require("../models");

const categoryService = {
  getCategories: async (req, res, callback) => {
    const category = await Category.findByPk(req.params.id);
    const categories = await Category.findAll();
    callback({ category, categories });
  }
};

module.exports = categoryService;
