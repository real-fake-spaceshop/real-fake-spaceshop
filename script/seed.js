/* eslint-disable no-loop-func */
'use strict';

const NUM_USERS = 100;
const NUM_PRODUCTS = 50;
const MAX_ORDER_PRODUCTS = 5;
const NUM_ORDERS = NUM_USERS * 2;
const MAX_ORDER_QUANTITY = 10;

const faker = require('faker');

const db = require('../server/db');
const {User, Product, Order} = require('../server/db/models');

function seedUsers() {
	const usersP = new Array(NUM_USERS);

	for (let i = 0; i < NUM_USERS; i++) {
		const first = faker.name.firstName();
		const last = faker.name.lastName();
		const password = faker.internet.password(8, true);
		const email = faker.internet.email(
			first,
			last,
			faker.internet.domainName()
		);
		// console.log(`${first} ${last} <${email}>: ${password}`);
		usersP[i] = User.create({
			name: `${first} ${last}`,
			password,
			email,
			imageUrl: faker.image.people(),
			address: faker.address.streetAddress()
		});
	}

	return Promise.all(usersP);
}

function seedProducts() {
	const productsP = new Array(NUM_PRODUCTS);

	for (let i = 0; i < NUM_PRODUCTS; i++) {
		productsP[i] = Product.create({
			name: faker.commerce.product(),
			price: faker.random.number({min: 1, Usermax: 1e9}),
			description: faker.lorem.paragraph(),
			imageUrl: faker.image.transport() + '?' + Math.random() * 100
		});
	}

	return Promise.all(productsP);
}

async function seedOrders(users, products) {
	const orders = await Order.bulkCreate(
		new Array(NUM_ORDERS).fill({submitted: false}),
		{returning: true}
	);
	const lineItemsP = [];

	for (let i = 0; i < NUM_ORDERS; i++) {
		const order = orders[i];
		const owner = users[faker.random.number(users.length - 1)];
		if (await Order.findOne({where: {ownerId: owner.id}})) {
			order.submitted = true;
		} else {
			await owner.setShoppingCart(order);
		}
		order.ownerId = owner.id;
		await order.save();

		const orderProducts = new Array(
			faker.random.number(MAX_ORDER_PRODUCTS)
		).fill(0);
		for (let j = 0; j < orderProducts.length; j++) {
			let choice;
			do {
				choice = products[faker.random.number(products.length - 1)];
			} while (
				orderProducts.findIndex(elem => elem && elem.id === choice.id) !== -1
			);
			orderProducts[j] = choice;
		}
		lineItemsP.push(
			...orderProducts.map(product =>
				order.addProduct(product, {
					through: {quantity: faker.random.number(MAX_ORDER_QUANTITY - 1) + 1}
				})
			)
		);
	}

	await Promise.all(lineItemsP);

	return orders;
}

async function seed() {
	console.time(`seeded successfully`);
	await db.sync({force: true});
	console.log('db synced!');
	faker.seed(process.env.RAND_SEED || 123);

	const usersP = seedUsers();
	const productsP = seedProducts();

	const [users, products] = await Promise.all([usersP, productsP]);

	console.log(`seeded ${users.length} users`);
	console.log(`seeded ${products.length} products`);

	const orders = await seedOrders(users, products);

	console.log(`seeded ${orders.length} orders`);
	console.timeEnd(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
	console.log('seeding...');
	try {
		await seed();
	} catch (err) {
		console.error('Failed to seed database');
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
