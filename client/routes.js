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
				<Route path="/login" render={props => <LoginPage {...props} />} /> />
				<Route path="/signup" render={props => <SignupPage {...props} />} /> />
				<Route
					path="/catalogue/:id"
					render={props => <SingleProduct {...props} />}
				/>
				/>
				<Route path="/catalogue" render={props => <AllProducts {...props} />} />
				/>
				<Route path="/cart" render={props => <ShoppingCart {...props} />} /> />
				<Route path="/checkout" render={props => <CheckoutPage {...props} />} />
				/>
				{isLoggedIn && (
					/* Routes placed here are only available after logging in */
					<Route path="/home" render={props => <UserHome {...props} />} />
				)}
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
