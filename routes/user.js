

const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();



router.post('/signin', userController.postSignin);

router.post('/signup', userController.postSignup);

router.post('/addexpense',userController.authenticate, userController.postaddexpense);

router.get('/getexpenses', userController.authenticate, userController.getexpenses )

router.delete('/deleteexpense/:expenseid', userController.authenticate, userController.deleteexpense)

module.exports = router;
