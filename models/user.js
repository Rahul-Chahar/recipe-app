const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      role: {
        type: DataTypes.STRING,
        defaultValue: "user"
      }
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          user.password = await bcrypt.hash(user.password, 10);
        }
      }
    }
  );

  User.prototype.validatePassword = function (password) {
    return bcrypt.compare(password, this.password);
  };

  return User;
};
