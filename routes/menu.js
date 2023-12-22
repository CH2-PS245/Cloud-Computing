const router = require("express").Router();
const menuController = require("../controllers/menuController");

router.get("/act/dump-data", menuController.dumpMenu);

module.exports = router;
