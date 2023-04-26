const sequelize = require('sequelize');
const {
    models: { Student, Cart, Course },
} = require('../models');

class PaymentController {
    constructor() {
        this.getAmountToPay = this.getAmountToPay.bind(this);
        this.purchase = this.purchase.bind(this);
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

    async getAmountToPay(req, res, next) {
        const ans = await this.getAmountOfID(req.session.studentId);
        return res.status(200).json(ans);
    }

    async purchase(req, res, next) {
        const studentId = req.session.studentId;
        const price = (await this.getAmountOfID(studentId)).dataValues.total_fee;
        const coin = (await Student.findByPk(studentId, {
            attributes: [ 'coin' ]
        })).dataValues.coin;
        
        if (coin < price) {
            return res.status(400).json({
                msg: price - coin
            });
        }
        await Student.update(
            { coin: coin - price },
            {
                where: {
                    student_id: studentId
                },
            },
        );
        await Cart.destroy(
            {
                where: {
                    student_id: studentId
                },
            },
        );
        return res.status(200).json({
            msg: 'Purchase success!'
        });
    }
}

module.exports = new PaymentController();