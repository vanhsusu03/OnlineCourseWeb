const express = require('express');
const studentController = require('../controllers/StudentController');
const { isAlreadyLogin } = require('../middleware/Authentication');
const router = express.Router();

router.post('/signup', isAlreadyLogin, studentController.register);
router.get("/signup", studentController.saaaaa);

module.exports = router;