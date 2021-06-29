

const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();


router.post('/signin', userController.postSignin);

router.post('/signup', userController.postSignup);


module.exports = router;
