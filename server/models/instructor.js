const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('instructor', {
    instructor_id: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'student',
        key: 'student_id'
      }
    },
    // qualification: {
    //   type: DataTypes.STRING(300),
    //   allowNull: false
    // },
    introduction_brief: {
      type: DataTypes.STRING(3000),
      allowNull: false
    },
    transfer_info: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'instructor',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "instructor_id" },
        ]
      },
    ]
  });
};
