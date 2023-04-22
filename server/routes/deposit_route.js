const express = require('express');
const depositController = require('../controllers/DepositController');
const { isAuth } = require('../middleware/Authentication');
const router = express.Router();

router.get('/dddddd', isAuth, depositController.getTransferInfo);
router.post('/ddddd', isAuth, depositController.createTransaction);

module.exports = router;