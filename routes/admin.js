const adminControllor = require('../controllers/adminController.js');
const admin = require('express').Router();

const authenticatedAdmin = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.isAdmin) {
      return next();
    }
    return res.redirect('/');
  }
  res.redirect('/signin');
};

//  apply admin authentication to all admin routes
admin.use(authenticatedAdmin);
admin.get('/', (req, res) => {
  res.redirect('/restaurants');
});
admin.route('/restaurants')
      .get(adminControllor.getRestaurants)
      .post(adminControllor.postRestaurant);
admin.get('/restaurants/create', adminControllor.createRestaurant);
admin.route('/restaurants/:id')
      .get(adminControllor.getRestaurant)
      .put(adminControllor.putRestaurant)
      .delete(adminControllor.deleteRestaurant);
admin.get('/restaurants/:id/edit', adminControllor.editRestaurant);

module.exports = admin;