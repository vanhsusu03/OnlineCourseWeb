const Student = require('../models/student');
const studentController = require('../controllers/StudentController');
const express = require('express');
const router = express.Router();

router.post('/api/#/signup',studentController.signup);
router.post('/api/#/login',studentController.login);

router.get('/',studentController.checkLoggedin);

module.exports=router;