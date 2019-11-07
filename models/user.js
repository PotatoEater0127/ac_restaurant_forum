module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
      image: DataTypes.STRING
    },
    {}
  );
  User.associate = models => {
    User.hasMany(models.Comment);
    User.belongsToMany(models.Restaurant, {
      through: models.Favorite,
      foreignKey: "UserId",
      as: "FavoritedUsers"
    });
  };
  return User;
};
