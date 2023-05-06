const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('feedback', {
    feedback_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    enrollment_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'enrollment',
        key: 'enrollment_id'
      },
      unique: "fk_feedback_enrollment"
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    detail: {
      type: DataTypes.STRING(3000),
      allowNull: true
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'feedback',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "feedback_id" },
        ]
      },
      {
        name: "enrollment_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "enrollment_id" },
        ]
      },
    ]
  });
};