const bcrypt = require('bcrypt-nodejs');
const db = require('../models');
const User = db.User;

const userController = {
  signUpPage: (req, res) => {
    return res.render('signup');
  },
  signUp: (req, res) => {
    // confirm password
    if (req.body.passwordCheck !== req.body.password) {
      req.flashError('兩次密碼輸入不同');
      return res.redirect('./signup');
    }

    User.findOne({ where: { email: req.body.email } }).then(user => {
      if (user) {
        req.flashError('信箱重複');
        return res.redirect('./signup');
      }
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(
          req.body.password,
          bcrypt.genSaltSync(10),
          null,
        ),
      }).then(user => {
        req.flashSuccess('成功註冊帳號');
        return res.redirect('/signin');
      });
    });
  },

  signInpage: (req, res) => {
    return res.render('signin');
  },

  signIn: (req, res) => {
    req.flashSuccess('登入成功');
    res.redirect('/restaurants');
  },

  logout: (req, res) => {
    req.flashSuccess('登出成功');
    req.logout();
    res.redirect('/signin');
  },
};

module.exports = userController;
