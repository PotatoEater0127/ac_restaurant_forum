const restautant = require("express").Router();
const restController = require("../controllers/restController.js");
const { authenticated } = require("../middlewares/authenticator.js");

restautant.use(authenticated);
restautant.get("/", restController.getRestaurants);
restautant.get("/feeds", restController.getFeeds);
restautant.get("/:id", restController.getRestaurant);
restautant.get("/:id/dashboard", restController.getDashboard);

module.exports = restautant;
