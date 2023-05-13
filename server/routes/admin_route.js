const express = require('express');
const adminController = require('../controllers/AdminController');
const {isAdmin} = require('../middleware/Authentication');
const router = express.Router();

// router.post('/admin/:studentId', isAdmin, adminController.deleteAccount);
// router.post('/admin/:courseId', isAdmin, adminController.deleteCourse);
// router.post('/admin/:studentId', isAdmin, adminController.editStudentInfo);
// router.post('/admin/:courseId', isAdmin, adminController.editCourse);
// router.get('/admin/courses', isAdmin, adminController.showCourses);
// router.get('/admin/accounts', isAdmin, adminController.showAccounts);

router.delete('/admin/delete/:studentId', adminController.deleteAccount);
router.delete('/admin/delete/course/:courseId', adminController.deleteCourse);
router.post('/admin/change/:studentId/:coin', adminController.editStudentInfo);
router.post('/admin/change/:courseId', adminController.editCourse);
router.get('/admin/courses', adminController.showCourses);
router.get('/admin/accounts', adminController.showAccounts);
router.post('/course/:courseId/create', adminController.createChapter);
router.post('/chapter/contents/create', adminController.createContents);
router.post('/courses/create', adminController.addCourse);
module.exports = router;