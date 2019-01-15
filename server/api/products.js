const router = require('express').Router();
const {Product} = require('../db/models');

router.get('/', async (req, res, next) => {
	try {
		const products = await Product.findAll();
		res.json(products);
	} catch (err) {
		next(err);
	}
});

router.get('/:productId', async (req, res, next) => {
	try {
		const product = await Product.findOne({
			where: {
				id: req.params.productId
			}
		});
		res.json(product);
	} catch (err) {
		next(err);
	}
});

router.post('/', async (req, res, next) => {
	// OB/JL: access control (delete this?)
	try {
		const newProduct = await Product.create(req.body);
		res.json(newProduct);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
