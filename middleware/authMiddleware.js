const jwt = require('jsonwebtoken');
const ApiError = require('../error/apiError');

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    error.status = 401;
    return next(new ApiError(error.name, error.status, error.message));
  }
};
