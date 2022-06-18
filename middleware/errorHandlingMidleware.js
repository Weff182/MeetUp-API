const ApiError = require("../error/apiError");
const logger = require("../log/log");

module.exports = function (err, req, res, next) {
  if (err instanceof ApiError) {
    logger.error(`${err.name}: [status ${err.status}], message: ${err.message}`)
    return res.status(err.status).json({ message: err.message }); 
  }
  logger.error(`${err.name}: [status 500], message: Unexpected error, please check your code`)
  return res
    .status(500)
    .json({ message: "Unexpected error, please check your code" });
};
