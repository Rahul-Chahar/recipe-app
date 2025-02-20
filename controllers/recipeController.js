const { Recipe, Review, User } = require("../models");

exports.createRecipe = async (req, res, next) => {
  try {
    const {
      title,
      description,
      ingredients,
      instructions,
      cookingTime,
      servings,
      dietaryPreferences,
      difficulty,
      imageUrl
    } = req.body;
    const recipe = await Recipe.create({
      userId: req.user.id,
      title,
      description,
      ingredients,
      instructions,
      cookingTime,
      servings,
      dietaryPreferences,
      difficulty,
      imageUrl
    });
    res.status(201).json({ message: "Recipe created successfully", recipe });
  } catch (error) {
    next(error);
  }
};

exports.getRecipes = async (req, res, next) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    let where = {};
    if (search) {
      const { Op } = require("sequelize");
      where.title = { [Op.like]: `%${search}%` };
    }
    const { count, rows } = await Recipe.findAndCountAll({
      where,
      offset,
      limit: parseInt(limit),
      order: [["createdAt", "DESC"]]
    });
    res.json({ page, limit, total: count, recipes: rows });
  } catch (error) {
    next(error);
  }
};

exports.getRecipeById = async (req, res, next) => {
  try {
    const recipe = await Recipe.findByPk(req.params.recipeId, {
      include: [{ model: Review, as: "reviews" }]
    });
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(recipe);
  } catch (error) {
    next(error);
  }
};

exports.updateRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findByPk(req.params.recipeId);
    if (!recipe || recipe.userId !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await recipe.update(req.body);
    res.json({ message: "Recipe updated successfully", recipe });
  } catch (error) {
    next(error);
  }
};

exports.deleteRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findByPk(req.params.recipeId);
    if (!recipe || recipe.userId !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await recipe.destroy();
    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    next(error);
  }
};
