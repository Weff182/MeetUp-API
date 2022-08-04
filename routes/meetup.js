const Router = require("express");
const router = new Router();
const MeetUpController = require("../controllers/meetup");
const checkRole = require("../middleware/checkRoleMiddleware");

router.get("/", MeetUpController.getAll);
router.get("/:id", MeetUpController.getOne);
router.post("/", checkRole("ADMIN"), MeetUpController.create);
router.patch("/:id", checkRole("ADMIN"), MeetUpController.update);
router.delete("/:id", checkRole("ADMIN"), MeetUpController.delete);

module.exports = router;
