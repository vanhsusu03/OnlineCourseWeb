const {
    models: {
        Student,
        Course,
        Instructor,
        Course_category,
        Category,
        Cart,
        Feedback,
        Enrollment,
        Deposit,
    }
} = require('../models');
const bcrypt = require("bcrypt");
const { where } = require("sequelize");
const bcryptRound = 10;
const sequelize = require('sequelize');
const db = require("../models");


class AdminController {
    //POST /admin/:studentId
    async deleteAccount(req, res, next) {
        const studentId = Number(req.params.studentId);
        if (studentId) {
            await Student.destroy({
                where: {
                    student_id: studentId,
                }
            })
            return res.status(200).json({msg: 'Delete account successfully'});
        } else {
            return res.status(200).json({msg: 'Account not found'});
        }
    }

    //POST /admin/:courseId
    async deleteCourse(req, res, next) {
        const courseId = req.params.studentId;
        if (courseId) {
            await Course.destroy({
                include: [{
                    model: Enrollment,
                }, {
                    model: Cart,
                }],
                where: {
                    course_id: courseId,
                }
            })
            return res.status(200).json({ msg: 'Delete course successfully' });
        } else {
            return res.status(200).json({ msg: 'Course not found' });
        }
    }

    //POST /admin/:studentId
    async editStudentInfo(req, res, next) {
        const studentId = Number(req.params.studentId);
        const coin = Number(req.params.coin);
        const today = await db.sequelize.query("SELECT DATE(NOW()) as today", { type: db.sequelize.QueryTypes.SELECT });
        // console.log(studentId);
        await Student.update(
            { coin: coin, },
            {
                where: {
                    student_id: studentId,
                }
            }
        );
        await Deposit.create(
            {
                customer_id: studentId,
                amount: coin,
                deposit_time: today[0].today,
            }
        )
        return res.status(200).json('Update information successfully!');
    }

    //POST /admin/:courseId
    async editCourse(req, res, next) {
        let courseId = req.params.courseId;
        if (courseId) {
            await Course.update({
                title: req.body.title,
                description: req.body.description,
                image: req.body.description,
                course_fee: req.body.course_fee,
            }, {
                where: { courseId: req.session.courseId },
            })
            return res.status(200).json('Edit successfully');
        } else {
            res.status(200).json('Course is not found!');
        }
    }

    //GET /admin/courses
    async showCourses(req, res, next) {
        return res.status(200).json(await Course.findAll({
            attributes: [
                ['course_id', 'courseId'],
                [sequelize.col('title'), 'courseTitle'],
                [sequelize.col('description'), 'courseDescription'],
                ['image', 'courseImage'],
                [sequelize.col('course_fee'), 'courseFee'],
                [sequelize.col('first_name'), 'instructorFirstName'],
                [sequelize.col('last_name'), 'instructorLastName'],
                // [sequelize.fn('AVG', sequelize.col('rating')), 'rating']
            ],
            order: [['courseId', 'ASC']],
            include: [{
                model: Instructor,
                attributes: [],
                required: true,
                include: {
                    model: Student,
                    attributes: [],
                    required: true
                }
            }, {
                model: Enrollment,
                include: {
                    model: Feedback,
                    attributes: [],
                    required: true,
                }
            }]
        }))
    }

    //GET /admin/accounts
    async showAccounts(req, res, next) {
        return res.status(200).json(await Student.findAll());
    }


}



module.exports = new AdminController();