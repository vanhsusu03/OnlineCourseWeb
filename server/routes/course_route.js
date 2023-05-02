const express = require('express');
const courseController = require('../controllers/CourseController');
const {isAuth, isInstructor} = require('../middleware/Authentication');
const router = express.Router();

router.post('/courses/create', isInstructor, courseController.addCourse);
router.post('/courses/:courseId/edit', isInstructor, courseController.editCourse);
router.delete('/courses/:courseId', isInstructor, courseController.deleteCourse);
router.get('/courses/:courseId', courseController.showCourseDetail);

router.get('/mycourses', isAuth, courseController.showYourCourses);
router.get('/courses/:categoryId', courseController.showCoursesByCategoryId);
router.get('/courses/:categoryName', courseController.showCoursesByCategoryName);

router.get('/courses', courseController.showAllCourses);