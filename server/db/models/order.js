const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
	submitted: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
});

module.exports = Order;
