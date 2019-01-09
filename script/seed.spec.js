'use strict';
/* global describe beforeEach it */

const {expect} = require('chai');

const {Order, User} = require('../server/db/models');
const seed = require('./seed');

describe.only('seed script', () => {
	it('completes successfully', seed);

	describe('seeded data', function() {
		this.timeout(5000);

		before('seed database', async () => {
			await seed();
		});

		it('creates at most one unsubmitted order per user', async () => {
			const unsubmitted = await Order.count({
				attributes: ['ownerId'],
				include: [{model: User, as: 'owner'}],
				where: {submitted: false},
				group: 'ownerId'
			});

			for (const user of unsubmitted) {
				expect(
					Number(user.count),
					`User id:${user.ownerId} to have exactly one unsubmitted order`
				).to.equal(1);
			}
		});

		it('links the only unsubmitted order for each user as the shopping cart', async () => {
			const orders = await Order.findAll({
				where: {submitted: false},
				include: [{model: User, as: 'owner'}]
			});

			for (const order of orders) {
				expect(
					order.owner.shoppingCartId,
					`User id:${order.owner.id} should have shoppingCartId: ${order.id}`
				).to.equal(order.id);
			}
		});
	});
});
