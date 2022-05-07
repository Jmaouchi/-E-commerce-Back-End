// import sequelize model from library
const { Model, DataTypes } = require('sequelize');
// import the connection to the db 
const sequelize = require('../config/connection.js');


// Initialize Category model (table) by extending off Sequelize's Model class
class Category extends Model {}

Category.init( 
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull:false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
