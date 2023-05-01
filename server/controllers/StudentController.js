const { models: { Student } } = require('../models/');

class StudentController {
    async signUp(req, res, next) {
        const { firstname, lastname, email, username, password, phone, birth } = req.body;
        try {
            if (await Student.findOne({ where: { username: req.body.username } })) {
                return res.status(200).json({ msg: 'Username is already exists' });
            } else if (await Student.findOne({ where: { email: req.body.email } })) {
                return res.status(200).json({ msg: 'Email is already exists' });
            } else {
                // Need hash password
                await Student.create({
                    first_name: firstname,
                    last_name: lastname,
                    email: email,
                    phone: phone,
                    birthday: birth,
                    username: username,
                    password: password,
                    registration_date: "2023-04-30",
                })
                    .then((data) => {
                        req.session.student_id = data.student_id;
                        return res.status(200).json({ msg: 'Success' });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        } catch (error) {
            next(error);
        }
    }

    async logIn(req, res, next) {
        const student = await Student.findOne({ where: { username: req.body.username } });
        try {
            if (!student) {
                return res.status(200).json({ msg: 'Invalid username' });
            } else if (student.password !== req.body.password) {
                return res.status(200).json({ msg: 'Invalid password' });
            } else {
                // req.session.isLogin = true;
                req.session.student_id = student.student_id;

                return res.status(200).json({
                    msg: 'Successfully login',
                    redirect: '/info',
                    userName: student.username,
                    firstName: student.first_name,
                    lastName: student.last_name,
                    cookie: req.headers.cookie,
                });
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new StudentController();