'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Wishlist, { foreignKey: "productId" });

      this.belongsTo(models.User, {
        through: "SellerProducts",
        as: "users",
        foreignKey: "userId",
      });
      this.belongsTo(models.category, { 
        through: "CategoryProducts",
        as: "categories",
        foreignKey: "categoryId" });
    }
  }
  Product.init({
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};