const { models: { Student } } = require('../models/');
const bcrypt = require('bcrypt');
const session = require('express-session');
const bcryptRound = 10;

class StudentController {


    async signUp(req, res, next) {
        const { firstname, lastname, email, username, password, phone, birth } = req.body;
        try {
            if (await Student.findOne({ where: { username: req.body.username } })) {
                return res.status(200).json({ msg: 'Username is already exists' });
            } else if (await Student.findOne({ where: { email: req.body.email } })) {
                return res.status(200).json({ msg: 'Email is already exists' });
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
                        req.session.studentId = data.student_id;
                        return res.status(201).json({ msg: 'Success' });
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
        console.log(req.session);
        try {
            if (!student) {
                return res.status(200).json({ msg: 'Invalid username' });
            } else {
                const checkPassword = await bcrypt.compareSync(
                    req.body.password,
                    student.password,
                );
                if (!checkPassword) {
                    return res.status(200).json({ msg: 'Invalid password' });
                } else {
                    req.session.isLogin = true;
                    req.session.studentId = student.student_id;
                    console.log(req.session);
                    return res.status(200).json({
                        msg: 'Successfully login',
                        redirect: '/account/info',
                        userName: student.username,
                        firstName: student.first_name,
                        lastName: student.last_name,
                        image: student.image,
                        email: student.email,
                        phone: student.phone,
                        birth: student.birthday,
                        cookie: req.headers.cookie,
                    });
                }
            }
        }
        catch (error) {
            next(error);
        }
    }

    async logOut(req, res, next) {
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
    // [GET] /info
    async getInfo(req, res, next) {
        // check whether or not login
        console.log(req.session);
        let id = req.session.studentId;
        console.log(id);
        const student = await Student.findOne({ where: { student_id: id } });
        return res.status(200).json({
            student_id: student.student_id,
            username: student.username,
            email: student.email,
            phone: student.phone,
            firstname: student.first_name,
            lastname: student.last_name,
            birthday: student.birthday,
        });
    }

    async updateInfo(req, res, next) {
        const { username, email, firstname, lastname, phone, birth } = req.body;
        try {

            // const student = await Student.findOne({ where: {username: username}});
            // if (student && student.student_id != req.session.studentId) {
            //     return res.status(201).json({
            //         msg: 'Username is already exists',
            //     })
            // }

            // const student1 = await Student.findOne({ where: {email: email}});
            // if (student1 && student.student_id != req.session.studentId) {
            //     return res.status(201).json({
            //         msg: 'Email is already exists',
            //     })
            // }

            // const student2 = await Student.findOne({ where: {phone: phone}});
            // if (student2 && student.student_id != req.session.studentId) {
            //     return res.status(201).json({
            //         msg: 'Phone number is already exists',
            //     })
            // }

            await Student.update(
                {
                    username: username,
                    email: email,
                    first_name: firstname,
                    last_name: lastname,
                    phone: phone,
                    birthday: birth,
                },
                {
                    where: { student_id: req.session.studentId },
                }
            )
                .then((data) => {
                    console.log(data);
                })
                .catch((err) => {
                    console.log(err);
                    next(err);
                });

            return res.status(200).json({
                msg: 'Update info successful',
            })
        } catch (err) {
            next(err);
        }
    }

    async changePassword(req, res, next) {
        const { curPass, newPass } = req.body;

        if (!curPass && !newPass) {
            return res.status(200).json({
                msg: 'Bad request',
            });
        } else {
            if (curPass === newPass) {
                return res.status(200).json({
                    msg: 'New password and current password must not be the same',
                });
            }

            const getPass = await Student.findOne({
                attributes: ['password'],
                where: {
                    student_id: req.session.studentId,
                },
            });
            const checkCurPass = await bcrypt.compareSync(curPass, getPass.password);

            if (!checkCurPass) {
                return res.status(200).json({
                    msg: 'Current password is not correct',
                })
            }

            const hashPass = await bcrypt.hash(newPass, bcryptRound);
            if (!hashPass) {
                throw new Error('Error hashing password');
            }

            await Student.update(
                {
                    password: hashPass,
                },
                {
                    where: { student_id: req.session.studentId },
                }
            )
                .then((data) => {
                    console.log(data);
                    return res.status(200).json({
                        msg: 'Change pass successful',
                    });
                })
                .catch((err) => {
                    console.log(err);
                    next(err);
                })
        }
    }
}

module.exports = new StudentController();