import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const ValidatedFormPresentational = props => {
	const inputs = props.inputs.map(input => {
		const inputProps = {
			...input.props,
			id: input.name,
			key: input.name,
			name: input.name,
			onChange: props.onChange
		};

		if (props.onChange) {
			inputProps.value = input.value;
		}

		switch (input.type) {
			default:
				return <TextField {...inputProps} />;
		}
	});
	return <form onSubmit={props.onSubmit}>{inputs}</form>;
};

export default ValidatedFormPresentational;

ValidatedFormPresentational.propTypes = {
	/** Callback function to call when the user submits the form */
	onSubmit: PropTypes.func.isRequired,
	/** Callback function to call when an input changes. If no callback is provided, inputs will be uncontrolled */
	onChange: PropTypes.func,
	/** Array respresenting all inputs to be displayed and their datatypes and options */
	inputs: PropTypes.arrayOf(
		PropTypes.shape({
			/** name of input */
			name: PropTypes.string.isRequired,
			/** input data type */
			type: PropTypes.string.isRequired,
			/** Label to display the input with */
			label: PropTypes.string,
			/** Default value to give to input */
			defaultValue: PropTypes.any,
			/** Value to apply to input */
			value: PropTypes.any,
			/** extra props to apply to input component */
			props: PropTypes.object
		})
	).isRequired
};
