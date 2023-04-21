const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('course', {
    course_id: {
      autoIncrement: true,
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    instructor_id: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'instructor',
        key: 'instructor_id'
      }
    },
    title: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    release_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    course_fee: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      allowNull: false
    },
    is_closed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'course',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "course_id" },
        ]
      },
      {
        name: "fk_course_instructor",
        using: "BTREE",
        fields: [
          { name: "instructor_id" },
        ]
      },
    ]
  });
};
