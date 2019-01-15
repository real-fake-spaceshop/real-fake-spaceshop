import React from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ProductsTable from './products-table';
import CustomerInfo from './customer-info';

const CheckoutPage = ({handleCheckout, products}) => {
	return (
		<div>
			<Typography variant="h3" align="center">
				Checkout
			</Typography>
			<Paper>
				<ProductsTable products={products} />
			</Paper>
			<CustomerInfo onSubmit={handleCheckout} />
		</div>
	);
};

const mapStateToProps = state => ({
	products: state.user?.shoppingCart?.products
});

const mapDispatchToProps = dispatch => ({
	handleCheckout: () => {} // FIXME
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
