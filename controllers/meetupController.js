const {MeetUp} = require('../models/models')
const ApiError = require('../error/apiError')


class MeetUpController {
    async getAll(req, res){
        const meetUps = await MeetUp.findAll()
        return res.json(meetUps)
    }
    async getOne(req, res, next){
        const {id} = req.params
        const meetUp = await MeetUp.findOne({where: {id}})
        return res.json(meetUp)
     }
    async create(req, res){
        const {title, description, keywords, eventInformation} = req.body
        const meetUp = await MeetUp.create({title, description, keywords, eventInformation})
        return res.json(meetUp)
    }
    async update(req, res){
        const {id} = req.params
        const {description} = req.body
        const meetUp = await MeetUp.update({description: description}, {where: {id}})
        return res.json(meetUp)
    }
    async delete(req, res){
        const {id} = req.params
        await MeetUp.destroy({where: {id}})
        return res.json('meetup deleted')
    }
}

module.exports = new MeetUpController()