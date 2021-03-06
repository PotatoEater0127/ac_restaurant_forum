const { Category } = require("../models");

const categoryService = {
  getCategories: async (req, res, callback) => {
    const category = await Category.findByPk(req.params.id);
    const categories = await Category.findAll();
    callback({ category, categories });
  },
  postCategories: async (req, res, callback) => {
    if (!req.body.name) {
      return callback({ status: "error", message: "name didn't exist" });
    }
    const { body } = req;
    return Category.create(body).then(() => {
      callback({
        status: "success",
        message: "category was created successfully"
      });
    });
  },
  putCategory: (req, res, callback) => {
    if (!req.body.name) {
      return callback({ status: "error", message: "name didn't exist" });
    }
    return Category.findByPk(req.params.id)
      .then(category => category.update(req.body))
      .then(() =>
        callback({
          status: "success",
          message: "category was updated successfuly"
        })
      );
  }
};

module.exports = categoryService;
