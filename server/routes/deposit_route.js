const express = require('express');
const depositController = require('../controllers/DepositController');
const router = express.Router();
const {isAdmin} = require('../middleware/Authentication');


router.get('/deposits',isAdmin, depositController.getDeposits);

module.exports = router;