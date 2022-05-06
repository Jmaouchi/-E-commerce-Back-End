// import sequelize model from library
const { Model, DataTypes } = require('sequelize');
// import the connection to the db 
const sequelize = require('../config/connection.js');
// create Category Model
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
