const { Review, User } = require("../models");

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
      where: { recipeId: req.params.recipeId },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "username"]
        }
      ]
    });
    res.json({ reviews });
  } catch (error) {
    next(error);
  }
};
