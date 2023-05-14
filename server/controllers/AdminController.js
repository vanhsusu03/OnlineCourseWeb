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
        Order_detail,
        Progress,
        Content,
        Payment,
        Deposit,
        Order,
    }
} = require('../models');
const bcrypt = require("bcrypt");
const {where} = require("sequelize");
const bcryptRound = 10;
const sequelize = require('sequelize');


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
            console.log('Delete successfully!');
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
            if (carts) {
                await Promise.all(carts.map(cart => cart.destroy()));
            }

            //Delete chapter
            const chapters = await Chapter.findAll({
                where: {
                    course_id: courseId,
                },
            });
            if (chapters) {
                await Promise.all(chapters.map(async chapter => {
                    const contents = await Content.findAll({
                        where: {
                            chapter_id: chapter.chapter_id,
                        }
                    });
                    if (contents) {
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
            if (courseCategories) {
                await Promise.all(courseCategories.map(courseCategory => courseCategory.destroy()));
            }

            //Delete enrollment
            const enrollments = await Enrollment.findAll({
                where: {
                    course_id: courseId,
                },
            });
            if (enrollments) {
                await Promise.all(enrollments.map(async enrollment => {
                    const feedback = await Feedback.findOne({
                        where: {
                            enrollment_id: enrollment.enrollment_id
                        }
                    });
                    if (feedback) {
                        await feedback.destroy();
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
            if (orderDetails) {
                await Promise.all(orderDetails.map(async orderDetail => {
                    const payment = await Payment.findOne({
                        where: {
                            order_detail_id: orderDetail.order_detail_id
                        }
                    });
                    if (payment) {
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
            })
            console.log('Delete course successfully' + ' ' + courseId);
            return res.status(200).json({msg: 'Delete course successfully'});
        } else {
            return res.status(200).json({msg: 'Course not found'});
        }
    }

//POST /admin/:studentId
    async editStudentInfo(req, res, next) {
        const studentId = req.params.student_id;
        const {firstname, lastname, email, username, oldPassword, newPassword, phone, birth, coin} = req.body;
        let student = await Student.findOne({
            where: {
                student_id: studentId,
            }
        })
        if (!student) {
            return res.status(200).json('Student is not found!');
        } else {
            const check = bcrypt.compareSync(oldPassword, student.password);
            if (!check) {
                res.json('Your old password is not match!');
            } else {
                let newHashedPw = await bcrypt.hash(newPassword, bcryptRound);
                await Student.update({
                    first_name: firstname,
                    last_name: lastname,
                    email: email,
                    phone: phone,
                    birthday: birth,
                    username: username,
                    password: newHashedPw,
                    coin: coin,
                });
                return res.status(200).json('Update information successfully!');
            }
        }
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
                where: {courseId: req.session.courseId},
            })
            return res.status(200).json('Edit successfully');
        } else {
            res.status(200).json('Course is not found!');
        }
    }

//GET /admin/courses
    async showCourses(req, res, next) {
        const courses = await Course.findAll({
                order: [
                    ['course_id', 'ASC'],
                ]
            }
        );
        console.log('Admin show courses')
        return res.status(200).json(courses);
    }

//GET /admin/accounts
    async showAccounts(req, res, next) {
        const accounts = await Student.findAll();
        console.log('Admin show all accounts')
        return res.status(200).json(accounts);
    }

//GET /admin/orders
    async showOrders(req, res, next) {
        const orders = await Order.findAll({
                attributes: [
                    [sequelize.col('Order.order_id'), 'orderId'],
                    [sequelize.fn('CONVERT_TZ', sequelize.col('Order.order_time'), '+00:00', '+07:00'), 'orderTime']
                ],
                include: {
                    model: Order_detail,
                    attributes: [[sequelize.col('order_detail_id'), 'orderDetailId']],
                    include: [
                        {
                            model: Payment,
                            attributes: ['amount']
                        },
                        {
                            model: Course,
                            attributes: [
                                [sequelize.col('course_id'), 'courseId'],
                                [sequelize.col('title'), 'courseTitle'],
                                [sequelize.col('description'), 'courseDescription'],
                                [sequelize.col('image'), 'courseImage'],
                                [sequelize.col('release_date'), 'courseReleaseDate'],
                                [sequelize.col('is_closed'), 'isCourseClosed']
                            ],
                            include: {
                                model: Instructor,
                                attributes: [[sequelize.col('instructor_id'), 'instructorId']],
                                include: {
                                    model: Student,
                                    attributes: [
                                        [sequelize.col('first_name'), 'instructorFirstName'],
                                        [sequelize.col('last_name'), 'instructorLastName']
                                    ]
                                }
                            }
                        }]
                },
            }
        )
    }

    //GET /admin/instructor
    async showAllInstructors(req, res, next) {
        const instructors = Instructor.findAll({
            attributes: [[sequelize.col('introduction_brief'), 'instructorBio'],
                // 'birthday',
            ],
            include: [{
                model: Student,
                attributes: [
                    [sequelize.fn('concat', sequelize.col('first_name'), ' ',
                        sequelize.col('last_name')), 'instructorFullName'],
                    'birthday',
                    'image',
                    'phone',
                    'email',
                ],
            }, {
                model: Course,
                attributes: [[sequelize.fn('COUNT', sequelize.col('Course.course_id')), 'totalCourses']],
                duplicating: false
            }],
            group: ['Instructor.instructor_id'],
        })
    }

    async createChapter(req, res, next) {

    }

    async createContents(req, res, next) {

    }

    async addCourse(req, res, next) {

    }
}


module.exports = new AdminController();
