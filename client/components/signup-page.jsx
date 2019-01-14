import React from 'react';
import {connect} from 'react-redux';
import MaterialUIForm from 'react-material-ui-form';
import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core';
import {withStyles, createStyles} from '@material-ui/styles';
import {signup} from '../store';

export const styles = createStyles({
	container: {
		display: 'flex',
		flexDirection: 'column'
	},
	textField: {
		flexGrow: 0,
		width: 300,
		marginTop: 16,
		marginLeft: 'auto',
		marginRight: 'auto'
	},
	submit: {
		marginTop: 16,
		marginLeft: 'auto',
		marginRight: 'auto'
	}
});

class SignupPage extends React.Component {
	submit = values => {
		this.props.sendSignup(values);
	};

	render() {
		return (
			<MaterialUIForm onSubmit={this.submit}>
				<fieldset className={this.props.classes.container}>
					<legend>Create User</legend>
					<TextField
						label="Full Name"
						type="text"
						value=""
						name="name"
						variant="outlined"
						className={this.props.classes.textField}
						required
					/>
					<TextField
						label="Email"
						type="email"
						value=""
						name="email"
						variant="outlined"
						data-validators="isEmail,isRequired"
						className={this.props.classes.textField}
					/>
					<TextField
						label="Password"
						type="password"
						value=""
						name="password"
						variant="outlined"
						className={this.props.classes.textField}
					/>
					<TextField
						label="Confirm Password"
						type="password"
						value=""
						name="password2"
						variant="outlined"
						className={this.props.classes.textField}
					/>
					<TextField
						label="Address"
						type="text"
						value=""
						name="address"
						variant="outlined"
						className={this.props.classes.textField}
					/>
					<Button
						className={this.props.classes.submit}
						variant="contained"
						type="submit"
						color="primary">
						Submit
					</Button>
				</fieldset>
			</MaterialUIForm>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	sendSignup: userData => {
		dispatch(signup(userData));
	}
});

export default withStyles(styles)(
	connect(null, mapDispatchToProps)(SignupPage)
);
