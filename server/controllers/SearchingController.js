const {models: {Course, Category, Course_category, Feedback, Enrollment, Instructor, Student}} = require('../models');
const {Op} = require("sequelize");
const sequelize = require('sequelize');

class SearchingController {

    //{GET} - '/searching/:text' 
    async search(req, res, next) {
        console.log(req.params.keyw);
        let keyword = req.params.keyw;
        let price = req.params.price;
        let sortByPrice = req.params.sortByPrice;
        let categoryFilter = req.params.categoryFilter;
        let rating = req.params.rating;
        let sortByRating = req.params.sortByRating;
        let category = await Category.findAll({
            where: {
                name: {[Op.like]: '%' + keyword + '%'},
            }
        });
        
        if (category) {
            // var coursesByCategory = await Course.findAll({
            //         attributes: [
            //             ['course_id', 'courseId'],
            //             [sequelize.col('title'), 'courseTitle'],
            //             [sequelize.col('description'), 'courseDescription'],
            //             ['image', 'courseImage'],
            //             [sequelize.col('course_fee'), 'courseFee'],
            //             [sequelize.col('first_name'), 'instructorFirstName'],
            //             [sequelize.col('last_name'), 'instructorLastName'],
            //             [sequelize.col('name'), 'categoryName'],
            //             // [sequelize.fn('AVG', sequelize.col('rating')), 'rating']
            //         ],
            //         // where: {
            //         //     Category.name: {[Op.like]: '%' + keyword + '%'},
            //         // },
            //         include: [{
            //             model: Course_category,
            //             attributes: [],
            //             include: {
            //                 model: Category,
            //                 attributes: [],
            //                 where: {
            //                     name: {[Op.like]: '%' + keyword + '%'},
            //                 },
            //             },
            //         }, {
            //             model: Enrollment,
            //             include: {
            //                 model: Feedback,
            //                 attributes: []
            //             }
            //         }, {
            //             model: Instructor,
            //             attributes: [],
            //             required: true,
            //             include: {
            //                 model: Student,
            //                 attributes: [],
            //                 required: true,
            //             }
            //         }],
            //         raw: true,
            //         nest: true,
            //     })
            // ;
            var coursesByCategory = await Course.findAll({
                attributes: [
                    ['course_id', 'courseId'],
                    [sequelize.col('title'), 'courseTitle'],
                    [sequelize.col('description'), 'courseDescription'],
                    ['image', 'courseImage'],
                    [sequelize.col('course_fee'), 'courseFee'],
                    [sequelize.col('first_name'), 'instructorFirstName'],
                    [sequelize.col('last_name'), 'instructorLastName'],
                    [sequelize.col('name'), 'categoryName'],
                    // [sequelize.fn('AVG', sequelize.col('rating')), 'rating']
                ],
                include: [{
                    model: Category,
                    attributes: [],
                    where: {
                            name: {[Op.like]: '%' + keyword + '%'},
                    },
                    through: {attributes: []}
                }, {
                    model: Enrollment,
                    include: {
                        model: Feedback,
                        attributes: []
                    }
                }, {
                    model: Instructor,
                    attributes: [],
                    required: true,
                    include: {
                        model: Student,
                        attributes: [],
                        required: true,
                    }
                }],
                raw: true,
                nest: true,
            })
        ;
    
           
        }
        let courses = await Course.findAll({
            attributes: [
                ['course_id', 'courseId'],
                [sequelize.col('title'), 'courseTitle'],
                [sequelize.col('description'), 'courseDescription'],
                ['image', 'courseImage'],
                [sequelize.col('course_fee'), 'courseFee'],
                [sequelize.col('first_name'), 'instructorFirstName'],
                [sequelize.col('last_name'), 'instructorLastName'],
                // [sequelize.fn('AVG', sequelize.col('rating')), 'rating']
            ],
            where:
                {
                    [Op.or]: [
                        {title: {[Op.like]: '%' + keyword + '%'}},
                        {description: {[Op.like]: '%' + keyword + '%'}},
                    ]
                },
            include: [{
                model: Enrollment,
                include: {
                    model: Feedback,
                    attributes: []
                }
            }, {
                model: Instructor,
                attributes: [],
                required: true,
                include: {
                    model: Student,
                    attributes: [],
                    required: true,
                }
            }]
        });
        let result = coursesByCategory.concat(courses);
        // .concat(courses);
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
            return res.status(200).json({
                number: result.length,
                result,
            });
        }
    }
}


module.exports = new SearchingController();