const sequelize = require('sequelize');
const { models: { Cart, Course, Instructor, Student } } = require('../models');

class CartController {
    async getInfo(req, res, next) {
        req.session.studentId = 2;
        if (!req.session.cart) {
            const cart = await Cart.findAll({
                attributes: [
                    [sequelize.col('Course.title'), 'courseTitle'],
                    [sequelize.col('Course.description'), 'courseDescription'],
                    [sequelize.col('Course.image'), 'courseImage'],
                    [sequelize.col('Course.course_fee'), 'courseFee'],
                    [sequelize.col('first_name'), 'instructorFirstName'],
                    [sequelize.col('last_name'), 'instructorLastName']
                ],
                where: {
                    student_id: req.session.studentId,
                },
                include: {
                    model: Course,
                    attributes: [],
                    required: true,
                    include: {
                        model: Instructor,
                        attributes: [],
                        required: true,
                        include: {
                            model: Student,
                            attributes: [],
                            required: true
                        }
                    }
                },
                raw: true,
                nest: true,
            });
            req.session.cart = cart;
        }
        
        var cart = req.session.cart;
        var totalPrice = 0;
        for (let i = 0; i < cart.length; i++) {
            totalPrice += cart[i].courseFee;
        }

        req.session.totalPrice = totalPrice;

        return res.status(200).json({
            numberOfCourses: cart.length,
            coursesInCart: cart,
            totalPrice: totalPrice
        });
    }
}

module.exports = new CartController();