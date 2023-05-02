const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        dialect: 'mysql',
        define: {
            freezeTableName: true,
            noPrimaryKey: true
        },
        logging: false
    }
);

db.sequelize = sequelize;
db.models = {};

db.models.Cart = require('./cart')(sequelize, Sequelize.DataTypes);
db.models.Category = require('./category')(sequelize, Sequelize.DataTypes);
db.models.Chapter = require('./chapter')(sequelize, Sequelize.DataTypes);
db.models.Content_type = require('./content_type')(sequelize, Sequelize.DataTypes);
db.models.Content = require('./content')(sequelize, Sequelize.DataTypes);
db.models.Course_category = require('./course_category')(sequelize, Sequelize.DataTypes);
db.models.Course = require('./course')(sequelize, Sequelize.DataTypes);
db.models.Deposit = require('./deposit')(sequelize, Sequelize.DataTypes);
db.models.Enrollment = require('./enrollment')(sequelize, Sequelize.DataTypes);
db.models.Feedback = require('./feedback')(sequelize, Sequelize.DataTypes);
db.models.Instructor = require('./instructor')(sequelize, Sequelize.DataTypes);
db.models.Order_detail = require('./order_detail')(sequelize, Sequelize.DataTypes);
db.models.Order = require('./order')(sequelize, Sequelize.DataTypes);
db.models.Payment = require('./payment')(sequelize, Sequelize.DataTypes);
db.models.Progress = require('./progress')(sequelize, Sequelize.DataTypes);
db.models.Student = require('./student')(sequelize, Sequelize.DataTypes);

db.models.Category.belongsToMany(db.models.Course, { through: db.models.Course_category, foreignKey: "category_id", otherKey: "course_id" });
db.models.Course.belongsToMany(db.models.Category, { through: db.models.Course_category, foreignKey: "course_id", otherKey: "category_id" });
db.models.Course.belongsToMany(db.models.Student, { through: db.models.Cart, foreignKey: "course_id", otherKey: "student_id" });
db.models.Student.belongsToMany(db.models.Course, { through: db.models.Cart, foreignKey: "student_id", otherKey: "course_id" });
db.models.Course_category.belongsTo(db.models.Category, { foreignKey: "category_id"});
db.models.Category.hasMany(db.models.Course_category, { foreignKey: "category_id"});
db.models.Content.belongsTo(db.models.Chapter, { foreignKey: "chapter_id"});
db.models.Chapter.hasMany(db.models.Content, { foreignKey: "chapter_id"});
db.models.Content.belongsTo(db.models.Content_type, { foreignKey: "content_type_id"});
db.models.Content_type.hasMany(db.models.Content, { foreignKey: "content_type_id"});
db.models.Cart.belongsTo(db.models.Course, { foreignKey: "course_id"});
db.models.Course.hasMany(db.models.Cart, { foreignKey: "course_id"});
db.models.Chapter.belongsTo(db.models.Course, { foreignKey: "course_id"});
db.models.Course.hasMany(db.models.Chapter, { foreignKey: "course_id"});
db.models.Course_category.belongsTo(db.models.Course, { foreignKey: "course_id"});
db.models.Course.hasMany(db.models.Course_category, { foreignKey: "course_id"});
db.models.Enrollment.belongsTo(db.models.Course, { foreignKey: "course_id"});
db.models.Course.hasMany(db.models.Enrollment, { foreignKey: "course_id"});
db.models.Order_detail.belongsTo(db.models.Course, { foreignKey: "course_id"});
db.models.Course.hasMany(db.models.Order_detail, { foreignKey: "course_id"});
db.models.Feedback.belongsTo(db.models.Enrollment, { foreignKey: "enrollment_id"});
db.models.Enrollment.hasOne(db.models.Feedback, { foreignKey: "enrollment_id"});
db.models.Progress.belongsTo(db.models.Enrollment, { foreignKey: "enrollment_id"});
db.models.Enrollment.hasOne(db.models.Progress, { foreignKey: "enrollment_id"});
db.models.Course.belongsTo(db.models.Instructor, { foreignKey: "instructor_id"});
db.models.Instructor.hasMany(db.models.Course, { foreignKey: "instructor_id"});
db.models.Order_detail.belongsTo(db.models.Order, { foreignKey: "order_id"});
db.models.Order.hasMany(db.models.Order_detail, { foreignKey: "order_id"});
db.models.Payment.belongsTo(db.models.Order_detail, { foreignKey: "order_detail_id"});
db.models.Order_detail.hasOne(db.models.Payment, { foreignKey: "order_detail_id"});
db.models.Cart.belongsTo(db.models.Student, { foreignKey: "student_id"});
db.models.Student.hasMany(db.models.Cart, { foreignKey: "student_id"});
db.models.Deposit.belongsTo(db.models.Student, { foreignKey: "customer_id"});
db.models.Student.hasMany(db.models.Deposit, { foreignKey: "customer_id"});
db.models.Enrollment.belongsTo(db.models.Student, { foreignKey: "student_id"});
db.models.Student.hasMany(db.models.Enrollment, { foreignKey: "student_id"});
db.models.Instructor.belongsTo(db.models.Student, { foreignKey: "instructor_id"});
db.models.Student.hasOne(db.models.Instructor, { foreignKey: "instructor_id"});
db.models.Order.belongsTo(db.models.Student, { foreignKey: "customer_id"});
db.models.Student.hasMany(db.models.Order, { foreignKey: "customer_id"});

Object.keys(db.models).forEach((modelName) => {
    if (db.models[modelName].associate) {
        db.models[modelName].associate(db.models);
    }
});

module.exports = db;