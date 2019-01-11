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

export const ShoppingCart = ({products}) => {
	return (
		<div>
			<Typography variant="h4">Shopping Cart</Typography>
			<List>
				{products.map(product => (
					<ListItem key={product.id}>
						<ListItemAvatar>
							<Avatar src={product.imageUrl} />
						</ListItemAvatar>
						<ListItemText primary={product.name} />
						<ListItemSecondaryAction>
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
	products: state.user.shoppingCart
});

export default connect(mapStateToProps)(ShoppingCart);
