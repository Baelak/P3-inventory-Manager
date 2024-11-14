const Category = require('./Category');
const Product = require('./Product');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Associations
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE', // Ensures products are deleted if a category is deleted
});

Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id',
  onDelete: 'CASCADE', // Ensures product tags are deleted if a product is deleted
});

Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id',
  onDelete: 'CASCADE', // Ensures product tags are deleted if a tag is deleted
});

module.exports = { Category, Product, Tag, ProductTag };
