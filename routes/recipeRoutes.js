const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");
const { authenticate } = require("../middlewares/authMiddleware");

// Public routes
router.get("/", recipeController.getRecipes);
router.get("/:recipeId", recipeController.getRecipeById);

// Protected routes
router.post("/", authenticate, recipeController.createRecipe);
router.put("/:recipeId", authenticate, recipeController.updateRecipe);
router.delete("/:recipeId", authenticate, recipeController.deleteRecipe);

module.exports = router;
