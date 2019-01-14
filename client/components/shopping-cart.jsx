import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ProductList from './product-list';

const styles = {
	checkout: {
		float: 'right'
	}
};

export const ShoppingCart = ({cart, increase, decrease, remove, classes}) => {
	const products = cart && cart.products;
	const increaseSafe = product =>
		typeof increase === 'function' && increase(product);
	const decreaseSafe = product =>
		typeof decrease === 'function' && decrease(product);
	const removeSafe = product => typeof remove === 'function' && remove(product);
	const createListActions = product => (
		<ListItemSecondaryAction>
			<IconButton aria-label="increase" onClick={() => increaseSafe(product)}>
				<AddIcon />
			</IconButton>
			<IconButton aria-label="decrease" onClick={() => decreaseSafe(product)}>
				<RemoveIcon />
			</IconButton>
			<IconButton aria-label="delete" onClick={() => removeSafe(product)}>
				<DeleteIcon />
			</IconButton>
		</ListItemSecondaryAction>
	);

	return (
		<div>
			<Typography variant="h4">Shopping Cart</Typography>
			{products && (
				<ProductList products={products} after={createListActions} />
			)}
			<Link to="/checkout">
				<Button
					color="primary"
					variant="contained"
					className={classes.checkout}>
					Checkout
				</Button>
			</Link>
		</div>
	);
};

const mapStateToProps = state => ({
	cart: state.user.shoppingCart
});

const mapDispatchToProps = dispatch => ({
	increase: product => console.log(`increasing product id ${product.id}`),
	decrease: product => console.log(`decreasing product id ${product.id}`),
	remove: product => console.log(`removing product id ${product.id}`)
});

export default connect(mapStateToProps, mapDispatchToProps)(
	withStyles(styles)(ShoppingCart)
);

ShoppingCart.propTypes = {
	/** An object representing the shopping cart data */
	cart: PropTypes.object,
	/** Callback called with the product object when the increase button is hit */
	increase: PropTypes.func,
	/** Callback called with the product object when the decrease button is hit */
	decrease: PropTypes.func,
	/** Callback called with the product object when the delete button is hit */
	remove: PropTypes.func
};
