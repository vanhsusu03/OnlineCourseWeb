const express = require('express');
const adminController = require('../controllers/AdminController');
const {isAdmin} = require('../middleware/Authentication');
const router = express.Router();

router.delete('/admin/:studentId',isAdmin,adminController.deleteAccount);
router.delete('/admin/:courseId',isAdmin,adminController.deleteCourse);
router.post('/admin/:studentId',isAdmin,adminController.editStudentInfo);
router.post('/admin/:courseId',isAdmin,adminController.editCourse);

module.exports = router;
