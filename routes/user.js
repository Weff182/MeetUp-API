const Router = require("express");
const router = new Router();
const UserController = require("../controllers/user");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/registration", UserController.registartion);
router.post("/login", UserController.login);
router.get("/auth", authMiddleware, UserController.check);

module.exports = router;
