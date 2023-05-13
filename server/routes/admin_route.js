const express = require('express');
const adminController = require('../controllers/AdminController');
const { isAdmin } = require('../middleware/Authentication');
const router = express.Router();

// router.post('/admin/:studentId', isAdmin, adminController.deleteAccount);
// router.post('/admin/:courseId', isAdmin, adminController.deleteCourse);
// router.post('/admin/:studentId', isAdmin, adminController.editStudentInfo);
// router.post('/admin/:courseId', isAdmin, adminController.editCourse);
// router.get('/admin/courses', isAdmin, adminController.showCourses);
// router.get('/admin/accounts', isAdmin, adminController.showAccounts);


router.delete('/admin/delete/:studentId', isAdmin, adminController.deleteAccount);
router.delete('/admin/delete/course/:courseId', isAdmin, adminController.deleteCourse);
router.post('/admin/change/:studentId/:coin', isAdmin, adminController.editStudentInfo);
router.post('/admin/change/:courseId', isAdmin, adminController.editCourse);
router.get('/admin/courses', isAdmin, adminController.showCourses);
router.get('/admin/accounts', isAdmin, adminController.showAccounts);
router.get('/admin/instructors', isAdmin, adminController.showAllInstructors)
router.post('/course/:courseId/create', adminController.createChapter);
router.post('/chapter/contents/create', adminController.createContents);
router.post('/courses/create', adminController.addCourse);
module.exports = router;