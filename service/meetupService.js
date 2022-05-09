const { MeetUp } = require('../models/models')

class MeetUpService {
    async getAll(title, userId, limit, page, sort){
        page = page || 1;
        limit = limit || 5;
        sort = sort || 0;
        let offset = page * limit - limit;
        let meetups
        if (!title && !userId){
            if(sort){
               return meetups = await MeetUp.findAll({order:[["id", 'ASC']], limit, offset})  
            }
            return meetups = await MeetUp.findAll({limit, offset})
        }
        if (title && !userId){
            if(sort){
                return meetups = await MeetUp.findAll({where: {title}, order:[["id", 'ASC']], limit, offset})
            }
            return meetups = await MeetUp.findAll({where: {title}, limit, offset})
        }
        if (!title && userId){
            if(sort){
                return meetups = await MeetUp.findAll({where: {userId}, order:[["id", 'ASC']], limit, offset})
            }
            return meetups = await MeetUp.findAll({where: {userId}, limit, offset})
        }
        if (title && userId){
            if(sort){
                return meetups = await MeetUp.findAll({where: {title, userId}, order:[["id", 'ASC']], limit, offset})
            }
            return meetups = await MeetUp.findAll({where: {title, userId}, limit, offset})
        }
        return meetups
    }
    async getOne(id){
        return await MeetUp.findOne({where: {id}})
    }
    async create(meetup){
        return await MeetUp.create(meetup)
    }
    async update(id, description){    
        const meetUp = await MeetUp.update({description: description}, {where: {id}, returning: true, plain: true})
        return meetUp[1].dataValues
    }
    async delete(id){
        return await MeetUp.destroy({where: {id}})
    }
}

module.exports = new MeetUpService();