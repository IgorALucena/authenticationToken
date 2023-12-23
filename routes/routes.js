const express = require('express');
const router = express.Router();
const {profileController, signInController, signUpController} = require('../controllers/controllers')
const {authToken} = require('../auth/auth');

router.get('/main/:id',authToken, profileController);

router.post('/sign-in', signInController);

router.post('/sign-up', signUpController);

module.exports = router;