const { models: { Instructor, Student, Course, Enrollment, Feedback } } = require('../models');
const sequelize = require("sequelize");

class InstructorController {
    async createInstructor(req, res, next) {
        const studentId = req.session.studentId;
        console.log(studentId);
        if (studentId) {
            if (Student.is_instructor) {
                return res.status(400).json({ msg: 'You have been a teacher before!' });
            } else {
                await Student.update(
                    { is_instructor: 1, },
                    {
                        where: {
                            student_id: studentId,
                        }
                    }
                );

                await Instructor.create({
                    instructor_id: studentId,
                    introduction_brief: req.body.introduction_brief,
                    transfer_info: req.body.transfer_info,
                });

                return res.status(200).json({ msg: 'You are now an instructor' });
            }
        } else {
            return res.status(400).json({ msg: 'You need to log in first' });
        }
    }
    //{GET} /instructor/info/:instructorId
    async getInstructorInfo(req, res, next) {
        const instructorId = req.params.instructorId;
        if (instructorId) {
            let instructorInfo = await Instructor.findOne({
                where: {
                    instructor_id: instructorId,
                },
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
                },
                // {
                //     model: Course,
                //     include: {
                //         model: Enrollment,
                //         include: {
                //             model: Feedback,
                //             attributes: [[sequelize.fn('AVG',
                //                 sequelize.col('rating')), 'rating']]
                //         }
                //     }
                // }
                ],
            });
            return res.status(200).json(
                {
                    msg: 'Get ok',
                    result: instructorInfo,
                }
            );
        } else {
            res.status(200).json('You must be an instructor');
        }
    }

    async getInstructorInfoInStudying(req, res, next) {
        const courseId = req.params.courseId;
        let instructorId = (await Course.findOne({
            attributes: ['instructor_id'],
            where: {
                course_id: courseId,
            }
        })).dataValues.instructor_id;

        if (instructorId) {
            let instructorInfo = await Instructor.findOne({
                where: {
                    instructor_id: instructorId,
                },
                attributes: [[sequelize.col('introduction_brief'), 'instructorBio'],
                // 'birthday',
               ],
                include: [{
                    model: Student,
                    attributes: [
                        'student_id',
                        [sequelize.fn('concat', sequelize.col('first_name'), ' ',
                            sequelize.col('last_name')), 'instructorFullName'],
                            'birthday',
                            'image',
                            'phone',
                            'email',
                    ],
                },
                ],
            });
            return res.status(200).json(
                {
                    msg: 'Get ok',
                    result: instructorInfo,
                }
            );
        } else {
            res.status(200).json('You must be an instructor');
        }
    }
    //GET /courseof/instructor
    async getCoursesOfInstructor(req, res, next) {
        const instructorId = req.params.instructorId;
        if (instructorId) {
            let courses = await Course.findAll({
                where: {
                    instructor_id: instructorId,
                },
            });
            return res.status(200).json({
                msg: "get ok",
                courses,
            });
        } else {
            res.status(200).json('You must be an instructor');
        }
    }


}

module.exports = new InstructorController();

