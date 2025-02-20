// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticate } = require("../middlewares/authMiddleware");

// Existing profile and favorites endpoints...
router.get("/profile", authenticate, userController.getProfile);
router.put("/profile", authenticate, userController.updateProfile);
router.get("/favorites", authenticate, userController.getFavorites);
router.post("/favorites", authenticate, userController.addFavorite);
router.delete("/favorites/:recipeId", authenticate, userController.removeFavorite);

// New endpoints for following and activity feed:
router.get("/all", authenticate, userController.getAllUsers); // List all users to follow
router.post("/:targetUserId/follow", authenticate, userController.followUser);
router.delete("/:targetUserId/unfollow", authenticate, userController.unfollowUser);
router.get("/feed", authenticate, userController.getActivityFeed);

module.exports = router;
