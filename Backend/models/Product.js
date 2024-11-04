const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  discount: { type: DataTypes.DECIMAL(5, 2), defaultValue: 0 },
  description: { type: DataTypes.TEXT },
  image_urls: { type: DataTypes.TEXT }, // Adjusted to match the column name in your database
}, {
  getterMethods: {
    discountedPrice() {
      return this.discount > 0 ? this.price - (this.price * (this.discount / 100)) : this.price;
    }
  }
});

module.exports = Product;
