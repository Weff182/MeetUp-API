const {MeetUp} = require('../models/models')
const ApiError = require('../error/apiError')
const {meetupDTO} = require('../dto/meetup.dto')

class MeetUpController {
    async getAll(req, res, next){
        try {
            const meetUps = await MeetUp.findAll() 
            return res.status(200).json(meetUps)
        } catch (error) {
           return next(ApiError.notFound('Meetups not found'))
        }
    }
    async getOne(req, res, next){
        try {
            const {id} = req.params
            const meetUp = await MeetUp.findOne({where: {id}})
            if (!meetUp) {
                throw new Error
            }
            return res.status(200).json(meetUp)
        } catch (error) {
            return next(ApiError.notFound('Meetup not found'))
        }
    }
    async create(req, res, next){
        try {      
            const {title, description, keywords, eventInformation} = req.body
            await meetupDTO.validateAsync(req.body)
            const mettUp = await MeetUp.create({title, description, keywords, eventInformation})
            return res.status(201).json(mettUp)
        } catch (error) {
            return next(ApiError.badRequest('The parameters are set incorrectly'))
        }
    }
    async update(req, res, next){
        try {
            const {id} = req.params 
            const {description} = req.body
            if (!id || !description){
                return next(ApiError.badRequest('The parameters are set incorrectly'))
            }
            const meetUp = await MeetUp.update({description: description}, {where: {id}, returning: true, plain: true})
            return res.status(200).json(meetUp)
        } catch (error) {
            return next(ApiError.notFound('Meetup not found'))
        }    
    }
    async delete(req, res, next){
        try { 
            const {id} = req.params
            if (!id){
                return next(ApiError.badRequest('The parameters are set incorrectly'))
            }
            await MeetUp.destroy({where: {id}})
            return res.status(200).json(id)
        } catch (error) {
            return next(ApiError.notFound('Meetup not found'))
        }
     
    }
}

module.exports = new MeetUpController()