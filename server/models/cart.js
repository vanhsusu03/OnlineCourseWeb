const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cart', {
    student_id: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'student',
        key: 'student_id'
      }
    },
    course_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'course',
        key: 'course_id'
      }
    }
  }, {
    sequelize,
    tableName: 'cart',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "student_id" },
          { name: "course_id" },
        ]
      },
      {
        name: "fk_cart_course",
        using: "BTREE",
        fields: [
          { name: "course_id" },
        ]
      },
    ]
  });
};
