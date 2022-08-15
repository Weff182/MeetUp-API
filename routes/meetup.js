const Router = require('express');

const router = new Router();
const MeetUpController = require('../controllers/meetup');
const checkRole = require('../middleware/checkRoleMiddleware');
const meetupValidate = require('../middleware/meetupValidateMiddleware');

router.get('/', meetupValidate, MeetUpController.getAll);
router.get('/:id', meetupValidate, MeetUpController.getOne);
router.post('/', checkRole('ADMIN'), meetupValidate, MeetUpController.create);
router.patch('/:id', checkRole('ADMIN'), meetupValidate, MeetUpController.update);
router.delete('/:id', checkRole('ADMIN'), meetupValidate, MeetUpController.delete);

module.exports = router;
