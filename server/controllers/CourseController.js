const sequelize = require('sequelize');
const {
    models: {Course, Course_category, Category, Instructor, Enrollment, Student, Feedback,
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
        let instructorId = req.session.instructorId;
        if (instructorId) {
            let instructor = await Student.findOne({
                include: {
                    model: Instructor,
                    where: {
                        instructor_id: instructorId,
                    },
                },
            }
            );
            let instructorFirstName = instructor.first_name;
            let instructorLastName = instructor.last_name;
            await Course.create({
                instructorId: instructorId,
                title: req.body.title,
                description: req.body.description,
                image: req.body.description,
                courseFee: req.body.courseFee,
            })
            return res.status(200).json({ msg: 'Add course successfully!' })
        } else {
            return res.status(200).json({ msg: 'You must be an instructor!' });
        }
    }

//DELETE /courses/:courseId
    async deleteCourse(req, res, next) {
        let instructorId = req.session.instructorId;
        let courseId = req.body.courseId;
        if (instructorId) {
            await Course.destroy({
                where: {
                    [Op.and]: [
                        {instructor_id: instructorId},
                        {course_id: courseId},
                    ]
                }
            })
            return res.status(200).json('Delete successfully');
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
        let courseId = req.params.courseId;
        let details = await Course.findAll({
                attributes: [
                    ['course_id', 'courseId'],
                    [sequelize.col('title'), 'courseTitle'],
                    [sequelize.col('description'), 'courseDescription'],
                    ['image', 'courseImage'],
                    [sequelize.col('course_fee'), 'courseFee'],
                    [sequelize.col('first_name'), 'instructorFirstName'],
                    [sequelize.col('last_name'), 'instructorLastName'],
                    // [sequelize.fn('AVG', sequelize.col('rating')), 'rating'],
                ],
                include: [{
                    model: Instructor,
                    attributes: [
                        'instructor_id',
                    ],
                    include: {
                        model: Student,
                        attributes: [
                            'first_name',
                            'last_name',
                        ],
                    }
                },
                    {
                        model: Enrollment,
                        include: {
                            model: Feedback,
                            attributes: [[sequelize.fn('AVG',
                                sequelize.col('rating')), 'rating']]
                        }
                    }
                ],
                where: {
                    course_id: courseId,
                },
                raw: true,
                nest: true,
            }
        )
        return res.status(200).json(details);
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
        const courseId = req.params.courseId;

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