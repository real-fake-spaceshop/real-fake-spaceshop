const {expect} = require('chai');
const db = require('../index');
const Order = require('./order');

describe('Order model', () => {
	beforeEach(() => {
		return db.sync({force: true});
	});

	describe('instanceMethods', () => {
		let order;

		beforeEach(async () => {
			order = await Order.create({
				products: [
					{
						name: 'Arwing',
						price: 2000.5,
						description: 'another dummy ship'
					}
				]
			});
		});

		it('adds the product to the database successfully', async () => {
			const arr = await Order.findAll();
			console.log(arr);
			//expect(arr[0].products[0].name).to.be.equal('Arwing');
		});
	});
});
