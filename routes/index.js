const restController = require('../controllers/restController.js');
const adminConroller = require('../controllers/adminController.js');
const userController = require('../controllers/userController.js');

module.exports = (app, passport) => {
  const authenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/signin');
  };
  const authenticatedAdmin = (req, res, next) => {
    if (req.isAuthenticated()) {
      if (req.user.isAdmin) {
        return next();
      }
      return res.redirect('/');
    }
    res.redirect('/signin');
  };

  //* requests of restaurants
  app.get('/', authenticated, (req, res) => {
    res.redirect('/restaurants');
  });
  app.get('/restaurants', authenticated, restController.getRestaurants);

  //* requests of admin
  app.get('/admin', authenticatedAdmin, (req, res) => {
    res.redirect('/admin/restaurants');
  });
  app.get(
    '/admin/restaurants/:id',
    authenticatedAdmin,
    adminConroller.getRestaurant,
  );
  app.get(
    '/admin/restaurants',
    authenticatedAdmin,
    adminConroller.getRestaurants,
  );
  app.get(
    '/admin/restaurants/create',
    authenticatedAdmin,
    adminConroller.createRestaurant,
  );
  app.post(
    '/admin/restaurants',
    authenticatedAdmin,
    adminConroller.postRestaurant,
  );
  //*

  //* requests of signup
  app.get('/signup', userController.signUpPage);
  app.post('/signup', userController.signUp);

  //* requests of signin
  app.get('/signin', userController.signInpage);
  app.post(
    '/signin',
    passport.authenticate('local', {
      failureRedirect: 'signin',
      failureFlash: true,
    }),
    userController.signIn,
  );
};
