const { Review } = require("../models");

exports.addReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const review = await Review.create({
      userId: req.user.id,
      recipeId: req.params.recipeId,
      rating,
      comment
    });
    res.status(201).json({ message: "Review added successfully", review });
  } catch (error) {
    next(error);
  }
};

exports.getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      where: { recipeId: req.params.recipeId }
    });
    res.json({ reviews });
  } catch (error) {
    next(error);
  }
};

exports.updateReview = async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.reviewId);
    if (!review || review.userId !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await review.update(req.body);
    res.json({ message: "Review updated successfully", review });
  } catch (error) {
    next(error);
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.reviewId);
    if (!review || review.userId !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await review.destroy();
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    next(error);
  }
};
