const { Router } = require('express');
const LearnerController = require('../controllers/LearnerController');
const auth = require('../middleware/authentication');
const permit = require('../middleware/authorization');

const router = new Router();

router.patch('/learners', auth, permit('Learner'), LearnerController.assignMentor);
router.get('/learners', auth, LearnerController.getMentor);
router.patch('/learners/request', auth, permit('Learner'), LearnerController.cancelMentorRequest);

module.exports = router;
