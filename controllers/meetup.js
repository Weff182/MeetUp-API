const ApiError = require('../error/apiError')
const {meetupBodyDTO, meetupQueryDTO, meetupParamDTO} = require('../dto/meetup.dto')
const MeetupService = require('../service/meetup')
const jwt = require('jsonwebtoken')


const decodedUser = (token) => {
    return jwt.verify(token.split(' ')[1], process.env.SECRET_KEY);
}

class MeetUpController {
    async getAll(req, res, next){
        try {
            const {title, limit, page, sort, userId} = req.query
            await meetupQueryDTO.validateAsync(req.query)
            const meetUps = await MeetupService.getAll(title, userId, limit, page, sort)
            return res.status(200).json(meetUps)
        } catch (error) {
            if (error.name === "ValidationError") {
                return next(ApiError.badRequest("The parameters is incorect"));
            } 
            if(error instanceof ApiError){
                return res.status(error.status).json({message: error.message});
            } else {
                return res.status(500);
            }
        }
    }
    async getOne(req, res, next){
        try { 
            const {id} = req.params
            await meetupParamDTO.validateAsync(req.params)
            const meetUp = await MeetupService.getOne(id)
            return res.status(200).json(meetUp)
        } catch (error) {
            if (error.name === "ValidationError") {
                return next(ApiError.badRequest("The parameter is incorect, ID must be a number"));
            } 
            if(error instanceof ApiError){
                return res.status(error.status).json({message: error.message});
            } else {
                return res.status(500);
            }    
        }
    }
    async create(req, res, next){
        try {      
            await meetupBodyDTO.validateAsync(req.body)
            const userId = decodedUser(req.headers.authorization)
            const mettUp = await MeetupService.create({...req.body, userId: userId.id})
            return res.status(201).json(mettUp)
        } catch (error) {
            if (error.name === "ValidationError") {
                return next(ApiError.badRequest("The parameters is incorect"));
            } 
            return res.status(500);
        }
    }
    async update(req, res, next){
        try {
            const {id} = req.params 
            const {description} = req.body
            await meetupBodyDTO.validateAsync({description: description})
            await meetupParamDTO.validateAsync(req.params)
            const meetUp = await MeetupService.update(id, description)
            return res.status(200).json(meetUp)
        } catch (error) {
            if (error.name === "ValidationError") {
                return next(ApiError.badRequest("The parameters is incorect"));
            } 
            if(error instanceof ApiError){
                return res.status(error.status).json({message: error.message});
            } else {
                return res.status(500);
            }   
        }    
    }
    async delete(req, res, next){
        try { 
            const {id} = req.params
            await meetupParamDTO.validateAsync(req.params)
            const deletedId = await MeetupService.delete(id)
            return res.status(200).json({id: deletedId})
        } catch (error) {
            if (error.name === "ValidationError") {
                return next(ApiError.badRequest("The parameters is incorect"));
            } 
            if(error instanceof ApiError){
                return res.status(error.status).json({message: error.message});
            } else {
                return res.status(500);
            }  
        }
    }
}

module.exports = new MeetUpController()