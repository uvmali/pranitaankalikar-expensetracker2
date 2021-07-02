const express = require('express');

const purchaseController = require('../controllers/purchase');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/premiummembership', userController.authenticate,purchaseController.purchasepremium);

router.post('/updatetransactionstatus', userController.authenticate, purchaseController.updateTransactionStatus)

module.exports = router;