const express = require('express');
const cartController = require('../controllers/CartController');
const { isAuth } = require('../middleware/Authentication');
const router = express.Router();

router.get('cart', cartController.addCourse);

module.exports = router;