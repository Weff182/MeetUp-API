const { MeetUp } = require('../models/models')

class MeetUpService {
    async getAll(){
        return await MeetUp.findAll() 
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