// models/follow.js
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define("Follow", {}, {
    timestamps: false,
    freezeTableName: true, // Use the exact table name "Follows"
    tableName: "Follows"
  });
  return Follow;
};
