import React from 'react';
import {connect} from 'react-redux';
import {withSnackbar} from 'notistack';

import {dismissSnack} from '../store';

class Notifier extends React.Component {
	displayed = [];

	storeDisplayed = id => {
		this.displayed = [...this.displayed, id];
	};

	checkAndDisplaySnacks = () => {
		const {snacks = []} = this.props;
		for (const snack of snacks) {
			// skip already displayed snakcs
			if (this.displayed.includes(snack.key)) {
				continue;
			}

			this.props.enqueueSnackbar(snack.message, snack.options);
			this.storeDisplayed(snack.key);
			this.props.removeSnack(snack.key);
		}
	};

	shouldComponentUpdate({snacks: newSnacks = []}) {
		const {snacks: currSnacks} = this.props;
		let notExists = false;
		for (const snack of newSnacks) {
			if (currSnacks.find(s => s.key === snack.key) === undefined) {
				notExists = true;
				break;
			}
		}

		return notExists;
	}

	componentDidMount() {
		this.checkAndDisplaySnacks();
	}

	componentDidUpdate() {
		this.checkAndDisplaySnacks();
	}

	render() {
		return null;
	}
}

const mapStateToProps = state => ({
	snacks: state.snacks
});

const mapDispatchToProps = dispatch => ({
	removeSnack: key => dispatch(dismissSnack(key))
});

export default connect(mapStateToProps, mapDispatchToProps)(
	withSnackbar(Notifier)
);
