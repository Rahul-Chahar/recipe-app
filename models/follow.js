// models/follow.js
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define("Follow", {}, {
    timestamps: false,
    freezeTableName: true,  // Use exactly "Follow" as table name
    tableName: "Follows"
  });
  return Follow;
};
