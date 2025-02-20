const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { authenticate } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/adminMiddleware");

router.use(authenticate, isAdmin);

router.get("/users", adminController.getAllUsers);
router.put("/users/:userId", adminController.updateUserStatus);
router.get("/recipes", adminController.getAllRecipes);
router.delete("/recipes/:recipeId", adminController.deleteRecipeByAdmin);

module.exports = router;
