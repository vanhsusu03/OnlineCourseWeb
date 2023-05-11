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
        Chapter,
        Content,
        Deposit,
        Order,
        Order_detail
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
        const courseId = req.params.courseId;
        if (courseId) {
            //Delete order
            const carts = await Cart.findAll({
                where: {
                    course_id: courseId,
                }
            });
            await Promise.all(carts.map(cart => cart.destroy()));

            //Delete chapter
            const chapters = await Chapter.findAll({
                where: {
                    course_id: courseId,
                },
            });
            await Promise.all(chapters.map(async chapter => {
                const contents = await Content.findAll({
                    where: {
                        chapter_id: chapter.chapter_id,
                    }
                });
                await Promise.all(contents.map(content => content.destroy()));
                await chapter.destroy();
            }));

            //Delete course_category
            const courseCategories = await Course_category.findAll({
                where: {
                    course_id: courseId,
                }
            });
            await Promise.all(courseCategories.map(courseCategory => courseCategory.destroy()));

            //Delete enrollment
            const enrollments = await Enrollment.findAll({
                where: {
                    course_id: courseId,
                },
            });
            await Promise.all(enrollments.map(async enrollment => {
                const feedback = await Feedback.findOne({
                    where: {
                        enrollment_id: enrollment.enrollment_id
                    }
                });
                await feedback.destroy();
                const progress = await Progress.findOne({
                    where: {
                        enrollment_id: enrollment.enrollment_id
                    }
                });
                await progress.destroy();
                await enrollment.destroy();
            }));

            //Delete order_detail
            const orderDetails = await Order_detail.findAll({
                where: {
                    course_id: courseId,
                },
            });
            await Promise.all(orderDetails.map(async orderDetail => {
                const payment = await Payment.findOne({
                    where: {
                        order_detail_id: orderDetail.order_detail_id
                    }
                });
                await payment.destroy();
                await orderDetail.destroy();
            }));

            //Delete course
            await Course.destroy({
                where: {
                    course_id: courseId,
                }
            });
            return res.status(200).json({msg: 'Delete course successfully'});
        } else {
            return res.status(200).json({msg: 'Course not found'});
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