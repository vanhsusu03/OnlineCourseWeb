const express = require('express');
const paymentController = require('../controllers/PaymentController');
const { isAuth } = require('../middleware/Authentication');
const router = express.Router();

router.get('/students/:studentId/coin', isAuth, paymentController.getCoinOfStudent);
router.put('/students/:studentId/courses/:courseId/payment', isAuth, paymentController.purchaseWithoutCart);
router.put('/students/:studentId/cart/payment', isAuth, paymentController.purchaseWithCart);

module.exports = router;