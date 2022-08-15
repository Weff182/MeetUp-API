const jwt = require('jsonwebtoken');
const ApiError = require('../error/apiError');

module.exports = function (role) {
  return function (req, res, next) {
    if (req.method === 'OPTIONS') {
      next();
    }
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded.role !== role) {
        throw ApiError.forbiden('The user does not have access');
      }
      req.user = decoded;
      next();
    } catch (error) {
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        error.status = 401;
      }
      return next(new ApiError(error.name, error.status, error.message));
    }
  };
};
