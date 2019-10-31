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
      req.flash('error_messages', ' 兩次密碼輸入不同');
      return res.redirect('./signup');
    }

    User.findOne({ where: { email: req.body.email } }).then(user => {
      if (user) {
        req.flash('error_messages', '信箱重複');
        return res.redirect('./signup');
      }
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(
          req.body.password,
          bcrypt.genSaltSync(10),
          null
        )
      }).then(user => {
        req.flash('success_message', '成功註冊帳號');
        return res.redirect('/signin');
      });
    });
  }
};

module.exports = userController;
