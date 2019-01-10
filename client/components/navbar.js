import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {withStyles} from '@material-ui/core/styles';

const styles = {
	root: {
		display: 'flex',
		flexDirection: 'row'
	},
	catBut: {
		flexGrow: 3
	},
	logo: {
		flexGrow: 6,
		alignItems: 'center',
		justifyContent: 'center'
	},
	login: {
		flexGrow: 1
	},
	signUp: {
		flexGrow: 1
	},
	cart: {
		flexGrow: 1
	}
};

const Navbar = ({handleClick, isLoggedIn, classes}) => (
	<div>
		<AppBar position="static">
			<Toolbar className={classes.root}>
				<Link to="/catalogue" className={classes.catBut}>
					<Button color="secondary">Product Catalogue</Button>
				</Link>
				<Link to="/" className={classes.logo}>
					<img id="nav-rocket" src="/images/flat_rocket.svg" />
				</Link>
				<Link to="/login" className={classes.login}>
					<Button color="secondary">Login</Button>
				</Link>
				<Link to="/signup" className={classes.signUp}>
					<Button color="secondary">Sign Up</Button>
				</Link>
				<Link to="/cart" className={classes.cart}>
					<img id="nav-rocket" src="/images/cart.png" />
				</Link>
			</Toolbar>
		</AppBar>
	</div>

	// <div>
	// 	<nav>
	// 		{isLoggedIn ? (
	// 			<div>
	// 				{/* The navbar will show these links after you log in */}
	// 				<Link to="/home">Home</Link>
	// 				<a href="#" onClick={handleClick}>
	// 					Logout
	// 				</a>
	// 			</div>
	// 		) : (
	// 				<Grid container spacing={16}>
	// 					{/* The navbar will show these links before you log in */}
	// 					<Grid item xs={12}>
	// 						<Link to="/catalogue">
	// 							<Button variant="contained" color="primary">
	// 								Product Catalogue
	// 					</Button>
	// 						</Link>
	// 					</Grid>
	// 					<Grid item xs={12}>
	// 						<img id="nav-rocket" src="/images/flat_rocket.svg" />
	// 					</Grid>
	// 					<Grid item xs={12}>
	// 						<Link to="/login">
	// 							<Button variant="contained" color="primary">
	// 								Login
	// 					</Button>
	// 						</Link>
	// 					</Grid>
	// 					<Grid item xs={12}>
	// 						<Link to="/signup">
	// 							<Button variant="contained" color="primary">
	// 								Sign Up
	// 					</Button>
	// 						</Link>
	// 					</Grid>
	// 					<Grid item xs={12}>
	// 						<Link to="/cart">
	// 							<Button variant="contained" color="primary">
	// 								Cart
	// 					</Button>
	// 						</Link>
	// 					</Grid>
	// 				</Grid>
	// 			)}
	// 	</nav>
	// 	<hr />
	// </div>
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

export default connect(mapState, mapDispatch)(withStyles(styles)(Navbar));

/**
 * PROP TYPES
 */
Navbar.propTypes = {
	handleClick: PropTypes.func.isRequired,
	isLoggedIn: PropTypes.bool.isRequired
};
