const router = require('express').Router();
const {Order, User} = require('../db/models');
module.exports = router;

const stripe = require('stripe')(
	process.env.STRIPE_SECRET || 'sk_test_4eC39HqLyjWDarjtT1zdp7dc'
);

router.post('/charge', async (req, res, next) => {
	const total = req.user.shoppingCart.products.reduce(
		(t, p) => t + p.price * p.order_line_item.quantity,
		0
	);

	try {
		const {status} = await stripe.charges.create({
			amount: total,
			currency: 'usd',
			description: `Real Fake Spaceshop Order#${req.user.shoppingCartId}`,
			source: req.body.token
		});

		await (await User.findById(req.user.id)).setShoppingCart(null);
		await Order.update({submitted: true}, {where: {ownerId: req.user.id}});

		res.json({status, order: req.user.shoppingCart});
	} catch (err) {
		next(err);
	}
});
