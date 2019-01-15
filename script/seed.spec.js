'use strict';
/* global describe beforeEach it */

const {expect} = require('chai');

const {Order, User} = require('../server/db/models');
const seed = require('./seed');

describe('seed script', () => {
	describe('seeded data', function() {
		this.timeout(5000);

		before('seed database', async () => {
			await seed();
		});

		it('creates at most one unsubmitted order per user', async () => {
			const unsubmitted = await Order.count({
				attributes: ['ownerId'],
				where: {submitted: false},
				group: 'ownerId'
			});

			for (const order of unsubmitted) {
				expect(
					Number(order.count),
					`User id:${order.ownerId} to have exactly one unsubmitted order`
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
