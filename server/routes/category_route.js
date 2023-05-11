const express = require('express');
const categoryController = require('../controllers/CategoryController');
const router =express.Router();

router.get('/categories',categoryController.showAllCategories);

module.exports = router;