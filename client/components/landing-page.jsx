import React from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {enqueueError} from '../store';
import styles from '../styles';

//style overrides

styles.card.maxWidth = 700;

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
				<Card className={classes.card}>
					<CardHeader
						classes={{
							title: classes.title,
							subheader: classes.subheader
						}}
						title="Real Fake Spaceships!"
					/>
					<CardContent>
						<img
							src="/images/default_ship_transparent.png"
							className={classes.logo}
						/>
					</CardContent>
					<Link to="/login">
						<Button
							variant="contained"
							color="primary"
							className={classes.button}>
							Login
						</Button>
					</Link>
					<Link to="/signup">
						<Button
							variant="contained"
							color="primary"
							className={classes.button}>
							Sign Up
						</Button>
					</Link>
					<Link to="/catalogue">
						<Button
							variant="contained"
							color="primary"
							className={classes.button}>
							Available Ships
						</Button>
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
