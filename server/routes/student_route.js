const express = require('express');
const studentController = require('../controllers/StudentController');
const { isAlreadyLogin, isAuth, isInstructor} = require('../middleware/Authentication');
const router = express.Router();

router.post('/signup', studentController.signUp);
router.post('/login', studentController.logIn);
router.post("/logout",studentController.logOut);


module.exports = router;