const sequelize = require('sequelize');
const {
    models: { Deposit }
} = require('../models');
const payOS = require('../utils/payos')

class DepositController {
    async getDeposits(req, res, next) {
        let result = await Deposit.findAll();
        return res.status(200).json(result)
    }
    //POST
    async createDeposit(req, res, next) {
        const { orderCode,description, returnUrl, cancelUrl, amount } = req.body;
        const body = {
            orderCode,
            amount,
            description,
            cancelUrl,
            returnUrl
        };
        try {
            const paymentLinkRes = await payOS.createPaymentLink(body);

            return res.json({
                error: 0,
                message: "Success",
                data: {
                    bin: paymentLinkRes.bin,
                    checkoutUrl: paymentLinkRes.checkoutUrl,
                    accountNumber: paymentLinkRes.accountNumber,
                    accountName: paymentLinkRes.accountName,
                    amount: paymentLinkRes.amount,
                    description: paymentLinkRes.description,
                    orderCode: paymentLinkRes.orderCode,
                    qrCode: paymentLinkRes.qrCode,
                },
            });
        } catch (error) {
            console.log(error);
            return res.json({
                error: -1,
                message: "create fail!!",
                data: null,
            });
        }
    }

    //GET
    async getDepositLinkInfo(req, res, next) {
        try {
            const order = await payOS.getPaymentLinkInformation(req.params.orderId);
            if (!order) {
                return res.json({
                    error: -1,
                    message: "getDipositLinkInfo failed",
                    data: null,
                });
            }
            return res.json({
                error: 0,
                message: "getDepositLinkInfo ok",
                data: order,
            });
        } catch (error) {
            console.log(error);
            return res.json({
                error: -1,
                message: "getDepositLinkInfo failed",
                data: null,
            });
        }
    }

    //PUT
    async cancelPaymentLink(req, res, next) {
        try {
            const { orderId } = req.params;
            const body = req.body;
            const order = await payOS.cancelPaymentLink(orderId, body.cancellationReason);
            if (!order) {
                return res.json({
                    error: -1,
                    message: "failed",
                    data: null,
                });
            }
            return res.json({
                error: 0,
                message: "ok",
                data: order,
            });
        } catch (error) {
            console.error(error);
            return res.json({
                error: -1,
                message: "failed",
                data: null,
            });
        }
    }

    //POST
    async confirmWebHook(req, res, next) {
        const { webhookUrl } = req.body;
        try {
            await payOS.confirmWebhook(webhookUrl);
            return res.json({
                error: 0,
                message: "ok",
                data: null,
            });
        } catch (error) {
            console.error(error);
            return res.json({
                error: -1,
                message: "failed",
                data: null,
            });
        }
    }

    //POST
    async depositHandler(req, res, next) {
        console.log("payment handler");
        const webhookData = payOS.verifyPaymentWebhookData(req.body);

        if (
            ["Ma giao dich thu nghiem", "VQRIO123"].includes(webhookData.description)
        ) {
            return res.json({
                error: 0,
                message: "Ok",
                data: webhookData
            });
        }

        // Source code uses webhook data

        return res.json({
            error: 0,
            message: "Ok",
            data: webhookData
        });
    }

}

module.exports = new DepositController();