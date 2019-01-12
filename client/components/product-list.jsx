import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

const ProductList = ({products, before, after}) => {
	return (
		<List>
			{products.map(product => (
				<ListItem key={product.id}>
					{typeof before === 'function' && before(product)}
					<ListItemAvatar>
						<Avatar src={product.imageUrl} />
					</ListItemAvatar>
					<ListItemText
						primary={product.name}
						secondary={`Quantity: ${product.order_line_item.quantity}`}
					/>
					{typeof after === 'function' && after(product)}
				</ListItem>
			))}
		</List>
	);
};

export default ProductList;

ProductList.propTypes = {
	/** An array of objects containing product information */
	products: PropTypes.arrayOf(PropTypes.object).isRequired,
	/** Function called with product as argument that returns content
	 * to render before autogenerated content */
	before: PropTypes.func,
	/** As `before` but content is placed after autogenerated content */
	after: PropTypes.func
};