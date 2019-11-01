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

admin.use(authenticatedAdmin);
admin.get('/', (req, res) => {
  res.redirect('/restaurants');
});
admin.route('/restaurants')
      .get(adminControllor.getRestaurants)
      .post(adminControllor.postRestaurant);
admin.get('/restaurants/create', adminControllor.createRestaurant);
admin.get('/restaurants/:id', adminControllor.getRestaurant);
admin.get('/restaurants/:id/edit', adminControllor.editController);

module.exports = admin;