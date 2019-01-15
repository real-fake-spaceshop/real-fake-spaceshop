const db = require('../db');
const router = require('express').Router();
const {Order, Product, OrderLineItem} = require('../db/models');

router.get('/:orderId', async (req, res, next) => {
	try {
		const order = await Order.findById(req.params.orderId, {
			include: [{model: Product}]
		});
		// OB/JL: if no order maybe send 404 instead (or not)
		if (order && req.user && req.user.id === order.ownerId) {
			return res.json(order);
		}
		res.status(401).send('Unauthorized');
	} catch (error) {
		next(error);
	}
});

router.post('/', async (req, res, next) => {
	try {
		if (!req.user) {
			return res.status(401).send('Unauthorized');
		}

		const {ownerId, products} = req.body;
		const order = await Order.create({ownerId});
		// OB/JL: "eager" create
		/*
		Order.create({
			stuff,
			orderLineItems: [{
				otherStuff
			}]
		}, {include: [OrderLineItem]})
		*/
		if (Array.isArray(products)) {
			for (const product of products) {
				// OB/JL: is async, make sure to `await`
				order.addProduct(product.id, {
					through: {quantity: product.quantity || 1}
				});
			}
		}

		const withProducts = await Order.findById(order.id, {include: [Product]});
		res.status(201).json(withProducts);
	} catch (error) {
		next(error);
	}
});

// OB/JL: the route structure is less standard, PUT /api/orders/1/3 it's not obvious that 3 is a product id (this route is not RESTful), include product id the body or /api/orders/1/products/3 (something like that)
router.put('/:orderId/:productId', async (req, res, next) => {
	try {
		const order = await Order.findById(req.params.orderId, {
			include: [Product]
		});
		if (!order) {
			return next();
		}

		if (order.products.find(p => p.id === Number(req.params.productId))) {
			// need to update
			// OB/JL: could use request body for PUT (more standard)
			if (!req.query.quantity) {
				return res.status(400).json({error: 'quantity must be specified'});
			}

			await OrderLineItem.update(
				{quantity: req.query.quantity},
				{where: req.params}
			);
		} else {
			// need to link product to order
			await order.addProduct(req.params.productId, {
				through: {quantity: req.query.quantity || 1}
			});
		}

		const withProducts = await Order.findById(order.id, {include: [Product]});
		res.status(200).json(withProducts);
	} catch (error) {
		next(error);
	}
});

router.delete('/:orderId', async (req, res, next) => {
	if (!req.user) return next();
	// OB/JL: line 91 is probably not needed because of line 89
	const userId = (req.user && req.user.id) || 0;
	try {
		const numDeleted = await Order.destroy({
			where: {id: req.params.orderId, ownerId: userId}
		});
		if (numDeleted) {
			res.status(204).end();
		} else {
			next();
		}
	} catch (error) {
		next(error);
	}
});

// OB/JL: you could wrap this up into the same PUT route above, and have a hook for deleting when quantity is 0; or you might make a model method `.updateQuantity`
router.delete('/:orderId/:productId', async (req, res, next) => {
	if (!req.user) return next();
	try {
		const order = await Order.findById(req.params.orderId);
		if (req.user.id !== order.ownerId) return res.sendStatus(401);
		const numDeleted = await OrderLineItem.destroy({where: req.params});
		if (numDeleted) res.sendStatus(204);
		else next();
	} catch (error) {
		next(error);
	}
});

module.exports = router;
