// controllers/adminController.js
const { User, Recipe } = require("../models");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "email", "role", "createdAt"],
      order: [["createdAt", "DESC"]]
    });
    res.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.toggleUserBan = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    // Toggle status: if active, set to banned; if banned, set to active
    user.status = user.status === "banned" ? "active" : "banned";
    await user.save();
    res.json({ message: `User ${user.status === "banned" ? "banned" : "approved"} successfully`, status: user.status });
  } catch (error) {
    console.error("Error toggling user ban:", error);
    res.status(500).json({ message: "Internal server error" });
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
