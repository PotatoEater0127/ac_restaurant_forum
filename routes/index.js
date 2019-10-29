const restController = require('../controllers/restController.js');
const adminConroller = require('../controllers/adminController.js');
const userController = require('../controllers/userController.js');

module.exports = app => {
  // requests of restaurants
  app.get('/', (req, res) => {
    res.redirect('/restaurants');
  });
  app.get('/restaurants', restController.getRestaurants);

  // requests of admin
  app.get('/admin', (req, res) => {
    res.redirect('/admin/restaurants');
  });
  app.get('/admin/restaurants', adminConroller.getRestaurants);

  // requests of signup
  app.get('/signup', userController.signUpPage);
  app.post('/signup', userController.signUp);
};
