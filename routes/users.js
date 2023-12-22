const router = require("express").Router();
const userController = require("../controllers/userController");

router.get("/", userController.getUser);
router.get("/:id", userController.getUserById);
router.post("/register", userController.registerUser);
router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
