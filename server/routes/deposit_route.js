const express = require('express');
const depositController = require('../controllers/DepositController');
const router = express.Router();

router.get('/money/bank/info', depositController.getTransferInfo);

module.exports = router;