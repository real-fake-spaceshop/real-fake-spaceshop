const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  products: {
    type: Sequelize.ARRAY,
    allowNull: false,
    defaultValue: []
  },
  activeOrder: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
});

module.exports = Order;