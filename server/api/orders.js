const router = require('express').Router();
const {Order, Product} = require('../db/models');

router.get('/:orderId', async (req, res, next) => {
	try {
		const order = await Order.findById(req.params.orderId, {
			include: [{model: Product}]
		});
		if (order && req.user && req.user.id === order.ownerId) {
			return res.json(order);
		}
		res.send(401).send('Unauthorized');
	} catch (error) {
		next(error);
	}
});

module.exports = router;
