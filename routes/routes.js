const express = require('express');
const router = express.Router();
const {profileController, signOnController, signUpController} = require('../controllers/controllers')

router.get('main/:id', profileController);

router.post('/sign-on', signOnController);

router.post('/sign-up', signUpController);

module.exports = router;