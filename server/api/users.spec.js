/* global describe beforeEach it */

const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const User = db.model('user');

describe('User routes', () => {
	beforeEach(() => {
		return db.sync({force: true});
	});
}); // end describe('User routes')
