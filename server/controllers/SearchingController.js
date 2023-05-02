const {models: {Course, Category, Course_category}} = require('../models');
const {Op} = require("sequelize");

class SearchingController {

    async search(req, res, next) {
        let category = await Category.findAll({
            where: {
                name: {like: '%' + req.body.keyword + '%'},
            }
        });
        if (category) {
            var coursesByCategory = await Course.findAll({
                where: {
                    name: {like: '%' + req.body.keyword + '%'},
                },
                include: {
                    model: Course,
                    attributes: [],
                    required: true,
                    include: {
                        model: Course_category,
                        attributes: [],
                        required: true,
                        include: {
                            model: Category,
                            attributes: [],
                            required: true,
                        }
                    },
                },
                raw: true,
                nest: true,
            });
        }
        let courses = await Course.findAll({
            where:
                {
                    [Op.or]: [
                        {title: {like: '%' + req.body.keyword + '%'}},
                        {description: {like: '%' + req.body.keyword + '%'}},
                    ]
                }
        });
        let result = coursesByCategory.concat(courses);
        if (!result) {
            return res.status(200).json('No result');
        } else {
            return res.status(200).json(result);
        }
    }
}

module.exports = new SearchingController();