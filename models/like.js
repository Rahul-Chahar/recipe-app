// models/like.js
module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define(
      "Like",
      {
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: "userId"  // Forces the column name to be "userId"
        },
        recipeId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: "recipeId" // Forces the column name to be "recipeId"
        }
      },
      {
        timestamps: false,
        freezeTableName: true, // Prevents pluralization of the table name
        tableName: "Likes"
      }
    );
    return Like;
  };
  