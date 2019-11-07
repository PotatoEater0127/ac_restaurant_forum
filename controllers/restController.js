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
      where.categoryId = categoryId;
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
      description: rest.dataValues.description.substring(0, 50)
    }));
    const categories = await Category.findAll();
    console.log("page:", page, "pages:", pages, "prev:", prev, "next:", next);
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

  getRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id, {
      include: [Category, { model: Comment, include: [User] }]
    }).then(restaurant => res.render("restaurant", { restaurant }));
  },

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
  }
};

module.exports = restController;
