import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Badge from '@material-ui/core/Badge';
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
	navItem: {
		flexGrow: 1
	}
};

const Navbar = ({handleClick, isLoggedIn, classes, cartCount}) => (
	<div>
		<AppBar position="static">
			<Toolbar className={classes.root}>
				<div className={classes.catBut}>
					<Link to="/catalogue">
						<Button color="secondary">Product Catalogue</Button>
					</Link>
				</div>
				<div className={classes.logo}>
					<Link to="/">
						<img id="nav-rocket" src="/images/flat_rocket.svg" />
					</Link>
				</div>

				{isLoggedIn ? (
					<React.Fragment>
						<div className={classes.navItem}>
							<Link to="/home">
								<Button color="secondary">Home</Button>
							</Link>
						</div>

						<div className={classes.navItem}>
							<Button color="secondary" onClick={handleClick}>
								Logout
							</Button>
						</div>
					</React.Fragment>
				) : (
					<React.Fragment>
						<div className={classes.navItem}>
							<Link to="/login">
								<Button color="secondary">Login</Button>
							</Link>
						</div>

						<div className={classes.navItem}>
							<Link to="/signup">
								<Button color="secondary">Sign Up</Button>
							</Link>
						</div>
					</React.Fragment>
				)}
				<div className={classes.navItem}>
					<Badge
						color="secondary"
						invisible={!cartCount}
						badgeContent={cartCount}>
						<Link to="/cart">
							<img id="nav-rocket" src="/images/cart.png" />
						</Link>
					</Badge>
				</div>
			</Toolbar>
		</AppBar>
	</div>
);

/**
 * CONTAINER
 */
const mapState = state => ({
	isLoggedIn: !!state.user.id,
	cartCount: state?.user?.shoppingCart?.products?.length || 0
});

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
