const Router = require('express');

const router = new Router();
const UserController = require('../controllers/user');
const authMiddleware = require('../middleware/authMiddleware');
const userValidate = require('../middleware/userValidateMiddleware');

router.post('/registration', userValidate, UserController.registartion);
router.post('/login', userValidate, UserController.login);
router.get('/auth', authMiddleware, UserController.check);

module.exports = router;
