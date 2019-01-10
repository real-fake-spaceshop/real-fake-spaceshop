const Sequelize = require('sequelize');
const db = require('../db');

const OrderLineItem = db.define('order_line_item', {
	quantity: Sequelize.INTEGER
});

module.exports = OrderLineItem;
