const sequelize = require('sequelize');
const {models: {Course, Course_category, Category, Instructor, Enrollment, Student}} = require('../models');
const {where} = require("sequelize");

class CourseController {

    //GET /courses
    async showAllCourses(req, res, next) {
        return res.status(200).json(await Course.findAll({
            include:{
                model: Instructor,
                attributes: [
                    Instructor.instructor_id,
                    [sequelize.fn('concat', sequelize.col('first_name'), ' ',
                        sequelize.col('last_name')), 'instructorFullName']
                ],
            }
        }));
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
                    instructorId: instructorId,
                    courseId: courseId,
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
                    [sequelize.col('Course.course_id'), 'courseId'],
                    [sequelize.col('Course.title'), 'courseTitle'],
                    [sequelize.col('Course.description'), 'courseDescription'],
                    [sequelize.col('Course.image'), 'courseImage'],
                    [sequelize.col('Course.course_fee'), 'courseFee'],
                ],
                include: [
                    {
                        model: Enrollment,
                    },
                    {
                        model: Student,
                        where: {
                            student_id: studentId,
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
                include: {
                    model: Instructor,
                    attributes: [
                        Instructor.instructor_id,
                        [sequelize.fn('concat', sequelize.col('first_name'), ' ',
                            sequelize.col('last_name')), 'instructorFullName']
                    ]
                },
                attributes: [
                    Course.course_id,
                    Course.title,
                    Course.description,
                    Course.image,
                    Course.course_fee,
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
            include: [
                {model: Course_category},
                {
                    model: Category,
                    where: {
                        category_id: categoryId,
                    }
                },
                {
                    model: Instructor,
                    attributes: [
                        Instructor.instructor_id,
                        [sequelize.fn('concat', sequelize.col('first_name'), ' ',
                            sequelize.col('last_name')), 'instructorFullName']
                    ]
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
                {model: Course_category,},
                {
                    model: Category,
                    where: {
                        name: categoryName,
                    }
                },
                {
                    model: Instructor,
                    attributes: [
                        Instructor.instructor_id,
                        [sequelize.fn('concat', sequelize.col('first_name'), ' ',
                            sequelize.col('last_name')), 'instructorFullName']
                    ]
                }
            ],
            raw: true,
            nest: true,
        });
        return res.status(200).json(courses);
    }
}

module.exports = new CourseController();