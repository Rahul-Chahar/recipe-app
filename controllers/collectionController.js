const { Collection } = require("../models");

exports.createCollection = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const collection = await Collection.create({
      userId: req.user.id,
      name,
      description
    });
    res.status(201).json({ message: "Collection created successfully", collection });
  } catch (error) {
    next(error);
  }
};

exports.addRecipeToCollection = async (req, res, next) => {
  try {
    
    res.json({ message: "Recipe added to collection" });
  } catch (error) {
    next(error);
  }
};

exports.getCollections = async (req, res, next) => {
  try {
    const collections = await Collection.findAll({ where: { userId: req.user.id } });
    res.json({ collections });
  } catch (error) {
    next(error);
  }
};

exports.updateCollection = async (req, res, next) => {
  try {
    const collection = await Collection.findByPk(req.params.collectionId);
    if (!collection || collection.userId !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await collection.update(req.body);
    res.json({ message: "Collection updated successfully", collection });
  } catch (error) {
    next(error);
  }
};

exports.deleteCollection = async (req, res, next) => {
  try {
    const collection = await Collection.findByPk(req.params.collectionId);
    if (!collection || collection.userId !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await collection.destroy();
    res.json({ message: "Collection deleted successfully" });
  } catch (error) {
    next(error);
  }
};
