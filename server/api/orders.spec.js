const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const {Order, OrderLineItem, Product, User} = require('../db/models');

const server = request.agent(app);

const userData = {
	name: 'Elon Musk',
	password: 'mars',
	email: 'elon@spacex.com',
	address: 'somewhere'
};

describe.only('Order API routes', () => {
	let order, user, products;

	beforeEach('clear database', () => {
		return db.sync({force: true});
	});

	beforeEach('Add test order to database', async () => {
		const userP = User.create(userData);
		const productsP = Product.bulkCreate(
			[
				{name: 'Falcon 9', price: '100', imageUrl: '', description: 'none'},
				{
					name: 'Falcon Heavy',
					price: '300',
					imageUrl: '',
					description: 'none'
				},
				{name: 'BFR', price: '1000', imageUrl: '', description: 'none'}
			],
			{
				returning: true
			}
		);

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

		it('/api/orders/:orderId responds with order information', done => {
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

	describe('Logged out routes', () => {
		it("/api/orders/:orderId responds with 401 if not the user's order", done => {
			server
				.get(`/api/orders/${order.id}`)
				.expect(401)
				.end(function(err, res) {
					if (err || (!res.ok && res.status !== 401)) {
						console.log('**********************************');
						return done(err);
					}

					console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
					return done();
				});
		});
	});
});
