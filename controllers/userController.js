const bcrypt = require("bcrypt-nodejs");
const { User } = require("../models");
const { uploadAsync } = require("../util/imgurUtil");

const userController = {
  signUpPage: (req, res) => {
    return res.render("signup");
  },

  signUp: (req, res) => {
    // confirm password
    if (req.body.passwordCheck !== req.body.password) {
      return res.redirect("./signup");
    }

    User.findOne({ where: { email: req.body.email } }).then(user => {
      if (user) {
        req.flashError("信箱重複");
        return res.redirect("./signup");
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
        req.flashSuccess("成功註冊帳號");
        return res.redirect("/signin");
      });
    });
  },

  getUser: (req, res) => {
    User.findByPk(req.params.id).then(user => res.render("user", { user }));
  },

  editUser: (req, res) => {
    User.findByPk(req.params.id).then(user => res.render("editUser", { user }));
  },

  putUser: async (req, res) => {
    const { file, body } = req;
    const { id } = req.user;
    const img = await uploadAsync(file);
    body.image = img && img.data ? img.data.link : null;

    User.findByPk(id)
      .then(user => {
        body.image = body.image ? body.image : user.image;
        return user.update(body);
      })
      .then(user => {
        req.flashSuccess(`Your profile is updated successfully`);
        res.redirect(`/users/${user.id}`);
      });
  },

  signInpage: (req, res) => {
    return res.render("signin");
  },

  signIn: (req, res) => {
    req.flashSuccess("登入成功");
    res.redirect("/restaurants");
  },

  logout: (req, res) => {
    req.flashSuccess("登出成功");
    req.logout();
    res.redirect("/signin");
  }
};

module.exports = userController;
