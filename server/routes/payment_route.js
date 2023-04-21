const express = require('express');
const paymentController = require('../controllers/PaymentController');
const { isAuth } = require('../middleware/Authentication');
const router = express.Router();

router.get('/pppp', isAuth, paymentController.getTransferInfo);
router.post('/pppppp', isAuth, paymentController.payForOrder);

module.exports = router;