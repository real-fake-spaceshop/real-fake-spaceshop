import React from 'react';
import {connect} from 'react-redux';
import MaterialUIForm from 'react-material-ui-form';
import TextField from '@material-ui/core/TextField';
import {Button, Card} from '@material-ui/core';
import {withStyles} from '@material-ui/styles';
import {login} from '../store';
import styles from '../styles';

class LoginPage extends React.Component {
	submit = ({email, password}) => {
		this.props.sendLogin(email, password);
	};
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
							required
						/>
						<TextField
							label="Password"
							type="password"
							value=""
							name="password"
							variant="outlined"
							className={this.props.classes.textField}
							required
						/>
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

const mapDispatchToProps = dispatch => ({
	sendLogin: (email, password) => dispatch(login(email, password))
});

export default withStyles(styles)(connect(null, mapDispatchToProps)(LoginPage));
