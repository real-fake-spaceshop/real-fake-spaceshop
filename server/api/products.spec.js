const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Product = db.model('product');

describe('Product routes', () => {
	beforeEach(() => {
		return db.sync({force: true});
	});

	describe('GET route', () => {
		beforeEach(async () => {
			await Product.create({
				name: 'Arwing',
				price: 2000.5,
				description: 'This ship is slightly used. Sorry about it :(',
				imageUrl: 'http://lorempixel.com/600/400/transport'
			});
		});

		it('responds to GET "/api/products" with JSON containing a list of products', () => {
			request(app)
				.get('/api/products')
				.end(function(err, res, next) {
					if (err || !res.ok) {
						console.error(err);
					} else {
						expect(res.statusCode).to.equal(200);
						expect(res.body).to.be.an('array');
						expect(res.body[0].name).to.equal('Arwing');
					}
				});
		});

		it('adds a new product to database with a POST "/api/products" ', () => {
			const newProduct = {
				name: 'Tie-Fighter',
				price: 100000000,
				imageUrl: 'http://lorempixel.com/600/400/transport',
				description: 'this is a ship.'
			};

			request(app)
				.post('/api/products')
				.send(newProduct)
				.end(function(err, res, next) {
					if (err || !res.ok) {
						console.error(err);
					} else {
						expect(res.statusCode).to.equal(200);
						expect(res.body).to.be.an('object');
						expect(res.body.name).to.equal('Tie-Fighter');
						expect(res.body.id).to.equal(2);
					}
				});
		});
	});
});
