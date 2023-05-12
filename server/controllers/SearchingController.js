const { models: { Course, Category, Course_category, Feedback, Enrollment, Instructor, Student } } = require('../models');
const { Op } = require("sequelize");
const sequelize = require('sequelize');



class SearchingController {

    //{GET} - '/searching/:text' 
    async search(req, res, next) {
        let keyword = req.params.keyw;
        console.log(keyword);
        let category = await Category.findAll({
            where: {
                name: { [Op.like]: '%' + keyword + '%' },
            }
        });

        if (category) {
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
                        name: { [Op.like]: '%' + keyword + '%' },
                    },
                    through: { attributes: [] }
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
        var courses = await Course.findAll({
            attributes: [
                ['course_id', 'courseId'],
                [sequelize.col('title'), 'courseTitle'],
                [sequelize.col('description'), 'courseDescription'],
                ['image', 'courseImage'],
                [sequelize.col('course_fee'), 'courseFee'],
                [sequelize.col('first_name'), 'instructorFirstName'],
                [sequelize.col('last_name'), 'instructorLastName'],
            ],
            where:
            {
                [Op.or]: [
                    { title: { [Op.like]: '%' + keyword + '%' } },
                    { description: { [Op.like]: '%' + keyword + '%' } },
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
            }],
            raw: true,
            nest: true,
        });
        let result = coursesByCategory.concat(courses);
        result = result.filter((obj, index, self) =>
            index === self.findIndex((o) =>
                o.courseId === obj.courseId
            )
        );
        if (!result) {
            return res.status(200).json('No result');
        } else {
            // console.log(result);
            return res.status(200).json({
                number: result.length,
                result,
            });
        }
    }


    //{GET} - '/searching/paid/:text' 
    async searchPaid(req, res, next) {
        let keyword = req.params.keyw;
        let category = await Category.findAll({
            where: {
                name: { [Op.like]: '%' + keyword + '%' },
            }
        });

        if (category) {
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
                        name: { [Op.like]: '%' + keyword + '%' },
                    },
                    through: { attributes: [] }
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
        var courses = await Course.findAll({
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
                    { title: { [Op.like]: '%' + keyword + '%' } },
                    { description: { [Op.like]: '%' + keyword + '%' } },
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
            }],
            raw: true,
            nest: true,
        });
        let result = coursesByCategory.concat(courses);
        result = result.filter(res =>
            res.courseFee > 0
        )
        if (!result) {
            return res.status(200).json('No result');
        } else {
            // console.log(result);
            return res.status(200).json({
                number: result.length,
                result,
            });
        }
    }

    //{GET} - '/searching/free/:text' 
    async searchFree(req, res, next) {
        let keyword = req.params.keyw;
        let category = await Category.findAll({
            where: {
                name: { [Op.like]: '%' + keyword + '%' },
            }
        });

        if (category) {
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
                        name: { [Op.like]: '%' + keyword + '%' },
                    },
                    through: { attributes: [] }
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
        var courses = await Course.findAll({
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
                    { title: { [Op.like]: '%' + keyword + '%' } },
                    { description: { [Op.like]: '%' + keyword + '%' } },
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
            }],
            raw: true,
            nest: true,
        });
        let result = coursesByCategory.concat(courses);
        result = result.filter(res =>
            res.courseFee == 0
        )
        if (!result) {
            return res.status(200).json('No result');
        } else {
            // console.log(result);
            return res.status(200).json({
                number: result.length,
                result,
            });
        }
    }


}


module.exports = new SearchingController();