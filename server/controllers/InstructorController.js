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
                // include: {
                //     model: Student,
                //     attributes: {
                //         is_instructor: 1,
                //     }
                // }
            });

            return res.status(200).json({ msg: 'You are now an instructor' });
        }
    } else {
    return res.status(400).json({ msg: 'You need to log in first' });
}
    }

    async getInstructorInfo(req, res, next) {
    const instructorId = req.session.instructor_id;
    if (instructorId) {
        let instructorInfo = await Instructor.findOne({
            where: {
                instructor_id: instructorId,
            },
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
            {
                model: Course,
                include: {
                    model: Enrollment,
                    include: {
                        model: Feedback,
                        attributes: [[sequelize.fn('AVG',
                            sequelize.col('rating')), 'rating']]
                    }
                }
            }
            ],
        });
        return res.status(200).json(instructorInfo);
    } else {
        res.status(200).json('You must be an instructor');
    }
}

    async getCoursesOfInstructor(req, res, next){
    const instructorId = req.session.instructor_id;
    if (instructorId) {
        let courses = Course.findAll({
            include: {
                model: Instructor,
                where: {
                    instructor_id: instructorId,
                }
            }
        })
    } else {
        res.status(200).json('You must be an instructor');
    }
}


}

module.exports = new InstructorController();

