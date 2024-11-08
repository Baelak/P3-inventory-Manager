const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product',
        key: 'id',
      },
      onDelete: 'CASCADE', // Cascade delete
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag',
        key: 'id',
      },
      onDelete: 'CASCADE', // Cascade delete
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
