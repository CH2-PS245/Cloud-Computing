const router = require("express").Router();
const foodController = require("../controllers/foodController");

router.get("/", foodController.getFoods);
router.get("/search", foodController.searchFood);
router.get("/act/dump-data", foodController.dumpFood);

module.exports = router;
