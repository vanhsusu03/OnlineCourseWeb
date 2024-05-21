const express = require('express');
const depositController = require('../controllers/DepositController');
const router = express.Router();
const {isAdmin} = require('../middleware/Authentication');
const { de } = require('date-fns/locale');


router.get('/deposits',isAdmin, depositController.getDeposits);

router.post('/deposit/create', depositController.createDeposit)

router.get('/deposit/getlink/:orderId', depositController.getDepositLinkInfo)

router.put('/deposit/cancelDepodit/:orderId', depositController.cancelPaymentLink)

router.post('/deposit/confirm/web-hook', depositController.confirmWebHook)

router.post('/deposit/handler', depositController.depositHandler)

module.exports = router;