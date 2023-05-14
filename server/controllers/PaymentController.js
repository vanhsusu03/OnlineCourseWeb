const sequelize = require('sequelize');
const { format } = require('date-fns');
const {
    models: { Student, Cart, Enrollment, Progress, Payment, Order, Order_detail },
} = require('../models');

class PaymentController {
    constructor() {
        this.purchaseWithoutCart = this.purchaseWithoutCart.bind(this);
        this.purchaseWithCart = this.purchaseWithCart.bind(this);
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

    async updDatabaseAfterBuyACrouse(orderId, studentId, courseId, courseFee) {
        const orderDetail = await Order_detail.create({
            order_id: orderId,
            course_id: courseId
        });

        await Payment.create({
            order_detail_id: orderDetail.order_detail_id,
            amount: courseFee
        });

        const now = new Date();
        const vietnamDate = format(now, 'yyyy-MM-dd', { timeZone: 'Asia/Ho_Chi_Minh' });
        const enrollment = await Enrollment.create({  
            student_id: studentId,
            course_id: courseId,
            enrollment_date: vietnamDate
        });

        await Progress.create({
            enrollment_id: enrollment.enrollment_id,
        });
    }

    async getCoinOfStudent(req, res, next) {
        // if (typeof req.session.coin === 'undefined') {
            req.session.coin = (await Student.findByPk(req.session.studentId,
                { attributes: [ 'coin' ] }
            )).dataValues.coin;
        // }

        return res.status(200).json({
            coinOfStudent: req.session.coin
        });
    }

    async purchaseWithoutCart(req, res, next) {
        const courseId = req.body.courseId;
        const courseFee = req.body.courseFee;
        const studentId = req.session.studentId;
        
        var coin = req.session.coin;

        if (coin < courseFee) {
            return res.status(400).json({
                msg: 'Not enough coin!',
                coinShortage: courseFee - coin
            });
        }

        coin -= courseFee;
        await this.updateCoin(studentId, coin);
        req.session.coin = coin;

        const now = new Date();
        const vietnamTime = format(now, 'yyyy-MM-dd HH:mm:ss', { timeZone: 'Asia/Ho_Chi_Minh' });
        const order = await Order.create({
            customer_id: studentId,
            order_time: vietnamTime
        });
        await this.updDatabaseAfterBuyACrouse(order.order_id, studentId, courseId, courseFee);

        return res.status(200).json({
            msg: 'Purchase success!',
            coinOfStudent: req.session.coin
        });
    }

    async purchaseWithCart(req, res, next) {
        const savingCourseIds = req.body;
        
        const studentId = req.session.studentId;
        const cart = req.session.cart;

        var coin = req.session.coin;

        var boughtCourses = [];
        var totalPrice = 0;
        var finalCart = [];

        for (let i = 0; i < cart.length; i++) {
            var isBought = true;
            for (let j = 0; j < savingCourseIds.length; j++) {
                if (savingCourseIds[j] == cart[i].courseId) {
                    isBought = false;
                    break;
                }
            }
            if (isBought) {
                boughtCourses.push({
                    courseId: cart[i].courseId,
                    courseFee: cart[i].courseFee
                });
                totalPrice += cart[i].courseFee;
            } else {
                finalCart.push(cart[i]);
            }
        }
        
        if (coin < totalPrice) {
            return res.status(400).json({
                msg: 'Not enough coin!',
                coinShortage: totalPrice - coin
            });
        }

        coin -= totalPrice;
        await this.updateCoin(studentId, coin);
        req.session.coin = coin;

        const now = new Date();
        const vietnamTime = format(now, 'yyyy-MM-dd HH:mm:ss', { timeZone: 'Asia/Ho_Chi_Minh' });
        const order = await Order.create({
            customer_id: studentId,
            order_time: vietnamTime
        });
        for (let i = 0; i < boughtCourses.length; i++) {
            await this.updDatabaseAfterBuyACrouse(order.order_id, studentId,
                boughtCourses[i].courseId, boughtCourses[i].courseFee);
        }

        const courseIds = boughtCourses.map(course => course.courseId);
        await Cart.destroy(
            {
                where: {
                    student_id: studentId,
                    course_id: courseIds 
                },
            },
        );

        req.session.cart = finalCart;
        req.session.totalPrice -= totalPrice;

        return res.status(200).json({
            msg: 'Purchase success!',
            coinOfStudent: req.session.coin
        });
    }
}

module.exports = new PaymentController();