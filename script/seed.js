'use strict';

const NUM_USERS = 100;
const NUM_PRODUCTS = 50;
const NUM_ORDERS = NUM_USERS * 2;

const faker = require('faker');

const db = require('../server/db');
const {User, Product, Order} = require('../server/db/models');

async function seed() {
	await db.sync({force: true});
	console.log('db synced!');
	faker.seed(process.env.RAND_SEED || 123);

	const usersP = new Array(NUM_USERS);
	const productsP = new Array(NUM_PRODUCTS);
	const ordersP = new Array(NUM_ORDERS);

	for (let i = 0; i < NUM_USERS; i++) {
		const first = faker.name.firstName();
		const last = faker.name.lastName();
		usersP[i] = User.create({
			name: `${first} ${last}`,
			password: faker.internet.password(8, true),
			email: faker.internet.email(first, last, faker.internet.domainName()),
			imageUrl: faker.image.people(),
			address: faker.address.streetAddress()
		});
	}

	for (let i = 0; i < NUM_PRODUCTS; i++) {
		productsP[i] = Product.create({
			name: faker.commerce.product(),
			price: faker.random.number({min: 1, max: 1e9}),
			description: faker.lorem.paragraph(),
			imageUrl: faker.image.transport()
		});
	}

	const [users, products] = [
		await Promise.all(usersP),
		await Promise.all(productsP)
	];

	// const orders = await ;

	console.log(`seeded ${users.length} users`);
	console.log(`seeded ${products.length} products`);
	// console.log(`seeded ${orders.length} orders`);
	console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
	console.log('seeding...');
	try {
		await seed();
	} catch (err) {
		console.error(err);
		process.exitCode = 1;
	} finally {
		console.log('closing db connection');
		await db.close();
		console.log('db connection closed');
	}
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
	runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
