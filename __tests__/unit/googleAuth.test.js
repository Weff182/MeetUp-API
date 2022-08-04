require("dotenv").config();
require("../../models/models");
const userServise = require('../../service/user')
const jwt = require("jsonwebtoken");


const user = {
    email: "userTest@mailww.net",
    profileId: "123"
}

describe('passport GoogleStrategy', () => {
    test("The function googleAuth by candidate", async () => {
        const token = await userServise.googleAuth(user.email, user.profileId)
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const userEmail = decoded.email
        const id = decoded.id
      expect(user.email).toEqual(userEmail);
      expect(decoded).toHaveProperty("id")
      await userServise.delete(id)
    })
})