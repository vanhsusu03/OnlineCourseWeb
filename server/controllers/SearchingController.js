const {models: {Course, Category, Course_category, Feedback, Enrollment}} = require('../models');
const {Op} = require("sequelize");
const sequelize = require('sequelize');

class SearchingController {

    async search(req, res, next) {
        console.log(req.params);
        // let price = req.query.price;
        // let sortByPrice = req.query.sortByPrice;
        // let categoryFilter = req.query.categoryFilter;
        // let rating = req.query.rating;
        // let sortByRating = req.query.sortByRating;
        // let category = await Category.findAll({
        //     where: {
        //         name: {[Op.like]: '%' + req.query.searching + '%'},`
        //     }
        // });
        // if (category) {
        //     var coursesByCategory = await Course.findAll({
        //             include: [{
        //                 model: Course_category,
        //                 include: {
        //                     model: Category,
        //                     attributes: [sequelize.col('name'), 'categoryName'],
        //                     where: {
        //                         name: {[Op.like]: '%' + req.query.searching.toLowerCase() + '%'},
        //                     },
        //                 },
        //             }, {
        //                 model: Enrollment,
        //                 include: {
        //                     model: Feedback,
        //                     attributes: [[sequelize.fn('AVG',
        //                         sequelize.col('rating')), 'rating']]
        //                 }
        //             }],
        //             raw: true,
        //             nest: true,
        //         })
        //     ;
        // }
        // let courses = await Course.findAll({
        //     where:
        //         {
        //             [Op.or]: [
        //                 {title: {[Op.like]: '%' + req.body.searching + '%'}},
        //                 {description: {[Op.like]: '%' + req.body.searching + '%'}},
        //             ]
        //         },
        //     include: {
        //         model: Enrollment,
        //         include: {
        //             model: Feedback,
        //             attributes: [[sequelize.fn('AVG',
        //                 sequelize.col('rating')), 'rating']]
        //         }
        //     }
        // });
        // let result = coursesByCategory.concat(courses);
        // if (price) {
        //     result = result.filter(res => res.price <= price);
        // }
        // if (rating) {
        //     result = result.filter(res => res.rating >= rating);
        // }
        // if (categoryFilter) {
        //     result = result.filter(res => res.categoryName === categoryFilter);
        // }
        // if (sortByPrice) {
        //     result.sort((a, b) => a.price - b.price);
        // }
        // if (sortByRating) {
        //     result.sort((a, b) => a.rating - b.rating);
        // }
        // if (!result) {
        //     return res.status(200).json('No result');
        // } else {
        //     // return res.status(200).json(result);
        //     console.log(req.query.searching);
    }
}


module.exports = new SearchingController();