const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('progress', {
    progress_id: {
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
      unique: "fk_progress_enrollment"
    },
    last_time_access: {
      type: DataTypes.DATE,
      allowNull: true
    },
    is_completed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'progress',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "progress_id" },
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
