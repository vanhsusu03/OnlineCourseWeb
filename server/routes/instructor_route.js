const express = require('express');
const instructorController = require('../controllers/InstructorController');
const {isAlreadyLogin, isAuth, isInstructor} = require('../middleware/Authentication');
const router = express.Router();

router.post('/teaching', instructorController.createInstructor);
router.get('/instructors/:instructorId', instructorController.getInstructorInfo, instructorController.getCoursesOfInstructor);

module.exports = router;
