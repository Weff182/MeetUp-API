const { userDTO } = require('../dto/user.dto');
const ApiError = require('../error/apiError');

module.exports = async function (req, res, next) {
  try {
    await userDTO.validateAsync(req.body);
    next();
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};
