const router = require("express").Router();
const restaurantController = require("../controllers/restaurantController");

router.get("/", restaurantController.getRestaurant);
router.get("/:id", restaurantController.viewDetailRestaurant);
router.get("/act/dump-data", restaurantController.dumpRestaurant);

module.exports = router;
