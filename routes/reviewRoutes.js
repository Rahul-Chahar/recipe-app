const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const { authenticate } = require("../middlewares/authMiddleware");

// Adding a review to a recipe
router.post("/:recipeId", authenticate, reviewController.addReview);
router.get("/:recipeId", reviewController.getReviews);
router.put("/:reviewId", authenticate, reviewController.updateReview);
router.delete("/:reviewId", authenticate, reviewController.deleteReview);

module.exports = router;
