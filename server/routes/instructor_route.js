const express = require('express');
const instructorController = require('../controllers/InstructorController');
const {isAlreadyLogin, isAuth, isInstructor} = require('../middleware/Authentication');
const router = express.Router();

router.post('/teaching', instructorController.createInstructor);

router.get('/instructor/info/:instructorId', instructorController.getInstructorInfo);
router.get('/courseof/:instructorId', instructorController.getCoursesOfInstructor);

module.exports = router;
