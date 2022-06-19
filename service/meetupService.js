const { MeetUp } = require("../models/models");
const ApiError = require('../error/apiError');

class MeetUpService {
  async getAll(title, userId, limit, page, sort) {
    page = page || 1;
    limit = limit || 5;
    sort = sort || 0;
    let offset = page * limit - limit;
    let meetups;
    if (!title && !userId) {
      if (sort) {
        return (meetups = await MeetUp.findAll({
          order: [["id", "ASC"]],
          limit,
          offset,
        }));
      }
      return (meetups = await MeetUp.findAll({ limit, offset }));
    }
    if (title && !userId) {
      if (sort) {
        return (meetups = await MeetUp.findAll({
          where: { title },
          order: [["id", "ASC"]],
          limit,
          offset,
        }));
      }
      return (meetups = await MeetUp.findAll({
        where: { title },
        limit,
        offset,
      }));
    }
    if (!title && userId) {
      if (sort) {
        return (meetups = await MeetUp.findAll({
          where: { userId },
          order: [["id", "ASC"]],
          limit,
          offset,
        }));
      }
      return (meetups = await MeetUp.findAll({
        where: { userId },
        limit,
        offset,
      }));
    }
    if (title && userId) {
      if (sort) {
        return (meetups = await MeetUp.findAll({
          where: { title, userId },
          order: [["id", "ASC"]],
          limit,
          offset,
        }));
      }
      return (meetups = await MeetUp.findAll({
        where: { title, userId },
        limit,
        offset,
      }));
    }
    if(!meetup){
      throw new Error('Meetups not found')
    } 
    return meetups;
  }
  async getOne(id) {
    let meetup = await MeetUp.findOne({ where: { id } });
    if(!meetup){
      throw new Error('Meetup with this ID not found')
    } 
    return meetup
  }
  async create(meetup) {
    return await MeetUp.create(meetup);
  }
  async update(id, description) {
    let meetup = await MeetUp.findOne({ where: { id } })
    if(!meetup){
      throw new Error('Meetup with this ID not found')
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
      throw new Error('Meetup with this ID not found')
    } 
    return await MeetUp.destroy({ where: { id } });
  }
}

module.exports = new MeetUpService();
