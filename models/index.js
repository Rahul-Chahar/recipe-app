const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {};

fs.readdirSync(__dirname)
  .filter((file) => file !== "index.js" && file.slice(-3) === ".js")
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Define associations
db.User.hasMany(db.Recipe, { foreignKey: "userId", as: "recipes" });
db.Recipe.belongsTo(db.User, { foreignKey: "userId", as: "author" });

db.User.hasMany(db.Review, { foreignKey: "userId", as: "reviews" });
db.Recipe.hasMany(db.Review, { foreignKey: "recipeId", as: "reviews" });
db.Review.belongsTo(db.User, { foreignKey: "userId", as: "user" });
db.Review.belongsTo(db.Recipe, { foreignKey: "recipeId", as: "recipe" });

db.User.hasMany(db.Collection, { foreignKey: "userId", as: "collections" });
db.Collection.belongsTo(db.User, { foreignKey: "userId", as: "user" });

// Favorite: many-to-many between User and Recipe
db.User.belongsToMany(db.Recipe, {
  through: db.Favorite,
  as: "favorites",
  foreignKey: "userId"
});
db.Recipe.belongsToMany(db.User, {
  through: db.Favorite,
  as: "favoredBy",
  foreignKey: "recipeId"
});

// Follow: self-referencing many-to-many for Users
db.User.belongsToMany(db.User, {
  through: db.Follow,
  as: "followers",
  foreignKey: "followingId"
});
db.User.belongsToMany(db.User, {
  through: db.Follow,
  as: "following",
  foreignKey: "followerId"
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
