

const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();



router.post('/signin', userController.postSignin);

router.post('/signup', userController.postSignup);

router.post('/addexpense',userController.authenticate, userController.postaddexpense);


module.exports = router;
