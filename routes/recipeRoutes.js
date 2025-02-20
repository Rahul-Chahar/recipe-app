// routes/recipeRoutes.js
const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");
const { authenticate } = require("../middlewares/authMiddleware");

// Existing endpoints...
router.get("/", recipeController.getRecipes);
router.get("/:recipeId", recipeController.getRecipeById);
router.post("/", authenticate, recipeController.createRecipe);
router.put("/:recipeId", authenticate, recipeController.updateRecipe);
router.delete("/:recipeId", authenticate, recipeController.deleteRecipe);

// New endpoints for likes
router.get("/:recipeId/like-status", authenticate, recipeController.getLikeStatus);
router.post("/:recipeId/like", authenticate, recipeController.toggleLike);

module.exports = router;
