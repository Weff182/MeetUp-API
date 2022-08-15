const ApiError = require('../error/apiError');
const UserService = require('../service/user');

class UserController {
  async registartion(req, res, next) {
    try {
      const { email, password, role } = req.body;
      const token = await UserService.registartion(email, password, role);
      return res.status(200).json({ token });
    } catch (error) {
      return next(new ApiError(error.name, error.status, error.message));
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const token = await UserService.login(email, password);
      return res.status(200).json({ token });
    } catch (error) {
      return next(new ApiError(error.name, error.status, error.message));
    }
  }

  async check(req, res) {
    const token = await UserService.check(req.user);
    return res.status(200).json({ token });
  }
}

module.exports = new UserController();
