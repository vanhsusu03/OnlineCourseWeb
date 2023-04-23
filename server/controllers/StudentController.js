const {models: {Student}} = require('../models/');

class StudentController {
    async signUp(req, res, next) {
        const {firstname, lastname, email, username, password, phone, birth} = req.body;
        if (await Student.findOne({where: {username: req.body.username}})) {
            res.status(401).json({error: 'Username is already exists'});
        } else if (await Student.findOne({where: {email: req.body.email}})) {
            res.status(401).json({error: 'Email is already exists'});
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
                registration_date: "1111-11-11",
            })
                .then((data) => {
                })
                .catch((err) => {
                });
        }
    }

    async logIn(req, res, next) {
        const student = await Student.findOne({where: {username: req.body.username}});
        if (student) {
            const password_valid = (student.password===req.body.password);
            if (password_valid) {
                res.status(200).json(req.body);
            } else {
                res.status(400).json({error: "Invalid password"});
            }

        } else {
            res.status(404).json({error: "Invalid user"});
        }
    }
}

module.exports = new StudentController();