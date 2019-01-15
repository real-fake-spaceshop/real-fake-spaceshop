import React from 'react';
import {connect} from 'react-redux';
import MaterialUIForm from 'react-material-ui-form';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

import {CardElement, injectStripe} from 'react-stripe-elements';
import {submitCharge} from '../../store';

const styles = {
	form: {
		display: 'flex',
		flexDirection: 'column'
	},
	card: {
		backgroundColor: '#aaaaaa',
		padding: 20
	}
};

class CustomerInfo extends React.Component {
	state = {name: '', address: ''};

	submit = async values => {
		const {token} = await this.props.stripe.createToken(values);
		console.log(token);
		this.props.submitCharge(token);
	};

	handleChange = evt => {
		this.setState({[evt.target.name]: evt.target.value});
	};

	static getDerivedStateFromProps(props) {
		const {name, address} = props;
		return {name, address};
	}

	render() {
		return (
			<div>
				<Typography variant="h6" align="center">
					Enter Payment Info
				</Typography>
				<Card className={this.props.classes.card}>
					<MaterialUIForm
						className={this.props.classes.form}
						onSubmit={this.submit}>
						<TextField
							label="Full Name"
							type="text"
							value={this.state.name}
							onChange={this.handleChange}
							name="name"
							variant="outlined"
							required
						/>
						<TextField
							label="Address"
							type="text"
							value={this.state.address}
							onChange={this.handleChange}
							name="address_line_1"
							variant="outlined"
							required
						/>
						<CardElement />
						<Button variant="contained" type="submit" color="primary">
							Purchase
						</Button>
						<Typography color="error" variant="body2" align="center">
							{this.props.error}
						</Typography>
					</MaterialUIForm>
				</Card>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	error: state.stripe.error,
	name: state.user.name,
	address: state.user.address
});

const mapDispatchToProps = dispatch => ({
	submitCharge: token => dispatch(submitCharge(token))
});

export default withStyles(styles)(
	injectStripe(connect(mapStateToProps, mapDispatchToProps)(CustomerInfo))
);
