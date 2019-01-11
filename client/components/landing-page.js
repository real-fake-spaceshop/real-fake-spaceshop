import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

export const LandingPage = () => {
	return (
		<div>
			<div>
				<h1>Real Fake Spaceships!</h1>
			</div>
			<div>
				<img id="splash-logo" src="/images/default_ship_transparent.png" />
			</div>
			<div>
				<button>Login</button>
			</div>
			<div>
				<button>Sign Up</button>
			</div>
			<div>
				<button>Product Catalogue</button>
			</div>
		</div>
	);
};
