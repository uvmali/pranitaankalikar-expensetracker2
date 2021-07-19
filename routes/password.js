

const express = require('express');

const passwordController = require('../controllers/password');

const router = express.Router();


router.get('/updatepassword/:resetpasswordid', passwordController.updatepassword)

router.get('/resetpassword/:id', passwordController.resetpassword)

router.post('/forgot', passwordController.forgotpassword);



module.exports = router;
