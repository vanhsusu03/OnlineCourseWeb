const sequelize = require('sequelize');
const {models: {Cart, Course, Instructor, Student}} = require('../models');

class CartController {
    constructor() {
        this.addCourse = this.addCourse.bind(this);
    }

    isInCart(cart, id) {
        for (let i = 0; i < cart.length; i++) {
            if (id === cart[i].courseId) {
                return true;
            }
        }
        return false;
    }

    async getInfo(req, res, next) {
        const studentId = req.session.studentId;

        var cart = req.session.cart;

        if (!cart) {
            cart = await Cart.findAll({
                attributes: [
                    [sequelize.col('Course.course_id'), 'courseId'],
                    [sequelize.col('Course.title'), 'courseTitle'],
                    [sequelize.col('Course.description'), 'courseDescription'],
                    [sequelize.col('Course.image'), 'courseImage'],
                    [sequelize.col('Course.course_fee'), 'courseFee'],
                    [sequelize.col('first_name'), 'instructorFirstName'],
                    [sequelize.col('last_name'), 'instructorLastName']
                ],
                where: {
                    student_id: studentId,
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

            var totalPrice = 0;
            for (let i = 0; i < cart.length; i++) {
                totalPrice += cart[i].courseFee;
            }

            req.session.cart = cart;
            req.session.totalPrice = totalPrice;
        }

        return res.status(200).json({
            numberOfCourses: cart.length,
            coursesInCart: cart,
            totalPrice: req.session.totalPrice
        });
    }

    async addCourse(req, res, next) {
        const studentId = req.session.studentId;
        const {
            courseId, courseTitle, courseDescription, courseImage, courseFee,
            instructorFirstName, instructorLastName
        } = req.body;

        var course = {
            courseId, courseTitle, courseDescription, courseImage, courseFee,
            instructorFirstName, instructorLastName
        };
        var cart = req.session.cart;

        if (cart) {
            if (this.isInCart(cart, courseId)) {
                return res.status(400).json({
                    msg: 'The course already exists in the cart!',
                    numberOfCourses: cart.length
                });
            } else {
                cart.push(course);
            }
        } else {
            cart = [course];
        }

        await Cart.create({
            student_id: studentId,
            course_id: courseId
        });

        req.session.cart = cart;
        req.session.totalPrice += courseFee;

        return res.status(200).json({
            msg: 'Add success!',
            numberOfCourses: cart.length
        });
    }

    async removeCourse(req, res, next) {
        const studentId = req.session.studentId;
        const courseId = Number(req.params.courseId);

        var cart = req.session.cart;
        var isRemoved = false;

        for (let i = 0; i < cart.length; i++) {
            if (courseId === cart[i].courseId) {
                await Cart.destroy({
                    where: {
                        student_id: studentId,
                        course_id: courseId
                    }
                });
                req.session.totalPrice -= cart[i].courseFee;
                cart.splice(i, 1);
                isRemoved = true;
                break;
            }
        }

        if (!isRemoved) {
            return res.status(400).json({
                msg: 'Not found!',
                numberOfCourses: cart.length
            });
        } else {
            req.session.cart = cart;
            return res.status(200).json({
                msg: 'Remove success!',
                numberOfCourses: cart.length
            });
        }
    }
}

module.exports = new CartController();