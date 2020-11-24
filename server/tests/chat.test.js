const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/User');
const Chat = require('../models/Chat');
const { learnerOne, learnerThree, learnerFour } = require('./fixtures/learner');
const { mentorOne } = require('./fixtures/mentor');
const { chatOne, chatTwo } = require('./fixtures/chat');

const request = supertest(app);

describe('Chats', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    await new User(learnerOne).save();
    await new User(learnerThree).save();
    await new User(learnerFour).save();
    await new User(mentorOne).save();
    await new Chat(chatOne).save();
    await new Chat(chatTwo).save();
  });

  afterAll(async (done) => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    done();
  });

  it('Should get chat for learnerOne', async () => {
    // await User.updateOne({_id: learnerOne._id}, {mentor: mentorOne._id })
    const user = await User.findById(learnerOne._id)
    user.mentor = mentorOne._id
    await user.save()
    const response = await request.get('/api/chat')
    .send()
    .set('Cookie', [`auth_token=${learnerOne.tokens[0].accessToken}`])
    .expect(200);

    expect(response.body.length).not.toBeNull();
    expect(response.body[0].users).toContain(learnerOne._id.toString());
  });

  it('Should get chat for mentorOne', async () => {
    // await User.updateOne({_id: learnerOne._id}, {mentor: mentorOne._id })
    const response = await request.get('/api/chat')
    .send()
    .set('Cookie', [`auth_token=${mentorOne.tokens[0].accessToken}`])
    .expect(200);

    expect(response.body.length).not.toBeNull();
    expect(response.body[0].users).toContain(learnerThree._id.toString());
  });

  it('Should send message to chatOne', async () => {
    const response = await request.post('/api/chat')
    .send({ toChat: chatOne._id, content: 'test message' })
    .set('Cookie', [`auth_token=${learnerOne.tokens[0].accessToken}`])
    .expect(200);

    expect(response.body.content).toEqual('test message');
    expect(response.body.sender).toEqual(learnerOne._id.toString());

    const chat = await Chat.findById(response.body.chat)
    expect(chat).not.toBeNull()
  });

  it('Should not send message to unknown chat', async () => {
    const response = await request.post('/api/chat')
    .send({ toChat: new mongoose.Types.ObjectId(), content: 'test message' })
    .set('Cookie', [`auth_token=${learnerOne.tokens[0].accessToken}`])
    .expect(400);

    expect(response.body.error).toEqual('Chat not found');
  });
});
