const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const { authenticate } = require("../middlewares/authMiddleware");

router.post("/:recipeId", authenticate, reviewController.addReview);
router.get("/:recipeId", reviewController.getReviews);

module.exports = router;
