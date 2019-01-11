import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ProductList from './product-list';

export const ShoppingCart = ({cart, increase, decrease, remove}) => {
	const products = cart.products;
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
			<ProductList products={products} after={createListActions} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);

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
