'use strict';
/* global describe beforeEach it */

const {expect} = require('chai');

const {Order, User} = require('../server/db/models');
const seed = require('./seed');

describe.only('seed script', () => {
	it('completes successfully', seed);

	it('creates at most one unsubmitted order per user', async () => {
		await seed();
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
});
