const { Category } = require("../models");

const categoryController = {
  getCategories: (req, res) => {
    return Category.findAll().then(categories => {
      return res.render("admin/categories", { categories });
    });
  },
  postCategory: (req, res) => {
    if (!req.body.name) {
      req.flashError("name didn't exist");
      return res.redirect("back");
    }
    const { body } = req;
    return Category.create({ body }).then(category => {
      res.redirect("/admin/categories");
    });
  }
};
module.exports = categoryController;
