const db = require('../db');
const router = require('express').Router();
const {Order, Product, OrderLineItem} = require('../db/models');

router.get('/:orderId', async (req, res, next) => {
	try {
		const order = await Order.findById(req.params.orderId, {
			include: [{model: Product}]
		});
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
		if (Array.isArray(products)) {
			for (const product of products) {
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

router.put('/:orderId/:productId', async (req, res, next) => {
	try {
		const order = await Order.findById(req.params.orderId, {
			include: [Product]
		});
		if (!order) {
			return next();
		}

		if (order.products.find(p => p.id === req.params.productId)) {
			// need to update
			if (!req.query.quantity) {
				return res.status(400).json({error: 'quantity must be specified'});
			}

			console.log('updating product');
			await OrderLineItem.update(
				{quantity: req.query.quantity},
				{where: req.params}
			);
		} else {
			// need to link product to order
			console.log(
				`adding product ${req.params.productId} to order ${order.id}`
			);
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

module.exports = router;
