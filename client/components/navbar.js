import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';
import Button from '@material-ui/core/Button';

const Navbar = ({handleClick, isLoggedIn}) => (
	<div>
		<nav>
			{isLoggedIn ? (
				<div>
					{/* The navbar will show these links after you log in */}
					<Link to="/home">Home</Link>
					<a href="#" onClick={handleClick}>
						Logout
					</a>
				</div>
			) : (
				<div>
					{/* The navbar will show these links before you log in */}
					<Link to="/catalogue">
						<Button variant="contained" color="primary">
							Product Catalogue
						</Button>
					</Link>
					<div>
						<img id="nav-rocket" src="/images/flat_rocket.svg" />
					</div>
					<Link to="/login">
						<Button variant="contained" color="primary">
							Login
						</Button>
					</Link>
					<Link to="/signup">
						<Button variant="contained" color="primary">
							Sign Up
						</Button>
					</Link>
					<Link to="/cart">
						<Button variant="contained" color="primary">
							Cart
						</Button>
					</Link>
				</div>
			)}
		</nav>
		<hr />
	</div>
);

/**
 * CONTAINER
 */
const mapState = state => {
	return {
		isLoggedIn: !!state.user.id
	};
};

const mapDispatch = dispatch => {
	return {
		handleClick() {
			dispatch(logout());
		}
	};
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
	handleClick: PropTypes.func.isRequired,
	isLoggedIn: PropTypes.bool.isRequired
};
