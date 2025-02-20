const { User, Recipe, Review } = require("../models");
const { Op } = require("sequelize");

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

    // Check if the recipe is already favorited
    const existingFavorites = await user.getFavorites({ where: { id: recipeId } });
    if (existingFavorites.length > 0) {
      return res.status(400).json({ message: "Recipe already favorited" });
    }

    await user.addFavorite(recipeId);
    res.json({ message: "Recipe added to favorites" });
  } catch (error) {
    next(error);
  }
};

exports.removeFavorite = async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if the recipe is in favorites
    const existingFavorites = await user.getFavorites({ where: { id: recipeId } });
    if (existingFavorites.length === 0) {
      return res.status(400).json({ message: "Recipe not in favorites" });
    }

    await user.removeFavorite(recipeId);
    res.json({ message: "Recipe removed from favorites" });
  } catch (error) {
    next(error);
  }
};

exports.getFavorites = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [
        { model: require("../models").Recipe, as: "favorites", through: { attributes: [] } }
      ]
    });
    res.json({ favorites: user.favorites });
  } catch (error) {
    next(error);
  }
};

// Follow a user
exports.followUser = async (req, res, next) => {
  try {
    const targetUserId = req.params.targetUserId;
    const currentUserId = req.user.id;
    if (parseInt(targetUserId) === currentUserId) {
      return res.status(400).json({ message: "You cannot follow yourself." });
    }
    const user = await User.findByPk(currentUserId);
    if (!user) return res.status(404).json({ message: "Current user not found" });
    await user.addFollowing(targetUserId);
    res.json({ message: "User followed successfully" });
  } catch (error) {
    next(error);
  }
};

// Unfollow a user
exports.unfollowUser = async (req, res, next) => {
  try {
    const targetUserId = req.params.targetUserId;
    const currentUserId = req.user.id;
    const user = await User.findByPk(currentUserId);
    if (!user) return res.status(404).json({ message: "Current user not found" });
    await user.removeFollowing(targetUserId);
    res.json({ message: "User unfollowed successfully" });
  } catch (error) {
    next(error);
  }
};

// Get all users (excluding the current user)
exports.getAllUsers = async (req, res, next) => {
  try {
    const currentUserId = req.user.id;
    const users = await User.findAll({
      where: {
        id: { [Op.ne]: currentUserId }
      },
      attributes: ["id", "username"]
    });
    res.json({ users });
  } catch (error) {
    next(error);
  }
};

// Get activity feed: combine recipes and reviews from followed users
exports.getActivityFeed = async (req, res, next) => {
  try {
    const currentUserId = req.user.id;
    // Retrieve current user with the users they are following
    const user = await User.findByPk(currentUserId, {
      include: [{
        model: User,
        as: "following",
        attributes: ["id", "username"]
      }]
    });
    const followedIds = user.following.map(u => u.id);
    if (followedIds.length === 0) {
      return res.json({ feed: [] });
    }
    // Get recipes by followed users
    const recipes = await Recipe.findAll({
      where: { userId: followedIds },
      include: [{ model: User, as: "author", attributes: ["id", "username"] }],
      order: [["createdAt", "DESC"]]
    });
    // Get reviews by followed users
    const reviews = await Review.findAll({
      where: { userId: followedIds },
      include: [{ model: User, as: "user", attributes: ["id", "username"] }],
      order: [["createdAt", "DESC"]]
    });
    // Combine feed items
    const feedItems = [];
    recipes.forEach(recipe => {
      feedItems.push({
        type: "recipe",
        user: recipe.author,
        data: recipe,
        createdAt: recipe.createdAt
      });
    });
    reviews.forEach(review => {
      feedItems.push({
        type: "review",
        user: review.user,
        data: review,
        createdAt: review.createdAt
      });
    });
    // Sort items by createdAt (newest first)
    feedItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json({ feed: feedItems });
  } catch (error) {
    next(error);
  }
};