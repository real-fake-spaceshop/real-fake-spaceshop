/* eslint-disable no-unused-expressions */
const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const {Order, Product, User} = require('../db/models');

const server = request.agent(app);

const userData = {
	name: 'Elon Musk',
	password: 'mars',
	email: 'elon@spacex.com',
	address: 'somewhere'
};

const productsData = [
	{name: 'Falcon 9', price: '100', imageUrl: '', description: 'none'},
	{
		name: 'Falcon Heavy',
		price: '300',
		imageUrl: '',
		description: 'none'
	},
	{name: 'BFR', price: '1000', imageUrl: '', description: 'none'}
];
describe.only('Order API routes', () => {
	let order, user, products;

	beforeEach('clear database', () => {
		console.log('clearing database');
		return db.sync({force: true});
	});

	beforeEach('Add test order to database', async () => {
		const userP = User.create(userData);
		const productsP = Product.bulkCreate(productsData, {
			returning: true
		});

		[user, products] = await Promise.all([userP, productsP]);

		order = await Order.create({submitted: false, ownerId: user.id});
		await order.setProducts(products, {through: {quantity: 1}});
	});

	describe('Logged in routes', () => {
		beforeEach('Login user', done => {
			server
				.post('/auth/login')
				.send({email: userData.email, password: userData.password})
				.expect(200)
				.end(function(err, res) {
					if (err || !res.ok) {
						// console.error(err);
						return done(err);
					} else {
						expect(res.body).to.be.an('object');
						expect(res.body.name).to.equal(userData.name);
						return done();
					}
				});
		});

		describe('GET /api/orders/:orderId', () => {
			it('responds with order information', done => {
				server
					.get(`/api/orders/${order.id}`)
					.expect(200)
					.end(function(err, res) {
						if (err || !res.ok) {
							// console.error(err);
							return done(err);
						}
						const body = res.body;
						expect(body.ownerId).to.be.equal(user.id);
						expect(body.products).to.have.length(products.length);
						done();
					});
			});
		});

		describe('POST /api/orders', () => {
			it(' creates an order in the database', done => {
				const newOrder = {
					ownerId: user.id,
					products: products.map(p => ({id: p.id, quantity: 1}))
				};

				server
					.post('/api/orders')
					.send(newOrder)
					.expect(201)
					.end(function(err, res) {
						if (err || !res.ok) {
							return done(err);
						}
						expect(res.body).to.be.an('object');
						expect(res.body.id).to.exist;
						Order.findById(res.body.id, {include: [Product]})
							.then(createdOrder => {
								expect(createdOrder).to.exist;
								expect(createdOrder.products).to.be.an('array');
								expect(createdOrder.products).to.have.length(products.length);
								done();
							})
							.catch(error => done(error));
					});
			});
		});

		describe.only('PUT /api/orders/:orderId/:productId', () => {
			let product;
			beforeEach(async () => {
				product = await Product.create({
					name: 'Arwing',
					description: 'none',
					imageUrl: '',
					price: 100000
				});
			});
			it("Adds the product to the order if it doesn't exist", done => {
				server
					.put(`/api/orders/${order.id}/${product.id}?quantity=5`)
					.expect(200)
					.end(function(err, res) {
						if (err || !res.ok) {
							return done(err);
						}
						const updatedProduct = res.body.products.find(
							p => p.id === product.id
						);
						expect(updatedProduct.order_line_item.quantity).to.equal(5);
						order
							.hasProduct(product)
							.then(exists => {
								expect(exists, 'order has product added to it').to.be.true;
								done();
							})
							.catch(error => done(error));
					});
			});

			it('Updates the product quantity if product is already on the order');
		});

		describe('DELETE /api/orders/:orderId/:productId', () => {
			it('removes specified product from the order');
		});
	});

	describe('Logged out routes', () => {
		it("/api/orders/:orderId responds with 401 if not the user's order", done => {
			server
				.get(`/api/orders/${order.id}`)
				.expect(401)
				.end(function(err, res) {
					if (err || (!res.ok && res.status !== 401)) {
						return done(err);
					}

					return done();
				});
		});
	});
});
