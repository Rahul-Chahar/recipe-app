const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticate } = require("../middlewares/authMiddleware");

// Profile endpoints
router.get("/profile", authenticate, userController.getProfile);
router.put("/profile", authenticate, userController.updateProfile);

// Favorites endpoints (already implemented)
router.post("/favorites", authenticate, userController.addFavorite);
router.get("/favorites", authenticate, userController.getFavorites);
router.delete("/favorites/:recipeId", authenticate, userController.removeFavorite);

// New Social endpoints for following
router.get("/all", authenticate, userController.getAllUsers); // List all users
router.post("/:targetUserId/follow", authenticate, userController.followUser);
router.delete("/:targetUserId/unfollow", authenticate, userController.unfollowUser);

// Activity Feed endpoint
router.get("/feed", authenticate, userController.getActivityFeed);

module.exports = router;
