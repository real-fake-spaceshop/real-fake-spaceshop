import React from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {StripeProvider, Elements} from 'react-stripe-elements';
import ProductsTable from './products-table';
import CustomerInfo from './customer-info';

class CheckoutPage extends React.Component {
	processCheckout = evt => {};

	render() {
		const {handleCheckout, products} = this.props;
		return (
			<div>
				<Typography variant="h3" align="center">
					Checkout
				</Typography>
				<Paper>
					<ProductsTable products={products} />
				</Paper>
				<StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
					<Elements>
						<CustomerInfo onSubmit={this.processCheckout} />
					</Elements>
				</StripeProvider>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	products: state.user?.shoppingCart?.products
});

const mapDispatchToProps = dispatch => ({
	handleCheckout: () => {} // FIXME
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
