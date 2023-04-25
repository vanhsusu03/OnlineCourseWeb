const {models: {Course}} = require('../models');
const {models: {Student}} = require('../models');

class SearchingController {
    async search(req, res, next) {
        let courses = await Course.findAll({
            where:
                {
                    $or: [
                        {title: {like: '%' + req.body.input + '%'}},
                        {description: {like: '%' + req.body.input + '%'}},
                    ]
                }
        });
        if (!courses) {
            res.status(200).json('No results');
        } else {
            res.status(200).json(courses);
        }
    }
}

module.exports = new SearchingController();
