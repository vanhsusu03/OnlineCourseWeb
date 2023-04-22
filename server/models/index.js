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

Object.keys(db.models).forEach((modelName) => {
    if (db.models[modelName].associate) {
        db.models[modelName].associate(db.models);
    }
});

module.exports = db;