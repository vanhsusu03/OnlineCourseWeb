const express = require('express');
const cartController = require('../controllers/CartController');
const {isAuth} = require('../middleware/Authentication');
const router = express.Router();

router.get('/students/:studentId/cart', isAuth, cartController.getInfo);
router.post('/students/:studentId/cart/:courseId', isAuth, cartController.addCourse);
router.delete('/students/:studentId/cart/:courseId', isAuth, cartController.removeCourse);

module.exports = router;