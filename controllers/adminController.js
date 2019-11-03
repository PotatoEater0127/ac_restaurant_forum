const db = require("../models");
const { uploadAsync } = require("../util/imgurUtil");

const { Restaurant, User } = db;

const adminController = {
  // render one restaurant
  getRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id).then(restaurant => {
      return res.render("admin/restaurant", { restaurant });
    });
  },
  // render all restaurants
  getRestaurants: (req, res) => {
    return Restaurant.findAll({ order: [["id", "ASC"]] }).then(restaurants => {
      return res.render("admin/restaurants", { restaurants });
    });
  },
  // render the create-restautant page, which is also the edit-restaurant page
  createRestaurant: (req, res) => {
    return res.render("admin/create");
  },
  // create a restaurant and then redirect to /admin/restaurants
  postRestaurant: async (req, res) => {
    if (!req.body.name) {
      req.flashError("name didn't exist");
      return res.redirect("back");
    }

    const { file, body } = req;
    const img = await uploadAsync(file);
    // in case either img or img.data is null or undefined
    body.image = img && img.data ? img.data.link : null;

    return Restaurant.create(body).then(restaurant => {
      req.flashSuccess("restaurant was successfully created");
      res.redirect("/admin/restaurants");
    });
  },
  // render edit-restaurant page, which is also the create Restaurant page
  editRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id).then(restaurant => {
      return res.render("admin/create", { restaurant });
    });
  },
  // update a restaurant data and then redirect to /admin/restaurants
  putRestaurant: async (req, res) => {
    if (!req.body.name) {
      req.flashError("name didn't exist");
      return res.redirect("back");
    }

    const { file, body } = req;
    const img = await uploadAsync(file);
    body.image = img && img.data ? img.data.link : null;

    return Restaurant.findByPk(req.params.id).then(restaurant => {
      body.image = body.image || restaurant.image;
      restaurant.update(body).then(restaurant => {
        req.flashSuccess("restaurant updated successfully");
        res.redirect("/admin/restaurants");
      });
    });
  },
  // delete a restaurant data and then redirect to /admin/restaurants
  deleteRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id).then(restaurant => {
      restaurant
        .destroy()
        .then(restaurant => res.redirect("/admin/restaurants"));
    });
  },
  // render all users
  editUsers: (req, res) => {
    return User.findAll({ order: [["id", "ASC"]] }).then(users => {
      res.render("admin/users", { users });
    });
  },
  // update a user data and then redirect to /admin/users
  putUsers: (req, res) => {
    return User.findByPk(req.params.id).then(user => {
      user.update({ isAdmin: !user.isAdmin }).then(user => {
        req.flashSuccess(`user: ${user.email} was updated successfully`);
        res.redirect("/admin/users");
      });
    });
  }
};

module.exports = adminController;
