import React from 'react';
import {connect} from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

export const ShoppingCart = ({cart}) => {
	const products = cart.products;
	return (
		<div>
			<Typography variant="h4">Shopping Cart</Typography>
			<List>
				{Array.isArray(products) &&
					products.map(product => (
						<ListItem key={product.id}>
							<ListItemAvatar>
								<Avatar src={product.imageUrl} />
							</ListItemAvatar>
							<ListItemText
								primary={product.name}
								secondary={`Quantity: ${product.order_line_item.quantity}`}
							/>
							<ListItemSecondaryAction>
								<IconButton aria-label="add">
									<AddIcon />
								</IconButton>
								<IconButton aria-label="subtract">
									<RemoveIcon />
								</IconButton>
								<IconButton aria-label="delete">
									<DeleteIcon />
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					))}
			</List>
		</div>
	);
};

const mapStateToProps = state => ({
	cart: state.user.shoppingCart
});

export default connect(mapStateToProps)(ShoppingCart);
