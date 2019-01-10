const {expect} = require('chai');

const db = require('../index');

describe('OrderLineItem model', () => {
	beforeEach('clear database', () => {
		db.sync({force: true});
	});
});
