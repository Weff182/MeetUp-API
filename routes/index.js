const Router = require("express");
const router = new Router();
const meetupRouter = require("./meetup");
const userRouter = require("./user");
const authRouter = require("./auth")

router.use("/users", userRouter);
router.use("/meetups", meetupRouter);
router.use("/auth", authRouter);
module.exports = router;
