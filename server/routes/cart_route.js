const express = require('express');
const cartController = require('../controllers/CartController');
const {isAuth} = require('../middleware/Authentication');
const router = express.Router();

router.get('/students/cart', isAuth, cartController.getInfo);
router.post('/students/:studentId/cart/:courseId', isAuth, cartController.addCourse);
router.post('/students/cart/:courseId/delete', isAuth, cartController.removeCourse);

module.exports = router;