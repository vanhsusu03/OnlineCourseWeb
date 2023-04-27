const sequelize = require('sequelize');
const { models: { Cart, Course } } = require('../models');

class CartController {
    async getInfo(req, res, next) {
        var cart = [];
        if (!req.session.cart) {
        }
    }

    async addCourse(req, res, next) {
        Customer.create({  
            course_id: req.body.course_id,
        });

        return res.status(200).json({
            msg: 'Add success!',
            numberOfCourses: cart.length
        });
    }
}

module.exports = new CartController();