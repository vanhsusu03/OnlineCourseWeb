const express = require('express');
const paymentController = require('../controllers/PaymentController');
const { isAuth } = require('../middleware/Authentication');
const router = express.Router();

router.get('/students/coin', isAuth, paymentController.getCoinOfStudent);
router.post('/students/payment/course', isAuth, paymentController.purchaseWithoutCart);
router.post('/students/payment/cart', isAuth, paymentController.purchaseWithCart);

module.exports = router;