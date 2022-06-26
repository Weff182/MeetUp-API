const Router = require("express");
const router = new Router();
const meetupRouter = require("./meetupRouter");
const userRouter = require("./userRouter");
const authRouter = require("./authRouter")

router.use("/users", userRouter);
router.use("/meetups", meetupRouter);
router.use("/auth", authRouter);
module.exports = router;
