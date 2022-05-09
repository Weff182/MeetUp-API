const Router = require('express')
const router = new Router()
const meetUpController = require('../controllers/meetupController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', meetUpController.getAll)
router.get('/:id', meetUpController.getOne)
router.post('/',checkRole('ADMIN'), meetUpController.create)
router.patch('/:id',checkRole('ADMIN'), meetUpController.update)
router.delete('/:id',checkRole('ADMIN'), meetUpController.delete)

module.exports = router