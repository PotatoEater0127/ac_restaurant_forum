const { Restaurant, Category, Comment, User } = require("../models");

const pageLimit = 10;

const restController = {
  getRestaurants: async (req, res) => {
    let offset = 0;
    let { categoryId, page } = req.query;
    const where = {};
    if (page) {
      offset = (page - 1) * pageLimit;
    }
    categoryId = Number(categoryId) || "";
    if (categoryId) {
      where.CategoryId = categoryId;
    }

    const result = await Restaurant.findAndCountAll({
      include: Category,
      limit: pageLimit,
      where,
      offset
    });
    // data for pagination
    page = Number(page) || 1;
    const maxPage = Math.ceil(result.count / pageLimit);
    const pages = Array.from({ length: maxPage }).map(
      (item, index) => index + 1
    );
    const prev = page - 1 < 1 ? 1 : page - 1;
    const next = page + 1 > maxPage ? maxPage : page + 1;
    // clean up restaurants data
    const restaurants = result.rows.map(rest => ({
      ...rest.dataValues,
      description: rest.dataValues.description.substring(0, 50),
      isFavorited: req.user.FavoritedRestaurants.map(fav => fav.id).includes(
        rest.id
      ),
      isLiked: req.user.LikedRestaurants.map(liked => liked.id).includes(
        rest.id
      )
    }));
    const categories = await Category.findAll();
    return res.render("restaurants", {
      restaurants,
      categories,
      categoryId,
      page,
      pages,
      prev,
      next
    });
  },

  getRestaurant: (req, res) =>
    Restaurant.findByPk(req.params.id, {
      include: [
        Category,
        { model: Comment, include: [User] },
        { model: User, as: "FavoritedUsers" },
        { model: User, as: "LikedUsers" }
      ]
    })
      .then(restaurant =>
        restaurant.update({ viewCounts: restaurant.viewCounts + 1 })
      )
      .then(restaurant => {
        const isFavorited = restaurant.FavoritedUsers.map(
          user => user.id
        ).includes(req.user.id);
        const isLiked = restaurant.LikedUsers.map(user => user.id).includes(
          req.user.id
        );
        res.render("restaurant", { restaurant, isFavorited, isLiked });
      }),

  getFeeds: async (req, res) => {
    const restaurants = await Restaurant.findAll({
      limit: 10,
      order: [["createdAt", "DESC"]],
      include: [Category]
    });
    const comments = await Comment.findAll({
      limit: 10,
      order: [["createdAt", "DESC"]],
      include: [User, Restaurant]
    });
    res.render("feeds", { restaurants, comments });
  },

  getDashboard: (req, res) =>
    Restaurant.findByPk(req.params.id, { include: [Category, Comment] }).then(
      restaurant => res.render("dashboard", { restaurant })
    )
};

module.exports = restController;
