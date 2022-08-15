const ApiError = require('../error/apiError');
const MeetupService = require('../service/meetup');
const decodeToken = require('../utils/decodeToken');

class MeetUpController {
  getAll = async (req, res, next) => {
    try {
      const {
        title, limit, page, sort, userId,
      } = req.query;
      const meetUps = await MeetupService.getAll(title, userId, limit, page, sort);
      return res.status(200).json(meetUps);
    } catch (error) {
      return next(new ApiError(error.name, error.status, error.message));
    }
  };

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const meetUp = await MeetupService.getOne(id);
      return res.status(200).json(meetUp);
    } catch (error) {
      return next(new ApiError(error.name, error.status, error.message));
    }
  }

  async create(req, res, next) {
    try {
      const userId = decodeToken(req.headers.authorization);
      const mettUp = await MeetupService.create({ ...req.body, userId: userId.id });
      return res.status(201).json(mettUp);
    } catch (error) {
      return next(new ApiError(error.name, error.status, error.message));
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { description } = req.body;
      const meetUp = await MeetupService.update(id, description);
      return res.status(200).json(meetUp);
    } catch (error) {
      return next(new ApiError(error.name, error.status, error.message));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deletedId = await MeetupService.delete(id);
      return res.status(200).json({ id: deletedId });
    } catch (error) {
      return next(new ApiError(error.name, error.status, error.message));
    }
  }
}

module.exports = new MeetUpController();
