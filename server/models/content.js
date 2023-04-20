const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('content', {
    content_id: {
      autoIncrement: true,
      type: DataTypes.MEDIUMINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    chapter_id: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'chapter',
        key: 'chapter_id'
      }
    },
    content_type_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'content_type',
        key: 'type_id'
      }
    },
    time_required_in_sec: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false
    },
    is_open_for_free: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    link: {
      type: DataTypes.STRING(300),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'content',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "content_id" },
        ]
      },
      {
        name: "fk_content_chapter",
        using: "BTREE",
        fields: [
          { name: "chapter_id" },
        ]
      },
      {
        name: "fk_content_content_type",
        using: "BTREE",
        fields: [
          { name: "content_type_id" },
        ]
      },
    ]
  });
};
