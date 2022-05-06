const {MeetUp} = require('../models/models')
const ApiError = require('../error/apiError')

class MeetUpController {
    async getAll(req, res){
        const meetUps = await MeetUp.findAll()
        return res.json(meetUps)
    }
    async getOne(req, res, next){
      
    }
    async create(req, res){
        const {title, description, keywords, eventInformation} = req.body
        const meetUp = await MeetUp.create({title, description, keywords, eventInformation})
        return res.json(meetUp)
    }
    async update(req, res){

    }
    async delete(req, res){

    }
}

module.exports = new MeetUpController()