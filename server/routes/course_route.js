const express = require('express');
const courseController = require('../controllers/CourseController');
const {isAuth, isInstructor} = require('../middleware/Authentication');
const router = express.Router();

router.post('/courses/create', courseController.addCourse);
router.post('/courses/:courseId/edit', courseController.editCourse);
router.delete('/courses/:courseId', courseController.deleteCourse);
router.get('/courses/:courseId', courseController.showCourseDetail);

router.get('/mycourses', courseController.showYourCourses);
router.get('/courses/:categoryId', courseController.showCoursesByCategoryId);
router.get('/courses/:categoryName', courseController.showCoursesByCategoryName);

router.get('/courses', courseController.showAllCourses);

module.exports = router;
