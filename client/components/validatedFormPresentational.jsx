import React from 'react';
import PropTypes from 'prop-types';

const ValidatedFormPresentational = props => {
	return <form />;
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
			name: PropTypes.string,
			/** input data type */
			type: PropTypes.string,
			/** extra props to apply to input component */
			options: PropTypes.object
		})
	).isRequired
};
