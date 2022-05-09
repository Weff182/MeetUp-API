const Router = require('express')
const router = new Router()
const meetupRouter = require('./meetupRouter')
const userRouter = require('./userRouter')


router.use('/users', userRouter)
router.use('/meetups', meetupRouter)
module.exports = router