const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Order = sequelize.define('Order', {
  name: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  totalAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  product: { type: DataTypes.TEXT, allowNull: false },
  items: { type: DataTypes.TEXT, allowNull: false },
  total: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 }, // Oletusarvo
}, { timestamps: true });

module.exports = Order;
