const restController = require('../controllers/restController.js');
const adminConroller = require('../controllers/adminController.js');
module.exports = app => {
  app.get('/', (req, res) => {
    res.redirect('/restaurants');
  });
  app.get('/restaurants', restController.getRestaurants);
  app.get('/admin', (req, res) => {
    res.redirect('/admin/restaurants');
  });
  app.get('/admin/restaurants', adminConroller.getRestaurants);
};
