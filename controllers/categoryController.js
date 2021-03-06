const { Category } = require("../models");
const categoryService = require("../services/categoryService");

const categoryController = {
  getCategories: (req, res) => {
    categoryService.getCategories(req, res, data => {
      return res.render("admin/categories", data);
    });
  },
  postCategory: (req, res) => {
    categoryService.postCategories(req, res, data => {
      if (data.status === "error") {
        req.flashError(data.message);
        return res.redirect("back");
      }
      req.flashSuccess(data.message);
      res.redirect("/admin/categories");
    });
  },
  putCategory: (req, res) => {
    categoryService.putCategory(req, res, data => {
      if (data.status === "error") {
        req.flashError(data.message);
        return res.redirect("back");
      }
      req.flashSuccess(data.message);
      return res.redirect("/admin/categories");
    });
  },
  deleteCategory: (req, res) => {
    return Category.findByPk(req.params.id)
      .then(category => category.destroy())
      .then(category => res.redirect("/admin/categories"));
  }
};
module.exports = categoryController;
