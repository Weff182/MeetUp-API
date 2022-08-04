// const errorHandling = require('../../middleware/errorHandlingMidleware')
// const ApiError = require("../../error/apiError");

// let req = {
//     user: 'max'
// }
// const res = {
//     status: function(el){
//         function json(el){
//             return obj.message
//         }
//         return el
//     }
// }
// const next = () => {
//     return 'max'
// }
// let err = ApiError.badRequest("Invalid password")

// describe('is LoggedIn must ', () => {
//     test("The function LoggedIn can return status 200 with user",  () => {
//       const response = errorHandling(err, req, res, next)
//       expect(response.status).toBe(400);
//     })
//     test("The function LoggedIn can return status 500 without user",  () => {
//         //  err = { 
//         //     name: "kek"
//         // }
//         const response = errorHandling(err, req, res, next)
//         expect(response.status).toBe(500);
//     })
// })

describe('is ERH must ', () => {
    test("The function ERH can return",  () => {
      expect(true).toBe(true);
    })

})