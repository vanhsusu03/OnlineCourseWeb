const sequelize = require('sequelize');
const moment = require('moment-timezone');
const {
    models: { Student, Cart, Course, Enrollment, Progress, Payment, Order, Order_detail },
} = require('../models');

class PaymentController {
    constructor() {
        this.getAmountToPay = this.getAmountToPay.bind(this);
        this.purchaseWithoutCart = this.purchaseWithoutCart.bind(this);
        this.purchaseFromCart = this.purchaseFromCart.bind(this);
    }

    async getAmountOfID(id) {
        const ans = await Cart.findAll({
            where: { student_id: id },
            attributes: [
                [sequelize.fn('sum', sequelize.col('course.course_fee')), 'total_fee']
            ],
            include: [{
                model: Course,
                attributes: []
            }],
            group: ['cart.student_id']
        });
        return ans[0];
    }

    async getCoinOfStudent(id) {
        const coin = await Student.findByPk(id, {
            attributes: [ 'coin' ]
        });
        return coin;
    }

    async updateCoin(id, value) {
        await Student.update(
            { coin: value },
            {
                where: {
                    student_id: id
                },
            },
        );
    }

    async updDatabaseAfterBuyACrouse(studentId, courseId) {
        const now = moment().tz('Asia/Hanoi');

        const orderId = await Order.findOne({
            order: [[ 'createdAt', 'DESC' ]],
            attributes: ['order_id']
        }).dataValues.order_id;
        await Order_detail.create({
            order_id: orderId,
            course_id: courseId
        });

        const orderDetailId = await Order_detail.findOne({
            order: [[ 'createdAt', 'DESC' ]],
            attributes: ['order_detail_id']
        }).dataValues.order_detail_id;
        const price = (await Course.findByPk(courseId, {
            attributes: [ 'course_fee' ]
        })).dataValues.course_fee;
        await Payment.create({
            order_detail_id: orderDetailId,
            amount: price,
            payment_time: now.format('YYYY-MM-DD HH:mm:ss')
        });

        await Enrollment.create({  
            student_id: studentId,
            course_id: courseId,
            enrollment_date: now.format('YYYY-MM-DD')
        });

        const enrollmentId = await Enrollment.findOne({
            order: [[ 'createdAt', 'DESC' ]],
            attributes: ['enrollment_id']
        }).dataValues.enrollment_id;
        await Progress.create({  
            enrollment_id: enrollmentId,
        });
    }

    async getAmountToPay(req, res, next) {
        const ans = await this.getAmountOfID(req.session.studentId);
        return res.status(200).json(ans);
    }

    async purchaseWithoutCart(req, res, next) {
        const studentId = req.session.studentId;
        const courseId = req.body.courseId;

        const coin = (await this.getCoinOfStudent(studentId)).dataValues.coin;
        const price = (await Course.findByPk(courseId, {
            attributes: [ 'course_fee' ]
        })).dataValues.course_fee;

        if (coin < price) {
            return res.status(400).json({
                msg: price - coin
            });
        }

        await this.updateCoin(studentId, coin - price);
        await Order.create({
            customer_id: studentId
        });
        await this.updDatabaseAfterBuyACrouse(studentId, courseId);

        return res.status(200).json({
            msg: 'Purchase success!'
        });
    }

    async purchaseFromCart(req, res, next) {
        const studentId = req.session.studentId;
        const cart = req.session.cart;

        const coin = (await this.getCoinOfStudent(studentId)).dataValues.coin;
        const price = (await this.getAmountOfID(studentId)).dataValues.total_fee;
        
        if (coin < price) {
            return res.status(400).json({
                msg: price - coin
            });
        }

        await this.updateCoin(studentId, coin - price);
        await Order.create({  
            customer_id: studentId
        });
        for (let i = 0; i < cart.length; i++) {
            await this.updDatabaseAfterBuyACrouse(studentId, cart[i].courseId);
        }

        await Cart.destroy(
            {
                where: {
                    student_id: studentId
                },
            },
        );
        req.session.cart = [];

        return res.status(200).json({
            msg: 'Purchase success!'
        });
    }
}

module.exports = new PaymentController();