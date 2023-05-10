const sequelize = require('sequelize');
const {models:{Category}}=require('../models');

class CategoryController{

    //GET /categories
    async showAllCategories(req,res,next){
        return res.status(200).json(await Category.findAll());
    }
}

module.exports = new CategoryController();