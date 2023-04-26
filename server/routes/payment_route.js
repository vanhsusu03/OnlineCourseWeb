const express = require('express');
const paymentController = require('../controllers/PaymentController');
const { isAuth } = require('../middleware/Authentication');
const router = express.Router();

router.get('/students/:studentId/payment', isAuth, paymentController.getAmountToPay);
router.put('/students/:studentId/payment', isAuth, paymentController.purchase);

module.exports = router;