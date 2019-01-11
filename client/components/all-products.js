import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getAllProducts} from '../store';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import lifecycle from 'react-pure-lifecycle';

const methods = {
	async componentDidMount(props) {
		await props.getProducts();
	}
};

const AllProducts = ({allProducts, handleClick}) => (
	<div>
		<Grid container spacing={16}>
			<Grid item xs={12}>
				<Grid container justify="center">
					{allProducts.map(product => (
						<Grid key={product.id} item>
							<Paper onClick={handleClick} />
						</Grid>
					))}
				</Grid>
			</Grid>
		</Grid>
	</div>
);

const mapState = state => {
	return {
		allProducts: state.allProducts
	};
};

const mapDispatch = dispatch => {
	return {
		getProducts: () => dispatch(getAllProducts())
	};
};

export default connect(mapState, mapDispatch)(lifecycle(methods)(AllProducts));

AllProducts.propTypes = {
	allProducts: PropTypes.array.isRequired
};
