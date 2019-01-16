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
import Card from '@material-ui/core/Card';
import styles from '../styles';
import {addToCart, removeFromCart, me} from '../store';

export const ShoppingCart = ({cart, increase, decrease, remove, classes}) => {
	const products = cart && cart.products;
	const increaseSafe = (cartId, product) =>
		typeof increase === 'function' && increase(cartId, product);
	const decreaseSafe = (cartId, product) =>
		typeof decrease === 'function' && decrease(cartId, product);
	const removeSafe = (cartId, product) =>
		typeof remove === 'function' && remove(cartId, product);
	const createListActions = product => (
		<ListItemSecondaryAction>
			<IconButton
				aria-label="increase"
				onClick={() => increaseSafe(cart.id, product)}>
				<AddIcon />
			</IconButton>
			<IconButton
				aria-label="decrease"
				onClick={() => decreaseSafe(cart.id, product)}>
				<RemoveIcon />
			</IconButton>
			<IconButton
				aria-label="delete"
				onClick={() => removeSafe(cart.id, product)}>
				<DeleteIcon />
			</IconButton>
		</ListItemSecondaryAction>
	);

	return (
		<Card className={classes.cart}>
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
		</Card>
	);
};

const mapStateToProps = state => ({
	cart: state.user.shoppingCart
});

const mapDispatchToProps = dispatch => ({
	increase: async (cartId, product) => {
		await dispatch(
			addToCart(cartId, product.id, product.order_line_item.quantity + 1)
		);
		dispatch(me());
	},
	decrease: async (cartId, product) => {
		await dispatch(
			addToCart(cartId, product.id, product.order_line_item.quantity - 1)
		);
		dispatch(me());
	},
	remove: async (cartId, product) => {
		await dispatch(removeFromCart(cartId, product.id));
		dispatch(me());
	}
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
