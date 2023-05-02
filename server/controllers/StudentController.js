const {models: {Student}} = require('../models/');
const bcrypt = require('bcrypt');

const bcryptRound = 10;

class StudentController {
    async signUp(req, res, next) {
        const {firstname, lastname, email, username, password, phone, birth} = req.body;
        try {
            if (await Student.findOne({where: {username: req.body.username}})) {
                return res.status(200).json({msg: 'Username is already exists'});
            } else if (await Student.findOne({where: {email: req.body.email}})) {
                return res.status(200).json({msg: 'Email is already exists'});
            } else {

                const hashedPw = await bcrypt.hash(password, bcryptRound);
                if (!hashedPw) {
                    throw new Error('Hash Password error');
                }

                await Student.create({
                    first_name: firstname,
                    last_name: lastname,
                    email: email,
                    phone: phone,
                    birthday: birth,
                    username: username,
                    password: hashedPw,
                    registration_date: "2023-04-30",
                })
                    .then((data) => {
                        req.session.student_id = data.student_id;
                        return res.status(201).json({msg: 'Success'});
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
        const student = await Student.findOne({where: {username: req.body.username}});
        try {
            if (!student) {
                return res.status(200).json({msg: 'Invalid username'});
            } else {
                const checkPassword = await bcrypt.compareSync(
                    req.body.password,
                    student.password,
                );
                if (!checkPassword) {
                    return res.status(200).json({msg: 'Invalid password'});
                } else {
                    // req.session.isLogin = true;
                    req.session.student_id = student.student_id;

                    return res.status(200).json({
                        msg: 'Successfully login',
                        userName: student.username,
                        firstName: student.first_name,
                        lastName: student.last_name,
                        cookie: req.headers.cookie,
                    });
                }
            }
        } catch (error) {
            next(error);
        }
    }

    async logOut(req, res, next) {
        //store session cart in DB

        //destroy session
        req.session.destroy((err) => {
            if (err) {
                return res.json({
                    msg: 'Error: Destroy session',
                    redirect: '/',
                });
            }
        });

        res.clearCookie('sid');
        return res.status(201).json({
            msg: 'Logout successful',
            redirect: '/login',
        })
    }
}

module.exports = new StudentController();