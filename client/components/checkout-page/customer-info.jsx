import React from 'react';
import {withStyles} from '@material-ui/styles';
import MaterialUIForm from 'react-material-ui-form';
import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core';
import {styles} from '../signup-page';

const CustomerInfo = ({onSubmit, classes}) => {
	return (
		<MaterialUIForm onSubmit={onSubmit}>
			<fieldset className={classes.container}>
				<legend>Customer Info</legend>
				<TextField
					label="Customer Name"
					name="name"
					value=""
					variant="outlined"
					className={classes.textField}
				/>
			</fieldset>
		</MaterialUIForm>
	);
};

export default withStyles(styles)(CustomerInfo);
