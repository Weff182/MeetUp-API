const { MeetUp } = require("../models/models");
const ApiError = require('../error/apiError')

class MeetUpService {
  async getAll(title, userId, limit, page, sort) {
    page = page || 1;
    limit = limit || 5;
    sort = sort || 0;
    let offset = page * limit - limit;
    let sortMeetup = {
      order: [["id", "ASC"]],
      limit,
      offset,
    };
    let meetups;
    if (!title && !userId) {
      if (sort) {
        meetups = await MeetUp.findAll({
          ...sortMeetup
        });
      }
      meetups = await MeetUp.findAll({ limit, offset });
    } else if (title && !userId) {
      if (sort) {
        meetups = await MeetUp.findAll({
          where: { title },
          ...sortMeetup
        });
      }
      meetups = await MeetUp.findAll({
        where: { title },
        limit,
        offset,
      });
    } else if (!title && userId) {
      if (sort) {
        meetups = await MeetUp.findAll({
          where: { userId },
          ...sortMeetup
        });
      }
      meetups = await MeetUp.findAll({
        where: { userId },
        limit,
        offset,
      });
    } else if (title && userId) {
      if (sort) {
        meetups = await MeetUp.findAll({
          where: { title, userId },
          ...sortMeetup
        });
      }
      meetups = await MeetUp.findAll({
        where: { title, userId },
        limit,
        offset,
      });
    } 
    if (meetups.length === 0){
      throw ApiError.badRequest('Meetup not found')
    } 
    return meetups;
  }
  async getOne(id) {
    let meetup = await MeetUp.findOne({ where: { id } });
    if(!meetup){
      throw ApiError.badRequest('Meetup not found')
    } 
    return meetup
  }
  async create(meetup) {
    return await MeetUp.create(meetup);
  }
  async update(id, description) {
    let meetup = await MeetUp.findOne({ where: { id } })
    if(!meetup){
      throw ApiError.badRequest('Meetup not found')
    } 
    const meetUp = await MeetUp.update(
      { description },
      { where: { id }, returning: true, plain: true }
    );
    return meetUp[1].dataValues;
  }
  async delete(id) {
    let meetup = await MeetUp.findOne({ where: { id } })
    if(!meetup){
      throw ApiError.badRequest('Meetup not found')
    } 
    await MeetUp.destroy({ where: { id } });
    return
  }
}

module.exports = new MeetUpService();
