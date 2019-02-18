const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const UserController = require('../controllers/user');

router.post('/signup', UserController.user_sign_up);

router.post('/login', UserController.users_user_login);

router.delete('/:userId', checkAuth, UserController.users_user_delete);

module.exports = router;