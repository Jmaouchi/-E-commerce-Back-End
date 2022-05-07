// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category and that means that a product can only have 1 Category
Product.belongsTo(Category, {
  foreignKey: 'category_id'  // which is in the Product model
}); 


// Category hasMany Products and that means that a Category can only many products 
Category.hasMany(Product, {
  foreignKey: 'category_id'
});

// Products belongToMany Tags (through ProductTag) 
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id' 
})

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id'
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
