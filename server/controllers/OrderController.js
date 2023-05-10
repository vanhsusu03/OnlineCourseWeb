const sequelize = require('sequelize');
const {
    models: { Order, Order_detail, Payment, Course, Instructor, Student } 
} = require('../models');

class OrderController {
    async getByStudent(req, res, next) {
        const studentId = req.session.studentId;
        const orders = await Order.findAll({
            attributes: [ 
                [sequelize.col('Order.order_id'), 'orderId'],
                [sequelize.fn('CONVERT_TZ', sequelize.col('Order.order_time'), '+00:00', '+07:00'), 'orderTime']
            ],
            include: {
                model: Order_detail,
                attributes: [ [sequelize.col('order_detail_id'), 'orderDetailId'] ],
                include: [
                {
                    model: Payment,
                    attributes: [ 'amount' ]
                },
                {
                    model: Course,
                    attributes: [
                        [sequelize.col('course_id'), 'courseId'],
                        [sequelize.col('title'), 'courseTitle'],
                        [sequelize.col('description'), 'courseDescription'],
                        [sequelize.col('image'), 'courseImage'],
                        [sequelize.col('release_date'), 'courseReleaseDate'],
                        [sequelize.col('is_closed'), 'isCourseClosed']
                    ],
                    include: {
                        model: Instructor,
                        attributes: [ [sequelize.col('instructor_id'), 'instructorId'] ],
                        include: {
                            model: Student,
                            attributes: [
                                [sequelize.col('first_name'), 'instructorFirstName'],
                                [sequelize.col('last_name'), 'instructorLastName']
                            ]
                        }
                    }
                }]
            },
            where: { 
                customer_id: studentId 
            },
        });

        if (orders.length > 0) {
            return res.status(200).json({
                numberOfOrders: orders.length,
                orders: orders
            });
        } else {
            return res.status(200).json({
                msg: "You haven't purchased any courses yet!"
            });
        }
    }

    async getOrders(req, res, next) {
        const orders = await Order.findAll({
            attributes: [ 
                [sequelize.col('Order.order_id'), 'orderId'],
                [sequelize.col('Order.customer_id'), 'studentId'],
                [sequelize.col('Student.first_name'), 'studentFirstName'],
                [sequelize.col('Student.last_name'), 'studentLastName'],
                [sequelize.col('Student.username'), 'studentUsername'],
                [sequelize.col('Student.email'), 'studentEmail'],
                [sequelize.col('Student.phone'), 'studentPhone'],
                [sequelize.col('Student.image'), 'studentImage'],
                [sequelize.fn('CONVERT_TZ', sequelize.col('Order.order_time'), '+00:00', '+07:00'), 'orderTime']
            ],
            include: [{
                model: Order_detail,
                attributes: [ [sequelize.col('order_detail_id'), 'orderDetailId'] ],
                include: [
                {
                    model: Payment,
                    attributes: [ 'amount' ]
                },
                {
                    model: Course,
                    attributes: [
                        [sequelize.col('course_id'), 'courseId'],
                        [sequelize.col('title'), 'courseTitle'],
                        [sequelize.col('description'), 'courseDescription'],
                        [sequelize.col('image'), 'courseImage'],
                        [sequelize.col('release_date'), 'courseReleaseDate'],
                        [sequelize.col('is_closed'), 'isCourseClosed']
                    ],
                    include: {
                        model: Instructor,
                        attributes: [ [sequelize.col('instructor_id'), 'instructorId'] ],
                        include: {
                            model: Student,
                            attributes: [
                                [sequelize.col('first_name'), 'instructorFirstName'],
                                [sequelize.col('last_name'), 'instructorLastName']
                            ]
                        }
                    }
                }]
            },{
                model: Student,
                attributes: []
            }
            ]
        });

        return res.status(200).json({
            numberOfOrders: orders.length,
            orders: orders
        });
    }
}

module.exports = new OrderController();