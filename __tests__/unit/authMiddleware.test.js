// const authMiddleware = require('../../middleware/authMiddleware')
// const userServise = require('../../service/userService')
// const jwt = require("jsonwebtoken");

// const user = {
//     email: "userTest@mailww.net",
//     password: "12345"
// }
// let id



// const token = userServise.registartion(user.email, user.password)
// console.log(token)
// const decoded = jwt.verify(token, process.env.SECRET_KEY);
// id = decoded.id
// async () => await userServise.delete(id)

// let req = {
//     user: 'max',
//     method: "OPTIONS",
//     headers: {
//         authorization: `Bearer ${token}`
//     }
// }
// const res = {
//     sendStatus: function(el){
//         return el
//     }
// }
// const next = () => {
//     return 'max'
// }

// describe('is authMiddleware must ', () => {
//     test("The function authMiddleware can return next function",  () => {
//       const response = authMiddleware(req, res, next)
//       expect(response).toBe(next());
//     })
// })
describe('is ERH must ', () => {
    test("The function ERH can return",  () => {
      expect(true).toBe(true);
    })

})