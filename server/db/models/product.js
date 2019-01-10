const Sequelize = require('sequelize');
const db = require('../db');

// OB/JL: consider (future) more validations, e.g. image url is a valid URL, name is unique
const Product = db.define('product', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	// OB/JL: floating point math is the worst, for high accuracy math on numbers, it's standard to use INTEGER type (measure in cents)
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
		type: Sequelize.TEXT,
		allowNull: false
	}
});

module.exports = Product;
