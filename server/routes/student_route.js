const express = require('express');
const studentController = require('../controllers/StudentController');
const { isAlreadyLogin, isAuth} = require('../middleware/Authentication');
const router = express.Router();

router.post('/signUp', isAlreadyLogin, studentController.signUp);
router.post('/login',isAlreadyLogin,studentController.logIn);

module.exports = router;