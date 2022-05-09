const ApiError = require('../error/apiError')
const {userDTO} = require('../dto/user.dto')
const UserService = require('../service/userService')

class UserController {
    async registartion(req, res, next){
        try {
            const {email, password, role} = req.body
            await userDTO.validateAsync({email: email, password: password})
            if (role && role !== 'ADMIN'){
                return next(ApiError.badRequest('Inappropriate role'))
            }
            if(!email || !password){
                return next(ApiError.badRequest('The parameters are set incorrectly'))
            }
            const token = await UserService.registartion(email, password, role)
            if(token.status === 400){
                return next(ApiError.notFound('The user exists'))
            }
            return res.json({token})
        } catch (error) {
            if(error.name === 'ValidationError'){
                return next(ApiError.badRequest('Invalid email address or password')) 
            } 
            return next(ApiError.notFound('Implicit error'))
        }    
    }
    async login(req, res, next){
        try {
            const {email, password} = req.body
            await userDTO.validateAsync({email: email, password: password})
            const token = await UserService.login(email, password)
            if(token.status === 404){
               return next(ApiError.notFound('The user with such an email was not found'))
            }
            if(token.status === 400){
                return next(ApiError.badRequest('Invalid password'))
            }
            return res.json({token})
        } catch (error) {
            if(error.name === 'ValidationError'){
                return next(ApiError.badRequest('The parameters must be a string')) 
            } 
            return next(ApiError.internal('Implicit error'))
        }     
    }
    async check(req, res){
        const token = await UserService.check(req.user)
        return res.json({token})
    }
}

module.exports = new UserController()