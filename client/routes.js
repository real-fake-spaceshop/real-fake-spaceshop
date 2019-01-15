import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
	SignupPage,
	UserHome,
	LandingPage,
	AllProducts,
	SingleProduct,
	LoginPage,
	ShoppingCart,
	CheckoutPage
} from './components';

import {me} from './store';

/**
 * COMPONENT
 */
class Routes extends Component {
	componentDidMount() {
		this.props.loadInitialData();
	}

	render() {
		const {isLoggedIn} = this.props;

		return (
			<Switch>
				{/* Routes placed here are available to all visitors */}
				<Route path="/login" component={LoginPage} />
				<Route path="/signup" component={SignupPage} />
				<Route path="/catalogue/:id" component={SingleProduct} />
				<Route path="/catalogue" component={AllProducts} />
				<Route path="/cart" component={ShoppingCart} />
				<Route path="/checkout" component={CheckoutPage} />
				{isLoggedIn && [
					/* Routes placed here are only available after logging in */
					<Route path="/home" component={UserHome} key="home" />
				]}

				{/* Displays our Landing page as a fallback */}
				<Route path="/" render={props => <LandingPage {...props} />} />
			</Switch>
		);
	}
}

/**
 * CONTAINER
 */
const mapState = state => {
	return {
		// Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
		// Otherwise, state.user will be an empty object, and state.user.id will be falsey
		isLoggedIn: !!state.user.id
	};
};

const mapDispatch = dispatch => {
	return {
		loadInitialData() {
			dispatch(me());
		}
	};
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
Routes.propTypes = {
	loadInitialData: PropTypes.func.isRequired,
	isLoggedIn: PropTypes.bool.isRequired
};
