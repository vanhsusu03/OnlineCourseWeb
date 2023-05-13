const sequelize = require('sequelize');
const {
    models: { Deposit } 
} = require('../models');


class DepositController {
    async getDeposits(req, res, next) {
        let result = await Deposit.findAll();
        return res.status(200).json(result)
    }

}

module.exports = new DepositController();