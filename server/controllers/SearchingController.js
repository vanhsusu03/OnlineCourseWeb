const {models: {Course, Category, Course_category, Feedback, Enrollment}} = require('../models');
const {Op} = require("sequelize");

class SearchingController {

    async search(req, res, next) {
        let price = req.body.price;
        let sortByPrice = req.body.sortByPrice;
        let categoryFilter = req.body.categoryFilter;
        let rating = req.body.rating;
        let sortByRating = req.body.sortByRating;
        let category = await Category.findAll({
            where: {
                name: {like: '%' + req.body.keyword + '%'},
            }
        });
        if (category) {
            var coursesByCategory = await Course.findAll({
                    include: [{
                        model: Course_category,
                        include: {
                            model: Category,
                            attributes: [sequelize.col('name'), 'categoryName'],
                            where: {
                                name: {[Op.like]: '%' + req.body.keyword.toLowerCase() + '%'},
                            },
                        },
                    }, {
                        model: Enrollment,
                        include: {
                            model: Feedback,
                            attributes: [[sequelize.fn('AVG',
                                sequelize.col('rating')), 'rating']]
                        }
                    }],
                    raw: true,
                    nest: true,
                })
            ;
        }
        let courses = await Course.findAll({
            where:
                {
                    [Op.or]: [
                        {title: {[Op.like]: '%' + req.body.keyword + '%'}},
                        {description: {[Op.like]: '%' + req.body.keyword + '%'}},
                    ]
                },
            include: {
                model: Enrollment,
                include: {
                    model: Feedback,
                    attributes: [[sequelize.fn('AVG',
                        sequelize.col('rating')), 'rating']]
                }
            }
        });
        let result = coursesByCategory.concat(courses);
        if (price) {
            result = result.filter(res => res.price <= price);
        }
        if (rating) {
            result = result.filter(res => res.rating >= rating);
        }
        if (categoryFilter) {
            result = result.filter(res => res.categoryName === categoryFilter);
        }
        if (sortByPrice) {
            result.sort((a, b) => a.price - b.price);
        }
        if (sortByRating) {
            result.sort((a, b) => a.rating - b.rating);
        }
        if (!result) {
            return res.status(200).json('No result');
        } else {
            return res.status(200).json(result);
        }
    }
}


module.exports = new SearchingController();