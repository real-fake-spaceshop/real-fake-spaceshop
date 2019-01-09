const User = require('./user');
const Product = require('./product');
const Order = require('./order');

Order.belongsTo(User, {as: 'shoppingCart'});
User.hasMany(Order, {as: 'shoppingCart'});

Product.belongsToMany(Order, {through: 'order_products'});
Order.belongsToMany(Product, {through: 'order_products'});

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
	User,
	Product,
	Order
};
