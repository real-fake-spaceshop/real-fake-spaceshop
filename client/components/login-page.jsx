import React from 'react';
import {connect} from 'react-redux';
import MaterialUIForm from 'react-material-ui-form';
import TextField from '@material-ui/core/TextField';
import {Button, Card} from '@material-ui/core';
import {withStyles} from '@material-ui/styles';
import {login} from '../store';
import styles from '../styles';
import Typography from '@material-ui/core/Typography';

let error = '';

class LoginPage extends React.Component {
	submit = async ({email, password}) => {
		console.log('IN SUBMIT. state is....');
		console.log(this.state);
		await this.props.sendLogin(email, password);
		if (this.props.user) {
			error = this.props.user.error.response.data;
		}
		this.forceUpdate();
	};
	componentWillUnmount() {
		error = '';
	}
	render() {
		return (
			<Card className={this.props.classes.solidCard}>
				<MaterialUIForm onSubmit={this.submit}>
					<fieldset className={this.props.classes.container}>
						<legend>Login</legend>
						<TextField
							label="Email"
							type="email"
							value=""
							name="email"
							variant="outlined"
							className={this.props.classes.textField}
							data-validators="isRequired"
						/>
						<TextField
							label="Password"
							type="password"
							value=""
							name="password"
							variant="outlined"
							className={this.props.classes.textField}
							data-validators="isRequired"
						/>
						<Typography color="error" align="center">
							{error}
						</Typography>
						<Button
							className={this.props.classes.submit}
							variant="contained"
							type="submit"
							color="primary">
							Login
						</Button>
					</fieldset>
				</MaterialUIForm>
			</Card>
		);
	}
}

const mapState = state => {
	return {
		user: state.user
	};
};

const mapDispatchToProps = dispatch => ({
	sendLogin: (email, password) => dispatch(login(email, password))
});

export default withStyles(styles)(
	connect(mapState, mapDispatchToProps)(LoginPage)
);
