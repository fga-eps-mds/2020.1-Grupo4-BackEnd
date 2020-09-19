const { Router } = require('express');
const router = Router();

const UserController = require('./controllers/UserController')

router.get('/users', UserController.getUsers);
router.post('/users', UserController.createUser);
router.delete('/users', UserController.removeUser);
router.post('/users/login', UserController.authLogin);
router.post('/users/logout', UserController.authLogout);

module.exports = router;