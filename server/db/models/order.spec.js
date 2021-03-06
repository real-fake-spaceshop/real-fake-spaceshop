const {expect} = require('chai');

const db = require('../index');
const Order = require('./order');
const Product = require('./product');
const User = require('./user');

describe('Order model', () => {
	beforeEach(() => {
		return db.sync({force: true});
	});

	describe('instanceMethods', () => {
		let order;
		let cody;
		let spaceship;

		beforeEach(async () => {
			order = await Order.create({
				submitted: true
			});
		});

		it('adds the order to the database successfully', async () => {
			const arr = await Order.findAll();
			expect(arr[0].submitted).to.be.equal(true);
		});

		it('the order has the proper table containing its products', async () => {
			spaceship = await Product.create({
				name: 'Arwing',
				price: 2000.5,
				description: 'This ship is slightly used. Sorry about it :(',
				imageUrl: 'http://lorempixel.com/600/400/transport'
			});
			order.addProducts(spaceship);

			const arr = await Order.findAll();
			const products = await arr[0].getProducts();

			expect(products[0].name).to.be.equal('Arwing');
		});
	});
});
