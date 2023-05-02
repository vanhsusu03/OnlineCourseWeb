const sequelize = require('sequelize');
const {models: {Course, Course_category, Category, Instructor, Enrollment, Student}} = require('../models');
const {where} = require("sequelize");

class CourseController {
    async showAllCourses(req, res, next) {
        return await Course.findAll();
    }

    async addCourse(req, res, next) {
        let instructorId = req.session.instructorId;
        if (instructorId) {
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

    async deleteCourse(req, res, next) {
        let instructorId = req.session.instructorId;
        if (instructorId) {
            await Course.destroy({
                where: {
                    instructorId: instructorId,
                    courseId: req.body.courseId,
                }
            })
            return res.status(200).json('Delete successfully');
        }
    }

    async editCourse(req, res, next) {
        let instructorId = req.session.instructorId;
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
                where: {
                    studentId: studentId,
                },
                include: {
                    model: Course,
                    attributes: [],
                    required: true,
                    include: {
                        model: Enrollment,
                        attributes: [],
                        required: true,
                    }
                }
            })
            return res.status(200).json(courses);
        }
    }

    async showCourseDetail(req, res, next) {
        let courseId = req.session.courseId;
        let details = await Course.findAll({
                attributes: [
                    Course.courseId,
                    Course.title,
                    Course.description,
                    Course.image,
                    Course.course_fee,
                    Instructor.instructorId,
                    Instructor.first_name,
                    Instructor.last_name,

                ],
                where: {
                    courseId: courseId,
                },
                include: {
                    model: Course,
                    attributes: [],
                    required: true,
                    include: {
                        model: Instructor,
                        attributes: [],
                        required: true,
                    }
                }
            }
        )
        return res.status(200).json(details);
    }
}