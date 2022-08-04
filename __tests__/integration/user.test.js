const request = require('supertest');
require("dotenv").config();
require("../../models/models");
const {createServer} = require('../../server')
const userServise = require('../../service/user')
const jwt = require("jsonwebtoken");

const app = createServer();

const user = {
    email: "userTest@mailww.net",
    password: "12345"
}
let id
let token


describe('POST /api/users/login', () => {
    beforeEach(async() => {
        const res = await userServise.registartion(user.email, user.password)
        const decoded = jwt.verify(res, process.env.SECRET_KEY);
        id = decoded.id
    });
      
    afterEach(async() => {
        await userServise.delete(id)
    });
    test("The function should return 200 status by valid params", async () => {
      const res = await request(app).post('/api/users/login/').send(user)
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(200);
    })
    test("The function should return 404 status by invalid params", async () => {
        user.email = "userTestNew@mailww.net"
        const res = await request(app).post('/api/users/login/').send(user)
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(404);
        user.email = "userTest@mailww.net"
    })
    test("The function should return 400 status by icorrect password", async () => {
        user.password = "123456"
        const res = await request(app).post('/api/users/login/').send(user)
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(400);
        user.password = "12345"
    })
    test("The function should return 400 status by invalid params", async () => {
        user.email = 123
        const res = await request(app).post('/api/users/login/').send(user)
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(400);
        user.email = "userTest@mailww.net"
    })
})
describe('POST /api/users/registration', () => {
    test("The function should return 200 status by valid params", async () => {
      user.email = "userTest1@mailww.net"
      const res = await request(app).post('/api/users/registration/').send(user)
      const token = res.body.token
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      let newId = decoded.id
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(200);
      await userServise.delete(newId)
      user.email = "userTest@mailww.net"
    })
    test("The function should return 400 status by inappropriate role", async () => {
        user.role = 'not valide role'
        const res = await request(app).post('/api/users/registration/').send(user)
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(400);
        user.role = undefined
    })
    test("The function should return 400 status because A user with such an email already exists", async () => {
        const resUser = await userServise.registartion(user.email, user.password)
        const decoded = jwt.verify(resUser, process.env.SECRET_KEY);
        id = decoded.id
        const res = await request(app).post('/api/users/registration/').send(user)
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(400);
        await userServise.delete(id)
    })
    test("The function should return 400 status by invalid params", async () => {
        user.password = 1234
        const res = await request(app).post('/api/users/registration/').send(user)
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(400);
        user.password = "12345"
    })
})
describe('GET /api/users/auth', () => {
    beforeEach(async() => {
        token = await userServise.registartion(user.email, user.password)
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        id = decoded.id
    });
      
    afterEach(async() => {
        await userServise.delete(id)
    });
    test("The function should return 200 status by valid token", async () => {
      const res = await request(app).get('/api/users/auth/').set('Authorization', `Bearer ${token}`)
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(200);
    })
    test("The function should return 200 status by valid token", async () => {
        const res = await request(app).get('/api/users/auth/').set('Authorization', `Bearer ${token}`)
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
      })
})