const sequelize = require('sequelize');
const {
    models: { Order, Order_detail, Payment, Course, Instructor, Student } 
} = require('../models');

class OrderController {
    async getByStudent(req, res, next) {
        req.session.studentId = 1;
        const studentId = req.session.studentId;
        const orders = await Order.findAll({
            attributes: [ [sequelize.col('Order.order_id'), 'orderId'] ],
            include: {
                model: Order_detail,
                attributes: [ [sequelize.col('order_detail_id'), 'orderDetailId'] ],
                include: [{
                    model: Payment,
                    attributes: [ 
                        'amount',
                        [sequelize.col('payment_time'), 'paymentTime']
                    ]
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
                                [sequelize.fn('concat', sequelize.col('first_name'), ' ',
                                sequelize.col('last_name')), 'instructorFullName']
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
                msg: 'Your order is empty!'
            });
        }
    }
}

module.exports = new OrderController();