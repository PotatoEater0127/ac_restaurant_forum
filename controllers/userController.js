const bcrypt = require('bcrypt-nodejs');
const db = require('../models');
const User = db.User;

const userController = {
  signUpPage: (req, res) => {
    return res.render('signup');
  },
  signUp: (req, res) => {
    User.creare({
      name: req.body.name,
      email: reqbody.email,
      password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
    }).then(user => {
      return res.redirect('/signin');
    });
  }
};

module.exports = userController;
