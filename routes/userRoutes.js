// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticate } = require("../middlewares/authMiddleware");

// Profile endpoints
router.get("/profile", authenticate, userController.getProfile);
router.put("/profile", authenticate, userController.updateProfile);

// Favorites endpoints
router.post("/favorites", authenticate, userController.addFavorite);
router.get("/favorites", authenticate, userController.getFavorites);
router.delete("/favorites/:recipeId", authenticate, userController.removeFavorite);

module.exports = router;
