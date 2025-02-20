module.exports = (sequelize, DataTypes) => {
    const Collection = sequelize.define("Collection", {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: DataTypes.TEXT
    });
    return Collection;
  };
  