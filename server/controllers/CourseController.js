const sequelize = require('sequelize');
const { format } = require('date-fns');
const {
    models: {Course, Course_category,Cart,Order_detail, Category, Instructor, Enrollment, Student, Feedback,
        Chapter, Content, Content_type}
} = require('../models');
const {where, Op} = require("sequelize");

class CourseController {

    //POST /course/state/:courseId
    async checkStateCourse(req, res, next) {
        const studentId = req.session.studentId;
        const courseId = Number(req.params.courseId);
        console.log("ID COURSE LA: " + courseId + ' Studentid la: ' + studentId);
        try {
            if (typeof studentId != 'undefined') {
                let isActivated = await Enrollment.findOne({
                    where: {
                        student_id: studentId,
                        course_id: courseId,
                    }
                });

                if (!isActivated) {
                    return res.status(200).json({
                        msg: 'Unactivated',
                        redirect: '/course/info/:courseId',
                    });
                } else {
                    return res.status(200).json({
                        msg: 'Activated',
                        redirect: '/course/detail/:courseId',
                    });
                }
            } else {
                return res.status(201).json({
                    msg: 'Unactivated',
                    redirect: '/course/info/:courseId',
                });
            }
        } catch (err) {
            next(err);
        }
    }

    //GET /courses
    async showAllCourses(req, res, next) {
        return res.status(200).json(await Course.findAll({
            attributes: [
                ['course_id', 'courseId'],
                [sequelize.col('title'), 'courseTitle'],
                [sequelize.col('description'), 'courseDescription'],
                ['image', 'courseImage'],
                [sequelize.col('course_fee'), 'courseFee'],
                [sequelize.col('first_name'), 'instructorFirstName'],
                [sequelize.col('last_name'), 'instructorLastName'],
                ['instructor_id', 'instructorId'],
                // [sequelize.fn('AVG', sequelize.col('rating')), 'rating']
            ],
            order: [['courseTitle', 'ASC']],
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
        const instructorId = req.session.studentId;
        const {courseTitle, courseDescription, courseImage, courseFee} = req.body;
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

    //DELETE /courses/:courseId
    async deleteCourse(req, res, next) {
        const courseId = Number(req.params.courseId);
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
                    instructor_id: req.session.studentId,
                }
            });
            return res.status(200).json({msg: 'Delete course successfully'});
        } else {
            return res.status(200).json({msg: 'Course not found'});
        }
    }

    //POST /courses/:courseId/edit
    async editCourse(req, res, next) {
        let instructorId = req.session.instructorId;
        let courseId = req.params.courseId;
        if (instructorId) {
            await Course.update({
                title: req.body.title,
                description: req.body.description,
                image: req.body.description,
                course_fee: req.body.course_fee,
            }, {
                where: { courseId: req.session.courseId },
            })
            return res.status(200).json('Edit successfully');
        }
    }

    //GET /mycourses
    async showYourCourses(req, res, next) {
        let studentId = req.session.studentId;

        if (studentId) {
            let courses = await Course.findAll({
                attributes: [
                    ['course_id', 'courseId'],
                    [sequelize.col('title'), 'courseTitle'],
                    [sequelize.col('description'), 'courseDescription'],
                    ['image', 'courseImage'],
                    [sequelize.col('course_fee'), 'courseFee'],
                    [sequelize.col('Instructor.Student.first_name'), 'instructorFirstName'],
                    [sequelize.col('Instructor.Student.last_name'), 'instructorLastName'],
                    // [sequelize.fn('AVG', sequelize.col('rating')), 'rating']
                ],
                include: [
                    {
                        model: Enrollment,
                        attributes: [],
                        required: true,
                        include: [{
                            model: Student,
                            attribute: [],
                            required: true,
                            where: {
                                student_id: studentId,
                            }
                        }],
                    }, {
                        model: Instructor,
                        required: true,
                        attributes: [],
                        include: {
                            model: Student,
                            required: true,
                            attributes: [
                                'last_name',
                                'first_name',
                            ],
                        }
                    },
                    {
                        model: Enrollment,
                        attributes: [],
                        include: {
                            model: Feedback,
                            attributes: [],
                        }
                    }
                ]
            })
            console.log(courses);
            return res.status(200).json(courses);
        }
    }

    //GET /courses/:courseId
    async showCourseDetail(req, res, next) {
        let courseId = Number(req.params.courseId);
        
        let details = await Course.findByPk(courseId, {
            include: [
              {
                model: Category,
                attributes: ['name'],
                through: {attributes: []}
              }
            ]
          });

        const numOfChapters = await Chapter.count({
            where: { course_id: courseId },
        });

        let numOfContents = 0;
        await Chapter.findAll({
            where: { course_id: courseId },
            include: [{ model: Content }],
        }).then((chapters) => {
            chapters.forEach((chapter) => {
                numOfContents += chapter.contents.length;
            });
        });

        const numOfStudents = await Enrollment.count({
            where: { course_id: courseId },
        });

        var averageRating;
        var feedbackCount = 0;
        await Enrollment.findAll({
            where: { course_id: courseId },
            include: [{ model: Feedback }],
        }).then((enrollments) => {
            let totalRating = 0;
            enrollments.forEach((enrollment) => {
                if (enrollment.feedback) {
                    totalRating += enrollment.feedback.rating;
                    feedbackCount++;
                }
            });
            averageRating = feedbackCount > 0 ? totalRating/feedbackCount : 0;
        });
        return res.status(200).json({
            info: details,
            numOfChapters,
            numOfContents,
            numOfStudents,
            feedbackCount,
            averageRating
        });
    }

    //GET /courses/:categoryId
    async showCoursesByCategoryId(req, res, next) {
        let categoryId = req.params.categoryId;
        let courses = await Course.findAll({
            attributes: [
                ['course_id', 'courseId'],
                [sequelize.col('title'), 'courseTitle'],
                [sequelize.col('description'), 'courseDescription'],
                ['image', 'courseImage'],
                [sequelize.col('course_fee'), 'courseFee'],
                [sequelize.col('first_name'), 'instructorFirstName'],
                [sequelize.col('last_name'), 'instructorLastName'],
                ['instructor_id', 'instructorId'],
                'createdAt',
                'updatedAt',
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
                attributes: [],
                required: true,
                include: {
                    model: Feedback,
                    attributes: [],
                }
            }, {
                model: Course_category,
                attributes: [],
                required: true,
                include: {
                    model: Category,
                    attributes: [],
                    where: {
                        category_id: categoryId,
                    }
                }
            }]
        });
        return res.status(200).json(courses);
    }

    //GET /courses/:categoryName
    async showCoursesByCategoryName(req, res, next) {
        let categoryName = req.params.categoryName;
        let courses = await Course.findAll({
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
                attributes: [],
                required: true,
                include: {
                    model: Feedback,
                    attributes: [],
                    required: true,
                }
            }, {
                model: Course_category,
                attributes: [],
                required: true,
                include: {
                    model: Category,
                    attributes: [],
                    required: true,
                    where: {
                        name: categoryName,
                    }
                }
            }]
        });
        return res.status(200).json(courses);
    }

    async getContents(req, res, next) {
        const courseId = Number(req.params.courseId);

        const contents = await Chapter.findAll({
            attributes: [ 
                [sequelize.col('Chapter.chapter_id'), 'chapterId'],
                [sequelize.col('Chapter.title'), 'chapterTitle']
            ],
            order: [
                ['chapterId', 'ASC']
            ],
            include: {
                model: Content,
                attributes: [
                    [sequelize.col('content_id'), 'contentId'],
                    [sequelize.col('title'), 'contentTitle'],
                    [sequelize.col('time_required_in_sec'), 'timeRequiredInSec'],
                    [sequelize.col('link'), 'contentLink'],
                ],
                order: [
                    [sequelize.col('content_id'), 'ASC']
                ],
                include: {
                    model: Content_type,
                    attributes: [
                        [sequelize.col('type_id'), 'contentTypeId'],
                        [sequelize.col('content_type'), 'contentType']
                    ],
                    required: true
                }
            },
            required: true,
            where: { 
                course_id: courseId 
            }
        });

        return res.status(200).json({
            contents: contents
        });
    }
    
}

module.exports = new CourseController();