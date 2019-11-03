const fs = require("fs");
const imgur = require("imgur-node-api");
const db = require("../models");

const IMGUR_CLIENT_ID = "9aa295fe15b05c9";
const { Restaurant } = db;

const adminController = {
  // render one restaurant
  getRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id).then(restaurant => {
      return res.render("admin/restaurant", { restaurant });
    });
  },
  // render all restaurants
  getRestaurants: (req, res) => {
    return Restaurant.findAll().then(restaurants => {
      return res.render("admin/restaurants", { restaurants });
    });
  },
  // render the create-restautant page, which is also the edit-restaurant page
  createRestaurant: (req, res) => {
    return res.render("admin/create");
  },
  // create a restaurant and then redirect to /admin/restaurants
  postRestaurant: (req, res) => {
    if (!req.body.name) {
      req.flashError("name didn't exist");
      return res.redirect("back");
    }

    const { file } = req;
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID);
      imgur.upload(file.path, (err, img) => {
        return Restaurant.create({
          name: req.body.name,
          tel: req.body.tel,
          address: req.body.address,
          opening_hours: req.body.opening_hours,
          description: req.body.description,
          image: file ? img.data.link : null
        }).then(restaurant => {
          req.flashSuccess("restaurant was successfully created");
          res.redirect("/admin/restaurants");
        });
      });
    } else {
      return Restaurant.create({
        name: req.body.name,
        tel: req.body.tel,
        address: req.body.address,
        opening_hours: req.body.opening_hours,
        description: req.body.description,
        image: file ? `/upload/${file.originalname}` : null
      }).then(restaurant => {
        req.flashSuccess("restaurant was successfully created");
        res.redirect("/admin/restaurants");
      });
    }
  },
  // render edit-restaurant page, which is also the create Restaurant page
  editRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id).then(restaurant => {
      return res.render("admin/create", { restaurant });
    });
  },
  // update a restaurant data and then redirect to /admin/restaurants
  putRestaurant: (req, res) => {
    console.log(req.body);
    if (!req.body.name) {
      req.flashError("name didn't exist");
      return res.redirect("back");
    }
    const { file } = req;
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID);
      imgur.upload(file.path, (err, img) => {
        return Restaurant.findByPk(req.params.id).then(restaurant => {
          restaurant
            .update({
              name: req.body.name,
              tel: req.body.tel,
              address: req.body.address,
              opening_hours: req.body.opening_hours,
              description: req.body.description,
              image: file ? img.data.link : restaurant.image
            })
            .then(restaurant => {
              req.flashSuccess("restaurant updated successfully");
              res.redirect("/admin/restaurants");
            });
        });
      });
    } else {
      return Restaurant.findByPk(req.params.id).then(restaurant => {
        restaurant
          .update({
            name: req.body.name,
            tel: req.body.tel,
            address: req.body.address,
            opening_hours: req.body.opening_hours,
            description: req.body.description,
            image: restaurant.image
          })
          .then(restaurant => {
            req.flashSuccess("restaurant updated successfully");
            res.redirect("/admin/restaurants");
          });
      });
    }
  },
  // delete a restaurant data and then redirect to /admin/restaurants
  deleteRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id).then(restaurant => {
      restaurant
        .destroy()
        .then(restaurant => res.redirect("/admin/restaurants"));
    });
  }
};

module.exports = adminController;
