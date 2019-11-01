const db = require('../models');
const Restaurant = db.Restaurant;

const adminController = {
  // render one restaurant
  getRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id).then(restaurant => {
      return res.render('admin/restaurant', { restaurant });
    });
  },
  // render all restaurants
  getRestaurants: (req, res) => {
    return Restaurant.findAll().then(restaurants => {
      return res.render('admin/restaurants', { restaurants });
    });
  },
  // render the create-restautant page, which is also the edit-restaurant page
  createRestaurant: (req, res) => {
    return res.render('admin/create');
  },
  // create a restaurant and then redirect to /admin/restaurants
  postRestaurant: (req, res) => {
    if (!req.body.name) {
      req.flashError("name didn't exist");
      return res.redirect('back');
    }
    return Restaurant.create({
      name: req.body.name,
      tel: req.body.tel,
      address: req.body.address,
      opening_hours: req.body.opening_hours,
      description: req.body.description,
    }).then(restaurant => {
      req.flashSuccess('restaurant was successfully created');
      res.redirect('/admin/restaurants');
    });
  },
  // render edit-restaurant page, which is also the create Restaurant page
  editRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id).then(restaurant => {
      return res.render('admin/create', { restaurant });
    });
  },
  // update a restaurant data and then redirect to /admin/restaurants
  putRestaurant: (req, res) => {
    if (!req.body.name) {
      req.flashError("name didn't exist");
      return res.redirect('back');
    }
    return Restaurant.findByPk(req.params.id).then(restaurant => {
      restaurant
        .update({
          name: req.body.name,
          tel: req.body.tel,
          address: req.body.address,
          opening_hours: req.body.opening_hours,
          description: req.body.description,
        })
        .then(restaurant => {
          req.flashSuccess('restaurant updated successfully');
          res.redirect('/admin/restaurants');
        });
    });
  },
  // delete a restaurant data and then redirect to /admin/restaurants
  deleteRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id).then(restaurant => {
      restaurant
        .destroy()
        .then(restaurant => res.redirect('/admin/restaurants'));
    });
  },
};

module.exports = adminController;