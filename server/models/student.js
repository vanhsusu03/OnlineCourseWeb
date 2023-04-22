const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('student', {
        student_id: {
            autoIncrement: true,
            type: DataTypes.MEDIUMINT.UNSIGNED,
            allowNull: false,
            primaryKey: true
        },
        first_name: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(60),
            allowNull: false,
            unique: "email"
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: "phone"
        },
        birthday: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(300),
            allowNull: true
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: "username"
        },
        password: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        registration_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        coin: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            defaultValue: 0
        },
        is_instructor: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: 0
        }
    }, {
        sequelize,
        tableName: 'student',
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    {name: "student_id"},
                ]
            },
            {
                name: "username",
                unique: true,
                using: "BTREE",
                fields: [
                    {name: "username"},
                ]
            },
            {
                name: "email",
                unique: true,
                using: "BTREE",
                fields: [
                    {name: "email"},
                ]
            },
            {
                name: "phone",
                unique: true,
                using: "BTREE",
                fields: [
                    {name: "phone"},
                ]
            },
        ]
    });
};
