const sequelize = require('sequelize');
const {
    models: {Course, Course_category, Category, Instructor, Enrollment, Student, Feedback,
        Chapter, Content, Content_type}
} = require('../models');
const {where, Op} = require("sequelize");

class CourseController {

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
            order:[['courseId','ASC']],
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
            return res.status(200).json({msg: 'Add course successfully!'})
        } else {
            return res.status(200).json({msg: 'You must be an instructor!'});
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
                where: {courseId: req.session.courseId},
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
                    [sequelize.col('first_name'), 'instructorFirstName'],
                    [sequelize.col('last_name'), 'instructorLastName'],
                    // [sequelize.fn('AVG', sequelize.col('rating')), 'rating']
                ],
                include: [
                    {
                        model: Enrollment,
                        include: [{
                            model: Student,
                            where: {
                                student_id: studentId,
                            }
                        }],
                        attributes: [],
                    }, {
                        model: Instructor,
                        attributes: [
                            'instructor_id',
                        ],
                        include: {
                            model: Student,
                            attributes: [],
                        }
                    },
                    {
                        model: Enrollment,
                        include: {
                            model: Feedback,
                            attributes: [],
                        }
                    }
                ]
            })
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
                // {
                //     model: Enrollment,
                //     include: {
                //         model: Feedback,
                //         attributes: [[sequelize.fn('AVG',
                //             sequelize.col('rating')), 'rating']]
                //     }
                // }
            ],
            where: {
                course_id: courseId,
            },
            raw: true,
            nest: true,
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
            details,
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
                // [sequelize.fn('AVG', sequelize.col('rating')), 'rating']
            ],
            include: [
                {
                    model: Course_category,
                    include: {
                        model: Category,
                        where: {
                            category_id: categoryId,
                        }
                    },
                }, {
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
                }, {
                    model: Enrollment,
                    include: {
                        model: Feedback,
                        attributes: [[sequelize.fn('AVG',
                            sequelize.col('rating')), 'rating']]
                    }
                }
            ],
            raw: true,
            nest: true,
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
                [sequelize.fn('AVG', sequelize.col('rating')), 'rating'],
                // [sequelize.fn('AVG', sequelize.col('rating')), 'rating']
            ],
            include: [
                {
                    model: Course_category,
                    include: {
                        model: Category,
                        where: {
                            name: categoryName,
                        }
                    },
                }, {
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
                }, {
                    model: Enrollment,
                    include: {
                        model: Feedback,
                        attributes: []
                    }
                }
            ],
            raw: true,
            nest: true,
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
