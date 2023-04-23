const { models: { Student } } = require('../models/');

class StudentController {
    async saaaaa(req, res, next) {
        console.log(111)
    }
    async register(req, res, next) {
        console.log(req.body.phone);
        const { firstname, lastname, email, username, password, phone, birth } = req.body;
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
        }).then((data) => {      
        }).catch((err) => {
        });
    }
}

module.exports = new StudentController();