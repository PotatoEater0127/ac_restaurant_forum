const categoryService = require("../../services/categoryService");

const categoryController = {
  getCategories: (req, res) => {
    categoryService.getCategories(req, res, data => {
      return res.json(data);
    });
  },
  postCategory: (req, res) => {
    categoryService.postCategories(req, res, data => {
      res.json(data);
    });
  },
  putCategory: (req, res) => {
    categoryService.putCategory(req, res, data => {
      res.json(data);
    });
  }
};

module.exports = categoryController;
