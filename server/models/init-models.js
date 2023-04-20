var DataTypes = require("sequelize").DataTypes;
var _category = require("./category");
var _chapter = require("./chapter");
var _content = require("./content");
var _content_type = require("./content_type");
var _course = require("./course");
var _course_category = require("./course_category");
var _deposit = require("./deposit");
var _enrollment = require("./enrollment");
var _feedback = require("./feedback");
var _instructor = require("./instructor");
var _order = require("./order");
var _order_detail = require("./order_detail");
var _payment = require("./payment");
var _progress = require("./progress");
var _student = require("./student");

function initModels(sequelize) {
  var category = _category(sequelize, DataTypes);
  var chapter = _chapter(sequelize, DataTypes);
  var content = _content(sequelize, DataTypes);
  var content_type = _content_type(sequelize, DataTypes);
  var course = _course(sequelize, DataTypes);
  var course_category = _course_category(sequelize, DataTypes);
  var deposit = _deposit(sequelize, DataTypes);
  var enrollment = _enrollment(sequelize, DataTypes);
  var feedback = _feedback(sequelize, DataTypes);
  var instructor = _instructor(sequelize, DataTypes);
  var order = _order(sequelize, DataTypes);
  var order_detail = _order_detail(sequelize, DataTypes);
  var payment = _payment(sequelize, DataTypes);
  var progress = _progress(sequelize, DataTypes);
  var student = _student(sequelize, DataTypes);

  category.belongsToMany(course, { as: 'course_id_courses', through: course_category, foreignKey: "category_id", otherKey: "course_id" });
  course.belongsToMany(category, { as: 'category_id_categories', through: course_category, foreignKey: "course_id", otherKey: "category_id" });
  course_category.belongsTo(category, { as: "category", foreignKey: "category_id"});
  category.hasMany(course_category, { as: "course_categories", foreignKey: "category_id"});
  content.belongsTo(chapter, { as: "chapter", foreignKey: "chapter_id"});
  chapter.hasMany(content, { as: "contents", foreignKey: "chapter_id"});
  content.belongsTo(content_type, { as: "content_type", foreignKey: "content_type_id"});
  content_type.hasMany(content, { as: "contents", foreignKey: "content_type_id"});
  chapter.belongsTo(course, { as: "course", foreignKey: "course_id"});
  course.hasMany(chapter, { as: "chapters", foreignKey: "course_id"});
  course_category.belongsTo(course, { as: "course", foreignKey: "course_id"});
  course.hasMany(course_category, { as: "course_categories", foreignKey: "course_id"});
  enrollment.belongsTo(course, { as: "course", foreignKey: "course_id"});
  course.hasMany(enrollment, { as: "enrollments", foreignKey: "course_id"});
  order_detail.belongsTo(course, { as: "course", foreignKey: "course_id"});
  course.hasMany(order_detail, { as: "order_details", foreignKey: "course_id"});
  feedback.belongsTo(enrollment, { as: "enrollment", foreignKey: "enrollment_id"});
  enrollment.hasMany(feedback, { as: "feedbacks", foreignKey: "enrollment_id"});
  progress.belongsTo(enrollment, { as: "enrollment", foreignKey: "enrollment_id"});
  enrollment.hasOne(progress, { as: "progress", foreignKey: "enrollment_id"});
  course.belongsTo(instructor, { as: "instructor", foreignKey: "instructor_id"});
  instructor.hasMany(course, { as: "courses", foreignKey: "instructor_id"});
  order_detail.belongsTo(order, { as: "order", foreignKey: "order_id"});
  order.hasMany(order_detail, { as: "order_details", foreignKey: "order_id"});
  payment.belongsTo(order_detail, { as: "order_detail", foreignKey: "order_detail_id"});
  order_detail.hasOne(payment, { as: "payment", foreignKey: "order_detail_id"});
  deposit.belongsTo(student, { as: "customer", foreignKey: "customer_id"});
  student.hasMany(deposit, { as: "deposits", foreignKey: "customer_id"});
  enrollment.belongsTo(student, { as: "student", foreignKey: "student_id"});
  student.hasMany(enrollment, { as: "enrollments", foreignKey: "student_id"});
  instructor.belongsTo(student, { as: "instructor", foreignKey: "instructor_id"});
  student.hasOne(instructor, { as: "instructor", foreignKey: "instructor_id"});
  order.belongsTo(student, { as: "customer", foreignKey: "customer_id"});
  student.hasMany(order, { as: "orders", foreignKey: "customer_id"});

  return {
    category,
    chapter,
    content,
    content_type,
    course,
    course_category,
    deposit,
    enrollment,
    feedback,
    instructor,
    order,
    order_detail,
    payment,
    progress,
    student,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
