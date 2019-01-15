const router = require('express').Router();
module.exports = router;

const stripe = require('stripe')(
	process.env.STRIPE_SECRET || 'sk_test_4eC39HqLyjWDarjtT1zdp7dc'
);

router.post('/charge', async (req, res, next) => {
	try {
		const {status} = await stripe.charges.create({
			amount: 2000,
			currency: 'usd',
			description: 'An Example charge',
			source: req.body.token
		});

		res.json({status});
	} catch (err) {
		next(err);
	}
});
