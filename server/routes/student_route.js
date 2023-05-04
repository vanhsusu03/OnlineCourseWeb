const express = require('express');
const studentController = require('../controllers/StudentController');
const { isAlreadyLogin, isAuth, isInstructor} = require('../middleware/Authentication');
const router = express.Router();

router.post('/signup', studentController.signUp);
router.post('/login', isAlreadyLogin, studentController.logIn);
router.post('/logout', isAuth, studentController.logOut);
router.post('/edit/info', isAuth,studentController.updateInfo);
router.get('/account/info', isAuth, studentController.getInfo);
router.post('/change/password',isAuth, studentController.changePassword);
module.exports = router;