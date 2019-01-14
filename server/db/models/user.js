const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');
const order = require('./order');

const defaultPicture = '/images/default_photo.png';

const User = db.define('user', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
		validate: {
			isEmail: true
		}
	},
	password: {
		type: Sequelize.STRING,
		// Making `.password` act like a func hides it when serializing to JSON.
		// This is a hack to get around Sequelize's lack of a "private" option.
		get() {
			return () => this.getDataValue('password');
		}
	},
	salt: {
		type: Sequelize.STRING,
		// Making `.salt` act like a function hides it when serializing to JSON.
		// This is a hack to get around Sequelize's lack of a "private" option.
		get() {
			return () => this.getDataValue('salt');
		}
	},
	googleId: {
		type: Sequelize.STRING
	},
	imageUrl: {
		type: Sequelize.STRING,
		allowNull: false,
		defaultValue: defaultPicture
	},
	address: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
	return User.encryptPassword(candidatePwd, this.salt()) === this.password();
};

/**
 * classMethods
 */
User.generateSalt = function() {
	return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function(plainText, salt) {
	return crypto
		.createHash('RSA-SHA256')
		.update(plainText)
		.update(salt)
		.digest('hex');
};

/**
 * hooks
 */
const setSaltAndPassword = user => {
	if (user.changed('password')) {
		user.salt = User.generateSalt();
		user.password = User.encryptPassword(user.password(), user.salt());
	}
};

//beforeUpdate should check for active cart and create one if it isnt present
//placing an order will remove the cart to trigger the above event
//ensure cart should create an empty shopping cart

const ensureCart = async user => {
	if (!user.shoppingCartId) {
		const cart = await order.create();
		user.shoppingCartId = cart.id;
	}
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
User.beforeCreate(ensureCart);
User.beforeUpdate(ensureCart);
