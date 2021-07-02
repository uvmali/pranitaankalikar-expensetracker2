

const express = require('express');

const passwordController = require('../controllers/password');

const router = express.Router();



router.post('/forgot', passwordController.postforgot);



module.exports = router;
