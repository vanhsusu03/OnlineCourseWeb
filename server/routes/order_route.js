const express = require('express');
const orderController = require('../controllers/OrderController');
const { isAuth, isAdmin } = require('../middleware/Authentication');
const router = express.Router();

router.get('/student/orders', isAuth, orderController.getByStudent);
router.get('/orders', orderController.getOrders);

module.exports = router;