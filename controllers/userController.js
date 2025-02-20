const { User, Recipe } = require("../models");

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [
        { model: Recipe, as: "recipes" },
        { model: Recipe, as: "favorites", through: { attributes: [] } }
      ]
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { firstName, lastName } = req.body;
    await User.update({ firstName, lastName }, { where: { id: req.user.id } });
    const updatedUser = await User.findByPk(req.user.id);
    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    next(error);
  }
};

// Add Favorite
exports.addFavorite = async (req, res, next) => {
  try {
    const { recipeId } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    // Using the Sequelize association method
    await user.addFavorite(recipeId);
    res.json({ message: "Recipe added to favorites" });
  } catch (error) {
    next(error);
  }
};

// Get Favorites (if needed)
exports.getFavorites = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [
        {
          model: Recipe,
          as: "favorites",
          through: { attributes: [] },
        },
      ],
    });
    res.json({ favorites: user.favorites });
  } catch (error) {
    next(error);
  }
};

// Remove Favorite (if needed)
exports.removeFavorite = async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    await user.removeFavorite(recipeId);
    res.json({ message: "Recipe removed from favorites" });
  } catch (error) {
    next(error);
  }
};
