const Mentor = require('../models/Mentor');
const User = require('../models/User');
const { createChat } = require('./ChatController');

module.exports = {
  async getMentor(req, res) {
    const learner = req.user;
    try {
      const mentor = await Mentor.findById(learner.mentor);
      if (!mentor) throw new Error('Learner does not have a mentor');
      return res.send(mentor);
    } catch (error) {
      return res.status(400).send({ error: error.message, mentor: learner.mentor });
    }
  },

  async assignMentor(req, res) {
    const learner = req.user;

    try {
      learner.mentor_request = true;
      await learner.save();
      if (learner.mentor) throw new Error('Learner already has a mentor');
      let mentor = (await Mentor.aggregate()
        .match({ isAvailable: true, isValidated: true })
        .group({
          _id: '$_id',
          size: { $max: '$learners' },
          createdAt: { $min: '$createdAt' } // eslint-disable-line comma-dangle
        })
        .sort({ createdAt: 'asc', size: 1 }))[0];
      /* eslint-disable quotes */
      /* eslint-disable quote-props */
      if (!mentor) throw new Error('There are no available mentors');

      mentor = await Mentor.findById(mentor._id);

      learner.mentor = mentor._id;
      learner.mentor_request = false;
      mentor.learners = mentor.learners.concat(learner._id);
      mentor.isAvailable = false;

      await learner.save();
      await mentor.save();
      await createChat([learner._id, mentor._id]);

      return res.status(200).send({ mentorRequest: learner.mentor_request, mentor });
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      return res.status(400).send({ error: err.message, mentor_request: learner.mentor_request });
    }
  },

  async cancelMentorRequest(req, res) {
    const { user } = req;
    try {
      if (!user.mentor_request) throw new Error('Learner already canceled mentor request');
      user.mentor_request = false;
      await user.save();
      res.status(200).send(user.mentor_request);
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
      res.status(400).send({ error: error.message, mentor_request: user.mentor_request });
    }
  },

  async unassignMentor(req, res) {
    const learner = req.user;
    try {
      if (!learner.mentor) throw new Error('Learner does not have a mentor');
      await Mentor.findByIdAndUpdate(learner.mentor, {
        $pull: { learners: learner._id },
        isAvailable: false,
      });
      const oldMentor = learner.mentor;
      learner.mentor = null;
      await learner.save();
      res.send({ mentorRequest: learner.mentor_request, mentor: learner.mentor, oldMentor });
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
      res.status(400).send({ mentor: learner.mentor, error: error.message });
    }
  },

  async promoteToMentor(req, res) {
    const { _id } = req.user;
    const reqUser = req.user;
    try {
      const hasLearnerCertificate = reqUser.courseCertificates.length > 0;

      if (!hasLearnerCertificate) throw new Error('User did not conclude Tutorial');

      const user = await User.findOneAndUpdate(
        { _id },
        { $set: { userType: 'Mentor' } }, { new: true },
      );
      user.isValidated = true;
      user.mentor_request = false;
      user.save();

      res.status(200).send({ user });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
};
