const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	price: {
		type: Sequelize.FLOAT,
		allowNull: false,
		validate: {
			min: 0
		}
	},
	imageUrl: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

module.exports = Product;
