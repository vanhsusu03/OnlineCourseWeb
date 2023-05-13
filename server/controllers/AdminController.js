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
        Order_detail,
        Content_type
    }
} = require('../models');
const bcrypt = require("bcrypt");
const { where } = require("sequelize");
const bcryptRound = 10;
const { format } = require('date-fns');
const sequelize = require('sequelize');
const db = require("../models");


class AdminController {
    //POST /admin/:studentId
    async deleteAccount(req, res, next) {
        const studentId = req.params.studentId;
        if (studentId) {

            //Delete cart
            const carts = await Cart.findAll({
                where: {
                    student_id: studentId,
                }
            });
            if (carts) {
                await Promise.all(carts.map(async cart => {
                    await cart.destroy();
                }))
            }

            //Delete deposit
            const deposits = await Deposit.findAll({
                where: {
                    customer_id: studentId,
                }
            });
            if (deposits) {
                await Promise.all(deposits.map(async deposit => {
                    await deposit.destroy();
                }));
            }

            //Delete enrollment
            const enrollments = await Cart.findAll({
                where: {
                    student_id: studentId,
                }
            });
            if (enrollments) {
                await Promise.all(enrollments.map(async enrollment => {
                    await enrollment.destroy();
                }));
            }

            //Delete instructor
            const instructor = await Instructor.findOne({
                where: {
                    instructor_id: studentId,
                },
            });
            if (instructor) {
                const courses = await Course.findAll({
                    where: {
                        instructor_id: instructor.instructor_id,
                    }
                });
                if (courses) {
                    await Promise.all(courses.map(async course => {
                        await course.destroy();
                    }));
                }
            }

            //Delete order
            const orders = await Order.findAll({
                where: {
                    customer_id: studentId,
                },
            });
            if (orders) {
                await Promise.all(orders.map(async order => {
                    const orderDetails = await Order_detail.findAll({
                        where: {
                            order_id: order.order_id,
                        }
                    });
                    await Promise.all(orderDetails.map(orderDetail => orderDetail.destroy()));
                    await order.destroy();
                }));
            }

            await Student.destroy({
                where: {
                    student_id: studentId,
                }
            })
            return res.status(200).json({ msg: 'Delete account successfully' });
        } else {
            return res.status(200).json({ msg: 'Account not found' });
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
            if(carts){
                await Promise.all(carts.map(cart => cart.destroy()));
            }

            //Delete chapter
            const chapters = await Chapter.findAll({
                where: {
                    course_id: courseId,
                },
            });
            if(chapters){
                await Promise.all(chapters.map(async chapter => {
                    const contents = await Content.findAll({
                        where: {
                            chapter_id: chapter.chapter_id,
                        }
                    });
                    if(contents){
                        await Promise.all(contents.map(content => content.destroy()));
                    }
                    await chapter.destroy();
                }));
            }

            //Delete course_category
            const courseCategories = await Course_category.findAll({
                where: {
                    course_id: courseId,
                }
            });
            if(courseCategories){
                await Promise.all(courseCategories.map(courseCategory => courseCategory.destroy()));
            }

            //Delete enrollment
            const enrollments = await Enrollment.findAll({
                where: {
                    course_id: courseId,
                },
            });
           if(enrollments){
               await Promise.all(enrollments.map(async enrollment => {
                   const feedback = await Feedback.findOne({
                       where: {
                           enrollment_id: enrollment.enrollment_id
                       }
                   });
                   if(feedback){
                       await feedback.destroy();
                   }
                   const progress = await Progress.findOne({
                       where: {
                           enrollment_id: enrollment.enrollment_id
                       }
                   });
                   if(progress){
                       await progress.destroy();
                   }
                   await enrollment.destroy();
               }));
           }

            //Delete order_detail
            const orderDetails = await Order_detail.findAll({
                where: {
                    course_id: courseId,
                },
            });
            if(orderDetails){
                await Promise.all(orderDetails.map(async orderDetail => {
                    const payment = await Payment.findOne({
                        where: {
                            order_detail_id: orderDetail.order_detail_id
                        }
                    });
                    if(payment){
                        await payment.destroy();
                    }
                    await orderDetail.destroy();
                }));
            }

            //Delete course
            await Course.destroy({
                where: {
                    course_id: courseId,
                }
            });
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

    //POST /courses/create
    async addCourse(req, res, next) {
        // console.log(req.body);
        const {courseTitle, courseDescription, courseImage, courseFee, instructorId} = req.body;
        console.log(instructorId);
        const now = new Date();
        const vietnamDate = format(now, 'yyyy-MM-dd', { timeZone: 'Asia/Ho_Chi_Minh' });
        if (instructorId) {
            // let instructor = await Student.findOne({
            //     include: {
            //         model: Instructor,
            //         where: {
            //             instructor_id: instructorId,
            //         },
            //     },
            // }
            // );

            await Course.create({
                instructor_id: instructorId,
                title: courseTitle,
                description: courseDescription,
                image: courseImage,
                release_date: vietnamDate,
                course_fee: courseFee, 

            })
            return res.status(200).json({ msg: 'Add course successfully!' })
        } else {
            return res.status(200).json({ msg: 'You must be an instructor!' });
        }
    }

    //GET /admin/accounts
    async showAccounts(req, res, next) {
        return res.status(200).json(await Student.findAll());
    }
    //Get /admin/instructors
    async showAllInstructors(req, res, next) {

        return res.status(200).json(
            await Student.findAll({
                // attributes: [],
                where: {
                    is_instructor: 1,
                },
            })
        )
    }    //POST /course/:courseId/create
    async createChapter(req, res, next) {
        // console.log(req.body);
        const courseId = Number(req.params.courseId);
        const chapterTitle = req.body.chapterTitle;
        if (courseId) {
            await Chapter.create({
                course_id: courseId,
                title: chapterTitle

            })
            return res.status(200).json({ msg: 'Add chapter successfully!' })
        } else {
            return res.status(200).json({ msg: 'You must be an instructor!' });
        }
    }

    //POST /chapter/contents/create
    async createContents(req, res, next) {
        const {chapterId, contentTypeId, contentTitle, timeRequiredInSec, isOpenForFree, contentLink, check} = req.body;
        if (chapterId) {
            await Content.create({
                chapter_id: chapterId,
                content_type_id: contentTypeId,
                title: contentTitle,
                time_required_in_sec: timeRequiredInSec,
                is_open_for_free: isOpenForFree,
                link: contentLink

            })
            return res.status(200).json({ msg: 'Add content successfully!' })
        } else {
            return res.status(200).json({ msg: 'You must be an instructor!' });
        }
    }

}



module.exports = new AdminController();