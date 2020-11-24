const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Module = require('../models/Module');
const Question = require('../models/Question');
const User = require('../models/User');
const { questions, modules } = require('./fixtures/tutorial');
const { userOne } = require('./fixtures/db');

const request = supertest(app);

describe('Questions', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    await new User(userOne).save();
    await Question.insertMany(questions);
    await Module.insertMany(modules);
  });

  afterAll(async (done) => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    done();
  });

  it('Should answer question 1 incorrectly', async () => {
    const response = await request
      .post('/api/answer')
      .send({
        question: questions[0]._id,
        alternative: 'a',
      })
      .set('Cookie', [`auth_token=${userOne.tokens[0].accessToken}`]);
    // .expect("OK")

    expect(response.ok).toBe(true);
    expect(response.body.isCorrect).toBe(false);
  });

  it('Should answer question 1 correctly', async () => {
    const response = await request
      .post('/api/answer')
      .send({
        question: questions[0]._id,
        alternative: 'b',
      })
      .set('Cookie', [`auth_token=${userOne.tokens[0].accessToken}`]);
    // .expect("ok")

    expect(response.ok).toBe(true);
    // const result = await QuestionResult.findById(response.body._id)
    expect(response.body.isCorrect).toBe(true);
  });

  it('Should not answer question', async () => {
    const response = await request
      .post('/api/answer')
      .send({
        question: '5f652249fc13ae49f0000000',
        alternative: 'a',
      })
      .set('Cookie', [`auth_token=${userOne.tokens[0].accessToken}`])
      .expect(400);

    expect(response.body.error).toEqual('Question not found');
  });
});
