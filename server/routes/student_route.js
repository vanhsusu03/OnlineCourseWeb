const Student = require('../models/student');
const studentController = require('../controllers/StudentController');
const express = require('express');
const router = express.Router();

router.post('/register',studentController.register);
router.post('/login',studentController.login)
router.get('/',studentController.checkLoggedin);

module.exports=router;