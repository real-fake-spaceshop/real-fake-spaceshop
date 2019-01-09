const {expect} = require('chai');
const db = require('../index');
const Product = require('./product');

describe('Product model', () => {
	beforeEach(() => {
		return db.sync({force: true});
	});

	describe('instanceMethods', () => {
		let spaceship;

		beforeEach(async () => {
			spaceship = await Product.create({
				name: 'Arwing',
				price: 2000.5,
				description: 'This ship is slightly used. Sorry about it :(',
				imageUrl: 'http://lorempixel.com/600/400/transport'
			});
		});

		it('adds the product to the database successfully', async () => {
			const arr = await Product.findAll();
			expect(arr[0].name).to.be.equal('Arwing');
			expect(arr[0].price).to.be.equal(2000.5);
			expect(arr[0].description).to.be.equal(
				'This ship is slightly used. Sorry about it :('
			);
		});
	});
});
