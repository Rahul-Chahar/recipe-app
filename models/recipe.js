module.exports = (sequelize, DataTypes) => {
    const Recipe = sequelize.define("Recipe", {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: DataTypes.TEXT,
      ingredients: {
        type: DataTypes.JSON,
        allowNull: false
      },
      instructions: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      cookingTime: DataTypes.INTEGER,
      servings: DataTypes.INTEGER,
      dietaryPreferences: {
        type: DataTypes.JSON
      },
      difficulty: DataTypes.STRING,
      imageUrl: DataTypes.STRING
    });
  
    return Recipe;
  };
  