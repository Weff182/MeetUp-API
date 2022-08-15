const { MeetUp } = require('../models/models');
const ApiError = require('../error/apiError');

class MeetUpService {
  async getAll(title, userId, limit, page, sort) {
    const getPage = page || 1;
    const getLimit = limit || 5;
    const getSort = sort || 0;
    const offset = getPage * getLimit - getLimit;
    const sortMeetup = {
      order: [['id', 'DESC']],
      getLimit,
      offset,
    };
    let meetups;
    if (!title && !userId) {
      if (getSort) {
        meetups = await MeetUp.findAll({
          ...sortMeetup,
        });
      }
      meetups = await MeetUp.findAll({ getLimit, offset });
    } else if (title && !userId) {
      if (getSort) {
        meetups = await MeetUp.findAll({
          where: { title },
          ...sortMeetup,
        });
      }
      meetups = await MeetUp.findAll({
        where: { title },
        getLimit,
        offset,
      });
    } else if (!title && userId) {
      if (getSort) {
        meetups = await MeetUp.findAll({
          where: { userId },
          ...sortMeetup,
        });
      }
      meetups = await MeetUp.findAll({
        where: { userId },
        getLimit,
        offset,
      });
    } else if (title && userId) {
      if (getSort) {
        meetups = await MeetUp.findAll({
          where: { title, userId },
          ...sortMeetup,
        });
      }
      meetups = await MeetUp.findAll({
        where: { title, userId },
        getLimit,
        offset,
      });
    }
    if (meetups.length === 0) {
      throw ApiError.notFound('Meetup not found');
    }
    return meetups;
  }

  async getOne(id) {
    const meetup = await MeetUp.findOne({ where: { id } });
    if (!meetup) {
      throw ApiError.notFound('Meetup not found');
    }
    return meetup;
  }

  async create(meetup) {
    const createdMeetup = await MeetUp.create(meetup);
    return createdMeetup;
  }

  async update(id, description) {
    const meetup = await MeetUp.findOne({ where: { id } });
    if (!meetup) {
      throw ApiError.notFound('Meetup not found');
    }
    const meetUp = await MeetUp.update(
      { description },
      { where: { id }, returning: true, plain: true },
    );
    return meetUp[1].dataValues;
  }

  async delete(id) {
    const meetup = await MeetUp.findOne({ where: { id } });
    if (!meetup) {
      throw ApiError.notFound('Meetup not found');
    }
    await MeetUp.destroy({ where: { id } });
    return id;
  }
}

module.exports = new MeetUpService();
