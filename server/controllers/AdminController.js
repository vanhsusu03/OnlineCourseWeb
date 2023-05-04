const {
    models: {
        Student,
        Course,
        Instructor,
        Course_category,
        Category,
        Cart,
        Feedback,
        Enrollment
    }
} = require('../models');
const bcrypt = require("bcrypt");
const bcryptRound = 10;

class AdminController {
    //DELETE /admin/:studentId
    async deleteAccount(req, res, next) {
        const studentId = req.params.studentId;
        if (studentId) {
            await Student.destroy({
                include: [{
                    model: Instructor,
                }, {
                    model: Enrollment,
                    include: {
                        model: Feedback,
                    }
                }, {
                    model: Cart,
                }],
                where: {
                    student_id: studentId,
                }
            })
            return res.status(200).json({msg: 'Delete account successfully'});
        } else {
            return res.status(200).json({msg: 'Account not found'});
        }
    }

    //DELETE /admin/:courseId
    async deleteCourse(req, res, next) {
        const courseId = req.params.studentId;
        if (courseId) {
            await Course.destroy({
                include: [{
                    model: Enrollment,
                }, {
                    model: Cart,
                }],
                where: {
                    course_id: courseId,
                }
            })
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
}

module.exports = new AdminController();
