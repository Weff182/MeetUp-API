const loggedIn = require('../../middleware/isLoggedIn')

let req = {
    user: 'max'
}
const res = {
    sendStatus: function(el){
        return el
    }
}
const next = () => {
    return 'max'
}

describe('is LoggedIn must ', () => {
    test("The function LoggedIn can return status 200 with user",  () => {
      const response = loggedIn(req, res, next)
      expect(response).toBe(next());
    })
    test("The function LoggedIn can return status 401 without user",  () => {
         req = {
        }
        const response = loggedIn(req, res, next)
        expect(response).toBe(401);
    })
})