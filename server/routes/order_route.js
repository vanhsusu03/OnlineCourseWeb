const express = require('express');
const orderController = require('../controllers/OrderController');
const { isAuth } = require('../middleware/Authentication');
const router = express.Router();

router.get('/student/orders', isAuth, orderController.getByStudent);

module.exports = router;