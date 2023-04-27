const express = require('express');
const cartController = require('../controllers/CartController');
const { isAuth } = require('../middleware/Authentication');
const router = express.Router();

router.get('/students/:studentId/cart', isAuth, cartController.getInfo);


module.exports = router;