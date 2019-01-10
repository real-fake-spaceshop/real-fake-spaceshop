import React from 'react';
import PropTypes from 'prop-types';
import ValidatedFormPresentational from './validatedFormPresentational';

/**
 * A form that easily provides support for validating form and
 * showing useful messages to the users
 */
export default class ValidatedForm extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {};
	}

	handleSubmit = evt => {
		evt.preventDefault();
		this.props.submit(this.state.values);
	};

	handleChange = evt => {
		this.setState({[evt.target.name]: evt.target.value});
	};

	render() {
		return (
			<ValidatedFormPresentational
				onSubmit={this.handleSubmit}
				onChange={this.handleChange}
				inputs={this.props.inputs}
			/>
		);
	}
}

ValidatedForm.propTypes = {
	/** Callback function to call when the user submits the form */
	submit: PropTypes.func.isRequired,
	/** Array respresenting all inputs to be displayed and their datatypes and options */
	inputs: PropTypes.arrayOf(
		PropTypes.shape({
			/** name of input */
			name: PropTypes.string,
			/** input data type */
			type: PropTypes.string,
			/** extra props to apply to input component */
			options: PropTypes.object
		}).isRequired
	)
};
