const { Restaurant, Category } = require("../models");
const { uploadAsync } = require("../util/imgurUtil");

const adminService = {
  getRestaurants: (req, res, callback) => {
    return Restaurant.findAll({
      include: [Category],
      order: [["id", "ASC"]]
    }).then(restaurants => {
      callback({ restaurants });
    });
  },

  postRestaurant: async (req, res, callback) => {
    if (!req.body.name) {
      return callback({ status: "error", message: "name didn't exist" });
    }

    const { file, body } = req;
    const img = await uploadAsync(file);
    // in case either img or img.data is null or undefined
    body.image = img && img.data ? img.data.link : null;
    body.CategoryId = body.categoryId;

    return Restaurant.create(body).then(() => {
      callback({
        status: "success",
        message: "restaurant was successfully created"
      });
    });
  },

  putRestaurant: async (req, res, callback) => {
    if (!req.body.name) {
      return callback({ status: "error", message: "name doesn't exist" });
    }
    const { file, body } = req;
    const img = await uploadAsync(file);
    body.image = img && img.data ? img.data.link : null;
    body.CategoryId = body.categoryId;

    return Restaurant.findByPk(req.params.id).then(restaurant => {
      body.image = body.image || restaurant.image;
      restaurant.update(body).then(() => {
        callback({
          status: "success",
          message: "restaurant was updated successfully"
        });
      });
    });
  },

  getRestaurant: (req, res, callback) => {
    return Restaurant.findByPk(req.params.id, { include: [Category] }).then(
      restaurant => callback({ restaurant })
    );
  },

  deleteRestaurant: (req, res, callback) => {
    return Restaurant.findByPk(req.params.id)
      .then(restaurant => restaurant.destroy())
      .then(restaurant => {
        callback({ status: "success", message: "" });
      });
  },

  getCategories: (req, res, callback) => {
    return Category.findAll().then(categories => callback({ categories }));
  }
};

module.exports = adminService;
