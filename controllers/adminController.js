const { User, Recipe } = require("../models");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json({ users });
  } catch (error) {
    next(error);
  }
};

exports.updateUserStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const user = await User.findByPk(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    await user.update({ role: status });
    res.json({ message: "User status updated successfully", user });
  } catch (error) {
    next(error);
  }
};

exports.getAllRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.findAll();
    res.json({ recipes });
  } catch (error) {
    next(error);
  }
};

exports.deleteRecipeByAdmin = async (req, res, next) => {
  try {
    const recipe = await Recipe.findByPk(req.params.recipeId);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    await recipe.destroy();
    res.json({ message: "Recipe deleted successfully by admin" });
  } catch (error) {
    next(error);
  }
};
