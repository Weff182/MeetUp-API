const { meetupBodyDTO, meetupQueryDTO, meetupParamDTO } = require('../dto/meetup.dto');
const ApiError = require('../error/apiError');

module.exports = async function (req, res, next) {
  try {
    if (Object.keys(req.query).length !== 0) {
      await meetupQueryDTO.validateAsync(req.query);
    }
    if (Object.keys(req.body).length !== 0) {
      await meetupBodyDTO.validateAsync(req.body);
    }
    if (Object.keys(req.params).length !== 0) {
      await meetupParamDTO.validateAsync(req.params);
    }
    next();
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};
