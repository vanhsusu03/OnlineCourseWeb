const sequelize = require('sequelize');
const { format } = require('date-fns');
const {
    models: { Chapter, Content, Content_type, Feedback, Enrollment, Progress, Student }
} = require('../models');

class StudyController {
    constructor() {
        this.addFeedback = this.addFeedback.bind(this);
        this.updateLastTimeAccess = this.updateLastTimeAccess.bind(this);
        this.getLastTimeAccess = this.getLastTimeAccess.bind(this);
        this.getContents = this.getContents.bind(this);
        this.getContentLink = this.getContentLink.bind(this);
    }

    async getEnrollmentId(studentId, courseId) {
        const enrollment = await Enrollment.findOne({
            attributes: ['enrollment_id'],
            where: {
                student_id: studentId,
                course_id: courseId
            }
        });

        if (enrollment) {
            return enrollment.dataValues.enrollment_id;
        }
        return null;
    }

    async addFeedback(req, res, next) {
        const courseId = req.body.courseId;
        const rating = req.body.rating;
        var detail = req.body.detail;

        const studentId = req.session.studentId;

        if (typeof detail === 'undefined') {
            detail = null;
        }

        const enrollmentId = await this.getEnrollmentId(studentId, courseId);
        if (!enrollmentId) {
            return res.status(400).json({
                msg: 'You have not enrolled in this course yet!'
            });
        }

        await Feedback.create({
            enrollment_id: enrollmentId,
            rating: rating,
            detail: detail,
            last_update: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
        });

        return res.status(200).json({
            msg: 'Add success!'
        });
    }

    async modifyFeedbackOfAStudent(req, res, next) {
        const feedbackId = req.body.feedbackId;
        const rating = req.body.rating;
        var detail = req.body.detail;

        if (typeof detail === 'undefined') {
            detail = null;
        }

        await Feedback.update({
                rating: rating,
                detail: detail,
                last_update: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
            },
            { where: { feedback_id: feedbackId } }
        );

        return res.status(200).json({
            msg: 'Modify success!'
        });
    }

    async getFeedbackOfAStudent(req, res, next) {
        const courseId = req.params.courseId;
        const studentId = req.params.studentId;

        const feedback = await Enrollment.findOne({
            attributes: [ 
                [sequelize.col('Enrollment.enrollment_id'), 'enrollmentId'],
                [sequelize.col('Enrollment.enrollment_date'), 'enrollmentDate'],
                [sequelize.col('feedback_id'), 'feedbackId'],
                [sequelize.col('rating'), 'feedbackRating'],
                [sequelize.col('detail'), 'feedbackDetail'],
                [sequelize.fn('CONVERT_TZ', sequelize.col('last_update'), '+00:00', '+07:00'), 'feedbackLastUpdateTime']
            ],
            where: {
                student_id: studentId,
                course_id: courseId
            },
            include: {
                model: Feedback,
                attributes: [],
                required: true
            }
        });

        return res.status(200).json({
            feedback: feedback
        });
    }

    async getFeedbacksOfACourse(req, res, next) {
        const courseId = req.params.courseId;

        const feedbacks = await Enrollment.findAll({
            attributes: [
                [sequelize.col('Student.student_id'), 'studentId'], 
                [sequelize.col('Student.first_name'), 'studentFirstName'], 
                [sequelize.col('Student.last_name'), 'studentLastName'],
                [sequelize.col('Student.image'), 'studentImage'],
                [sequelize.col('Enrollment.enrollment_id'), 'enrollmentId'],
                [sequelize.col('Enrollment.enrollment_date'), 'enrollmentDate'],
                [sequelize.col('feedback_id'), 'feedbackId'],
                [sequelize.col('rating'), 'feedbackRating'],
                [sequelize.col('detail'), 'feedbackDetail'],
                [sequelize.fn('CONVERT_TZ', sequelize.col('last_update'), '+00:00', '+07:00'), 'feedbackLastUpdateTime']
            ],
            where: {
                course_id: courseId
            },
            include: [
            {
                model: Feedback,
                attributes: [],
                required: true
            },
            {
                model: Student,
                attributes: [],
                required: true
            }
            ]
        });

        return res.status(200).json({
            feedbacks: feedbacks
        });
    }

    async updateLastTimeAccess(req, res, next) {
        const courseId = req.body.courseId;
        const lastTimeAccess = req.body.lastTimeAccess;

        const studentId = req.session.studentId;

        const enrollmentId = await this.getEnrollmentId(studentId, courseId);
        if (!enrollmentId) {
            return res.status(400).json({
                msg: 'You have not enrolled in this course yet!'
            });
        }

        await Progress.update({
            last_time_access: lastTimeAccess
        },
            { where: { enrollment_id: enrollmentId } }
        );

        return res.status(200).json({
            msg: 'Update last time access success!'
        });
    }

    async getLastTimeAccess(req, res, next) {
        const courseId = req.params.courseId;

        const studentId = req.session.studentId;

        const enrollmentId = await this.getEnrollmentId(studentId, courseId);
        if (!enrollmentId) {
            return res.status(400).json({
                msg: 'You have not enrolled in this course yet!'
            });
        }

        const lastTimeAccess = await Progress.findOne({
            attributes: [
                [sequelize.fn('CONVERT_TZ', sequelize.col('last_time_access'), '+00:00', '+07:00'), 'lastTimeAccess']
            ],
            where: { enrollment_id: enrollmentId }
        });

        return res.status(200).json({
            lastTimeAccess: lastTimeAccess
        });
    }

    async getContents(req, res, next) {
        const courseId = req.params.courseId;
        
        const studentId = req.session.studentId;

        const enrollmentId = await this.getEnrollmentId(studentId, courseId);
        if (!enrollmentId) {
            return res.status(400).json({
                msg: 'You have not enrolled in this course yet!'
            });
        }

        const contents = await Chapter.findAll({
            attributes: [ 
                [sequelize.col('Chapter.chapter_id'), 'chapterId'],
                [sequelize.col('Chapter.title'), 'chapterTitle']
            ],
            order: [
                ['chapterId', 'ASC']
            ],
            include: {
                model: Content,
                attributes: [
                    [sequelize.col('content_id'), 'contentId'],
                    [sequelize.col('title'), 'contentTitle'],
                    [sequelize.col('time_required_in_sec'), 'timeRequiredInSec'],
                    'link'
                ],
                order: [
                    [sequelize.col('content_id'), 'ASC']
                ],
                include: {
                    model: Content_type,
                    attributes: [
                        [sequelize.col('type_id'), 'contentTypeId'],
                        [sequelize.col('content_type'), 'contentType']
                    ],
                    required: true
                }
            },
            required: true,
            where: { 
                course_id: courseId 
            }
        });

        return res.status(200).json({
            contents: contents
        });
    }

    async getContentLink(req, res, next) {
        const courseId = req.params.courseId;
        const contentId = req.params.contentId;
        
        const studentId = req.session.studentId;

        const enrollmentId = await this.getEnrollmentId(studentId, courseId);
        if (!enrollmentId) {
            return res.status(400).json({
                msg: 'You have not enrolled in this course yet!'
            });
        }

        const link = await Chapter.findOne({
            attributes: [],
            include: {
                model: Content,
                attributes: [ 'link' ],
                where: { 
                    content_id: contentId 
                }
            },
            required: true,
            where: { 
                course_id: courseId 
            }
        });

        return res.status(200).json({
            contentLink: link.dataValues.contents[0].link
        });
    }
}

module.exports = new StudyController();