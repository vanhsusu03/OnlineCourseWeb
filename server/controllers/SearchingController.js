const {models: {Course, Category, Course_category, Feedback, Enrollment}} = require('../models');
const {Op} = require("sequelize");

class SearchingController {

    async search(req, res, next) {
        let price = req.body.price;
        let sortByPrice = req.body.sortByPrice;
        let categoryFilter=req.body.categoryFilter;
        let category = await Category.findAll({
            where: {
                name: {like: '%' + req.body.keyword + '%'},
            }
        });
        if (category) {
            var coursesByCategory = await Course.findAll({
                include: [{model: Course_category},
                    {
                        model: Category,
                        where: {
                            name: {like: '%' + req.body.keyword + '%'},
                        },
                    }],
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
        let temp = result;
        if (!result) {
            return res.status(200).json('No result');
        } else {
            // Filter by price
            if (price) {
                for (let i = 0; i < temp.length; ++i) {
                    if (result[i].course_fee > price) {
                        temp.splice(i, 1);
                    }
                }
            }

            // Filter by category
            if(categoryFilter){
                for (let i=0;i<temp.length;++i){
                    if(temp[i].name!==categoryFilter){
                        temp.splice(i,1);
                    }
                }
            }

            // Sort by price
            if (sortByPrice) {
                temp.sort(function (a, b) {
                    a.course_fee - b.course_fee;
                    }
                );
            }
        }
        return res.status(200).json(temp);
    }
}


module.exports = new SearchingController();