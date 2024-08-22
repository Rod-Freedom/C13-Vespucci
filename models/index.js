// import models
import Product from './Product.js';
import Category from './Category.js';
import Tag from './Tag.js';
import ProductTag from './ProductTag.js';

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'RESTRICT'
});

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

// Products belongToMany Tags (through ProductTag)
// Tags belongToMany Products (through ProductTag)
Product.hasMany(ProductTag, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
});

ProductTag.belongsTo(Product, {
  foreignKey: 'product_id',
});

Tag.hasMany(ProductTag, {
  foreignKey: 'tag_id',
  onDelete: 'CASCADE',
});

ProductTag.belongsTo(Tag, {
  foreignKey: 'tag_id',
});

export {
  Product,
  Category,
  Tag,
  ProductTag,
};