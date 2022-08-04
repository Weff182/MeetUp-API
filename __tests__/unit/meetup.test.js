// const request = require('supertest');

require("dotenv").config();
const sequelize = require("../../db");
require("../../models/models");
const {createServer} = require('../../server')
const meetupServise = require('../../service/meetup')
const ApiError = require('../../error/apiError')
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT;
const app = createServer();

const meetup = {
  title: "test user",
  description: "user for tests",
  keywords: "test keyword",
  eventInformation: "test event",
}
let id

beforeAll(async () => {
  await sequelize.authenticate();
  await sequelize.sync();
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});

afterAll(async () => {
  await sequelize.close();
  process.on('SIGTERM', () => {
    app.close(() => {
      console.log('Process terminated');
    });
  });
});

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

describe('Meetup Service', () => {
  describe('Get meetup', () => {
    test("The function should return meetup by id", async () => {
      const res = await meetupServise.getOne(id)
      expect(res).toHaveProperty('id')
      expect(res).toHaveProperty('userId')
      expect(res.title).toEqual(meetup.title)
      expect(res.description).toEqual(meetup.description)
      expect(res.keywords).toEqual(meetup.keywords)
      expect(res.eventInformation).toEqual(meetup.eventInformation)
    })
    test("The function should return an error if the meetup not found", async () => {
      let incorectId = id + 1
      try {
        await meetupServise.getOne(incorectId)
      } catch(error) {
        expect(error.name).toEqual('Not Found')
        expect(error instanceof ApiError).toEqual(true)
      }
    })
  })
  describe('Update meetup', () => {
    test("The function should return an error if the meetup not found", async () => {
      let incorectId = id + 1
      try {
        await meetupServise.update(incorectId)
      } catch(error) {
        expect(error.name).toEqual('Not Found')
        expect(error instanceof ApiError).toEqual(true)
      }
    })
    test("The function should destroy meetup by id, and return meetup id", async () => {
      const testDescription = 'Test update description'
      const res = await meetupServise.update(id, testDescription)
      expect(res.description).toEqual(testDescription)
      expect(res.title).toEqual(meetup.title)
      expect(res.keywords).toEqual(meetup.keywords)
      expect(res.eventInformation).toEqual(meetup.eventInformation)
    })
  })
  describe('Delete meetup', () => {
    test("The function should return an error if the meetup not found", async () => {
      let incorectId = id + 1
      try {
        await meetupServise.delete(incorectId)
      } catch(error) {
        expect(error.name).toEqual('Not Found')
        expect(error instanceof ApiError).toEqual(true)
      }
    })
  })
});