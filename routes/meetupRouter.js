const Router = require('express')
const router = new Router()
const meetUpController = require('../controllers/meetupController')

router.get('/', meetUpController.getAll)
router.get('/:id', meetUpController.getOne)
router.post('/', meetUpController.create)
router.patch('/:id', meetUpController.update)
router.delete('/:id', meetUpController.delete)

module.exports = router