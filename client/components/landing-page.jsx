import React from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {enqueueError} from '../store';

const styles = {
	logo: {
		height: 500,
		width: 'auto'
	}
};
class LandingPage extends React.Component {
	componentDidMount() {
		const {pathname} = this.props.location;
		if (pathname !== '/') {
			this.props.enqueueError(`Page ${pathname} does not exist`);
		}
	}

	render() {
		const {classes} = this.props;
		return (
			<div>
				<Card>
					<CardHeader title="Real Fake Spaceships!" />
					<CardContent>
						<img
							src="/images/default_ship_transparent.png"
							className={classes.logo}
						/>
					</CardContent>
					<Link to="/login">
						<Button>Login</Button>
					</Link>
					<Link to="/signup">
						<Button>Sign Up</Button>
					</Link>
					<Link to="/catalogue">
						<Button>Available Ships</Button>
					</Link>
				</Card>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	enqueueError: message => dispatch(enqueueError(message))
});

export default withStyles(styles)(
	connect(null, mapDispatchToProps)(LandingPage)
);
