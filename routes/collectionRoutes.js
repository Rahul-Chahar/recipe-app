const express = require("express");
const router = express.Router();
const collectionController = require("../controllers/collectionController");
const { authenticate } = require("../middlewares/authMiddleware");

router.post("/", authenticate, collectionController.createCollection);
router.post("/:collectionId/recipes", authenticate, collectionController.addRecipeToCollection);
router.get("/", authenticate, collectionController.getCollections);
router.put("/:collectionId", authenticate, collectionController.updateCollection);
router.delete("/:collectionId", authenticate, collectionController.deleteCollection);

module.exports = router;
