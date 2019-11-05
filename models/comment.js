module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      text: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
      RestaurantId: DataTypes.INTEGER
    },
    {}
  );
  Comment.associate = models => {
    Comment.belongsTo(models.User);
    Comment.belongsTo(models.Restaurant);
  };
  return Comment;
};
