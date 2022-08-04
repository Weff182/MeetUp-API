const request = require('supertest');
require("dotenv").config();
require("../../models/models");
const {createServer} = require('../../server')
const { v4: uuidv4 } = require('uuid');
const meetupServise = require('../../service/meetup')
const userServise = require('../../service/user')
const jwt = require("jsonwebtoken");

const app = createServer();

let id
let AdminId
let resToken

const meetup = {
    title: "test user",
    description: "user for tests",
    keywords: "test keyword",
    eventInformation: "test event",
}
const user = {
  email: "userAdminTest@mailww.net",
  password: "12345",
  role: "ADMIN"
}


beforeEach(async() => {
    const mettupTitle = uuidv4(); 
    meetup.title = mettupTitle
    const res = await meetupServise.create(meetup)
    id = res.id
});
  
afterEach(async() => {
    const testMeetup = await meetupServise.getOne(id)
    if (testMeetup){
      await meetupServise.delete(id)
    }
});

describe('GET /api/meetups/', () => {
    let firstMeetupId 
    beforeEach(async() => {
        resToken = await userServise.registartion(user.email, user.password, user.role)
        const decoded = jwt.verify(resToken, process.env.SECRET_KEY);
        AdminId = decoded.id
        const firstMeetup = await request(app).post(`/api/meetups/`).set('Authorization', `Bearer ${resToken}`).send(meetup)
        firstMeetupId = firstMeetup.body.id
      });
    afterEach(async() => {
        await meetupServise.delete(firstMeetupId)
        await userServise.delete(AdminId)
    });
    test("The function should return meetups array", async () => {
      const res = await request(app).get(`/api/meetups/`)
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(200);
      expect(res.body[0]).toHaveProperty('id')
      expect(res.body[0]).toHaveProperty('userId')
      expect(res.body[0]).toHaveProperty("title")
      expect(res.body[0]).toHaveProperty("description")
      expect(res.body[0]).toHaveProperty("keywords")
      expect(res.body[0]).toHaveProperty("eventInformation")
      expect(res.body[0].id).toEqual(id)
    })
    test("The function should return meetups array by title", async () => {
        meetup.title = 'not origin title'
        const firstMeetupNewUser = await request(app).post(`/api/meetups/`).set('Authorization', `Bearer ${resToken}`).send(meetup)
        const firstMeetupId = firstMeetupNewUser.body.id
        const secondMeetupNewUser = await request(app).post(`/api/meetups/`).set('Authorization', `Bearer ${resToken}`).send(meetup)
        const secondMeetupId = secondMeetupNewUser.body.id
        const res = await request(app).get(`/api/meetups?title=${meetup.title}`)
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toEqual(2)
        await meetupServise.delete(firstMeetupId)
        await meetupServise.delete(secondMeetupId)
    })
    test("The function should return meetups array by userId", async () => {
        user.email = "userAdminTest2@mailww.net"
        const newAdminToken = await userServise.registartion(user.email, user.password, user.role)
        const decoded = jwt.verify(newAdminToken, process.env.SECRET_KEY);
        const newAdminId = decoded.id
        const firstMeetupNewUser = await request(app).post(`/api/meetups/`).set('Authorization', `Bearer ${newAdminToken}`).send(meetup)
        const firstMeetupId = firstMeetupNewUser.body.id
        const secondMeetupNewUser = await request(app).post(`/api/meetups/`).set('Authorization', `Bearer ${newAdminToken}`).send(meetup)
        const secondMeetupId = secondMeetupNewUser.body.id
        const res = await request(app).get(`/api/meetups?userId=${firstMeetupNewUser.body.userId}`)
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toEqual(2)
        await meetupServise.delete(firstMeetupId)
        await meetupServise.delete(secondMeetupId)
        await userServise.delete(newAdminId)
        user.email = "userAdminTest@mailww.net"
    })
    test("The function should return meetups array by userId and title", async () => {
        user.email = "userAdminTest2@mailww.net"
        const newAdminToken = await userServise.registartion(user.email, user.password, user.role)
        const decoded = jwt.verify(newAdminToken, process.env.SECRET_KEY);
        const newAdminId = decoded.id
        meetup.title = 'not origin title'
        const firstMeetupNewUser = await request(app).post(`/api/meetups/`).set('Authorization', `Bearer ${newAdminToken}`).send(meetup)
        const firstMeetupId = firstMeetupNewUser.body.id
        const secondMeetupNewUser = await request(app).post(`/api/meetups/`).set('Authorization', `Bearer ${newAdminToken}`).send(meetup)
        const secondMeetupId = secondMeetupNewUser.body.id
        const res = await request(app).get(`/api/meetups?userId=${firstMeetupNewUser.body.userId}&title=${meetup.title}`)
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toEqual(2)
        await meetupServise.delete(firstMeetupId)
        await meetupServise.delete(secondMeetupId)
        await userServise.delete(newAdminId)
        user.email = "userAdminTest@mailww.net"
    })
    test("The function should return an error status 400 if params is incorect", async () => {
        let userId = 'incorect userid'
        const res = await request(app).get(`/api/meetups?userId=${userId}`)
        expect(res.statusCode).toBe(400);     
    })
    test("The function should return an error status 404 if meetups not found", async () => {
        let title = 'super test title'
        const res = await request(app).get(`/api/meetups?title=${title}`)
        expect(res.statusCode).toBe(404);     
    })
})
describe('GET /api/meetups/:id', () => {
    test("The function should return meetup by id", async () => {
      const res = await request(app).get(`/api/meetups/${id}`)
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(200);
    })
    test("The function should return an error status 400 if params is incorect", async () => {
        let incorectId = "abc"
        const res = await request(app).get(`/api/meetups/${incorectId}`)
        expect(res.statusCode).toBe(400);     
      })
    test("The function should return an error status 404 if the meetup not found", async () => {
        let notFoundId = id + 1
        const res = await request(app).get(`/api/meetups/${notFoundId}`)
        expect(res.statusCode).toBe(404);     
      })
})
describe('POST /api/meetups/', () => {
    test("The function should create and return meetup", async () => {
      resToken = await userServise.registartion(user.email, user.password, user.role)
      const decoded = jwt.verify(resToken, process.env.SECRET_KEY);
      AdminId = decoded.id
      const res = await request(app).post(`/api/meetups/`).set('Authorization', `Bearer ${resToken}`).send(meetup)
      const newId = res.body.id
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(201)
      expect(res.body.id).toEqual(newId);
      expect(res.body.title).toEqual(meetup.title);
      await meetupServise.delete(newId)
      await userServise.delete(AdminId)
    })
    test("If user not auth The function should return status 401", async () => {
        const res = await request(app).post(`/api/meetups/`).send(meetup)
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(401)
    })
    test("If user not auth The function should return status 403", async () => {
      resToken = await userServise.registartion(user.email, user.password)
      const decoded = jwt.verify(resToken, process.env.SECRET_KEY);
      AdminId = decoded.id
      const res = await request(app).post(`/api/meetups/`).set('Authorization', `Bearer ${resToken}`).send(meetup)
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(403)
      await userServise.delete(AdminId)
  })
    test("The function should return status 400 by incorect params", async () => {
        resToken = await userServise.registartion(user.email, user.password, user.role)
        const decoded = jwt.verify(resToken, process.env.SECRET_KEY);
        AdminId = decoded.id
        meetup.title = 123
        const res = await request(app).post(`/api/meetups/`).set('Authorization', `Bearer ${resToken}`).send(meetup)
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(400)
        await userServise.delete(AdminId)
    })
})
describe('PATCH /api/meetups/:id', () => {
    let description 
    let postResId 
    beforeEach(async() => {
      resToken = await userServise.registartion(user.email, user.password, user.role)
        const decoded = jwt.verify(resToken, process.env.SECRET_KEY);
        AdminId = decoded.id
        description = {
            description: "new" + meetup.title
        }
        const postRes = await request(app).post(`/api/meetups/`).set('Authorization', `Bearer ${resToken}`).send(meetup)
        postResId = postRes.body.id
      });
    afterEach(async() => {
        await meetupServise.delete(postResId)
        await userServise.delete(AdminId)
    });
    test("The function should create and return meetup", async () => {
      const res = await request(app).patch(`/api/meetups/${postResId}`).set('Authorization', `Bearer ${resToken}`).send(description)
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(200)
      expect(res.body.id).toEqual(postResId);
      expect(res.body.description).toEqual(description.description);
    })
    test("If user not auth The function should return status 401", async () => {
        const res = await request(app).patch(`/api/meetups/${postResId}`).send(description)
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(401)
    })
    test("The function should return status 400 by incorect params", async () => {
        description = { description: 123}
        const res = await request(app).patch(`/api/meetups/${postResId}`).set('Authorization', `Bearer ${resToken}`).send(description)
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(400)
    })
    test("The function should return an error status 404 if the meetup not found", async () => {
        let notFoundId = postResId + 1
        const res = await request(app).patch(`/api/meetups/${notFoundId}`).set('Authorization', `Bearer ${resToken}`).send(description)
        expect(res.statusCode).toBe(404);     
      })
})
describe('DELETE /api/meetups/:id', () => {
    let postResId
    beforeEach(async() => {
        resToken = await userServise.registartion(user.email, user.password, user.role)
        const decoded = jwt.verify(resToken, process.env.SECRET_KEY);
        AdminId = decoded.id
        const postRes = await request(app).post(`/api/meetups/`).set('Authorization', `Bearer ${resToken}`).send(meetup)
        postResId = postRes.body.id
      });
    afterEach(async() => {
        await meetupServise.delete(postResId)
        await userServise.delete(AdminId)
    });
    test("The function should return meetup by id", async () => {
      const newRes = await request(app).post(`/api/meetups/`).set('Authorization', `Bearer ${resToken}`).send(meetup)
      const newResId = newRes.body.id
      const res = await request(app).delete(`/api/meetups/${newResId}`).set('Authorization', `Bearer ${resToken}`)
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(200);
    })
    test("The function should return an error status 400 if params is incorect", async () => {
        let incorectId = "abc"
        const res = await request(app).delete(`/api/meetups/${incorectId}`).set('Authorization', `Bearer ${resToken}`)
        expect(res.statusCode).toEqual(400);     
      })
    test("The function should return an error status 404 if the meetup not found", async () => {
        let notFoundId = postResId + 1
        const res = await request(app).delete(`/api/meetups/${notFoundId}`).set('Authorization', `Bearer ${resToken}`)
        expect(res.statusCode).toBe(404);     
      })
    
})
