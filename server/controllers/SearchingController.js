const {models: {Course}} = require('../models');
const {models: {Student}} = require('../models');
const {Op} = require("sequelize");

class SearchingController {
    async search(req, res, next) {
        let courses = await Course.findAll({
            where:
                {
                    [Op.or]: [
                        {title: {like: '%' + req.body.input + '%'}},
                        {description: {like: '%' + req.body.input + '%'}},
                    ]
                }
        });
        if (!courses) {
            return res.status(200).json('No results');
        } else {
            return res.status(200).json(courses);
        }
    }
}

module.exports = new SearchingController();