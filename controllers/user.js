const ApiError = require("../error/apiError");
const { userDTO } = require("../dto/user.dto");
const UserService = require("../service/user");

class UserController {
  async registartion(req, res, next) {
    try {
      const { email, password, role } = req.body;
      await userDTO.validateAsync({ email: email, password: password });
      if (role && role !== "ADMIN") {
        return next(ApiError.badRequest("Inappropriate role"));
      }
      const token = await UserService.registartion(email, password, role);
      return res.status(200).json({ token });
    } catch (error) {
      if (error.name === "ValidationError") {
        return next(ApiError.badRequest("The parameters is incorect"));
      } 
      if (error instanceof ApiError) {
        return res.status(error.status).json({message: error.message});
      }
      return res.status(500);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      await userDTO.validateAsync({ email: email, password: password });
      const token = await UserService.login(email, password);
      return res.status(200).json({ token });
    } catch (error) {
      if (error.name === "ValidationError") {
        return next(ApiError.badRequest("The parameters must be a string"));
      }
      if (error instanceof ApiError){
        return res.status(error.status).json({message: error.message});
      } else {
        return res.status(500);
      }  
    }
  }
  async check(req, res) {
    const token = await UserService.check(req.user);
    return res.status(200).json({ token });
  }
}

module.exports = new UserController();
