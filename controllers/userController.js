const bcrypt = require("bcrypt-nodejs");
const { User, Comment, Restaurant, Favorite, Like } = require("../models");
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

  getTopUser: (req, res) => {
    return User.findAll({
      include: [{ model: User, as: "Followers" }]
    }).then(users => {
      users = users.map(user => ({
        ...user.dataValues,
        FollowerCount: user.Followers.length,
        isFollowed: req.user.Followings.map(d => d.id).includes(user.id)
      }));
      users = users.sort((a, b) => b.FollowerCount - a.FollowerCount);
      return res.render("topUser", { users });
    });
  },

  getUser: async (req, res) => {
    const user = await User.findByPk(req.params.id, {
      include: [{ model: Comment, include: [Restaurant] }]
    });
    const allRests = user.Comments.map(com => com.Restaurant);
    // use a set to filter out duplicate restaurants
    const restaurants = allRests.reduce(
      ({ rests, idSet }, rest) => {
        if (!idSet.has(rest.id)) {
          rests.push(rest);
          idSet.add(rest.id);
        }
        return { rests, idSet };
      },
      { rests: [], idSet: new Set() }
    ).rests;

    res.render("user", { profile: user, restaurants });
  },

  editUser: (req, res) => {
    User.findByPk(req.params.id).then(user =>
      res.render("editUser", { profile: user })
    );
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

  addFavorite: (req, res) => {
    return Favorite.create({
      UserId: req.user.id,
      RestaurantId: req.params.restaurantId
    }).then(favorite => {
      console.log(favorite);
      return res.redirect("back");
    });
  },

  removeFavorite: (req, res) => {
    return Favorite.findOne({
      where: {
        UserId: req.user.id,
        RestaurantId: req.params.restaurantId
      }
    }).then(favorite => {
      favorite.destroy().then(restaurant => {
        return res.redirect("back");
      });
    });
  },

  addLike: (req, res) => {
    return Like.create({
      UserId: req.user.id,
      RestaurantId: req.params.restaurantId
    }).then(like => res.redirect("back"));
  },

  removeLike: (req, res) => {
    return Like.findOne({
      where: {
        UserId: req.user.id,
        RestaurantId: req.params.restaurantId
      }
    }).then(like => like.destroy().then(like => res.redirect("back")));
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
