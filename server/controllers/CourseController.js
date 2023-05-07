const sequelize = require('sequelize');
const { models: { Course, Course_category, Category, Instructor, Enrollment, Student, Feedback } } = require('../models');
const { where, Op } = require("sequelize");
const student = require('../models/student');

class CourseController {

    //POST /course/state/:courseId
    async checkStateCourse(req, res, next) {
        const studentId = req.session.studentId;
        const courseId = Number(req.params.courseId);
        console.log("ID COURSE LA: " + courseId + ' Studentid la: ' + studentId);
        try {
            if (req.session.studentId) {
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
            }
        } catch (err) {
            next(err);
        }
    }

    //GET /courses
    async showAllCourses(req, res, next) {
        // return res.status(200).json(await Course.findAll({
        //     include: [{
        //         model: Instructor,
        //         attributes: [
        //             'instructor_id',
        //             [sequelize.fn('concat', sequelize.col('first_name'), ' ',
        //                 sequelize.col('last_name')), 'instructorFullName']
        //         ],
        //     },
        //         {
        //             model: Enrollment,
        //             include: {
        //                 model: Feedback,
        //                 attributes: [[sequelize.fn('AVG',
        //                     sequelize.col('rating')), 'rating']]
        //             }
        //         }
        //     ]
        // }));
        return res.status(200).json(await Course.findAll());
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
                        { instructorId: instructorId },
                        { courseId: courseId },
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
                    [sequelize.col('Course.course_id'), 'courseId'],
                    [sequelize.col('Course.title'), 'courseTitle'],
                    [sequelize.col('Course.description'), 'courseDescription'],
                    [sequelize.col('Course.image'), 'courseImage'],
                    [sequelize.col('Course.course_fee'), 'courseFee'],
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
                        attributes: [[sequelize.fn('AVG',
                            sequelize.col('rating')), 'rating']],
                    },
                ]
            })
            return res.status(200).json(courses);
        }
    }

    //GET /courses/showinfo/:courseId
    async showCourseDetail(req, res, next) {
        let courseId = Number(req.params.courseId);
        let details = await Course.findAll({
            include: [{
                model: Instructor,
                attributes: [
                    Instructor.instructor_id,
                    [sequelize.fn('concat', sequelize.col('first_name'), ' ',
                        sequelize.col('last_name')), 'instructorFullName']
                ],
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
            attributes: [
                'course_id',
                'title',
                'description',
                'image',
                'course_fee',
            ],
            where: {
                course_id: courseId,
            },
            raw: true,
            nest: true,
        }
        )
        console.log('HIEHHHHHHHHHHHHHHHHHHH');
        if (!details) {
            console.log('DIE');
        }
        return res.status(200).json(details);
    }

    //GET /courses/:categoryId
    async showCoursesByCategoryId(req, res, next) {
        let categoryId = req.params.categoryId;
        let courses = await Course.findAll({
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
                        Instructor.instructor_id,
                        [sequelize.fn('concat', sequelize.col('first_name'), ' ',
                            sequelize.col('last_name')), 'instructorFullName']
                    ]
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
                        Instructor.instructor_id,
                        [sequelize.fn('concat', sequelize.col('first_name'), ' ',
                            sequelize.col('last_name')), 'instructorFullName']
                    ]
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
}

module.exports = new CourseController();
