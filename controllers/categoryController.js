const { Category } = require("../models");

const categoryController = {
  getCategories: (req, res) => {
    return Category.findAll().then(categories => {
      return res.render("admin/categories", { categories });
    });
  }
};
module.exports = categoryController;
