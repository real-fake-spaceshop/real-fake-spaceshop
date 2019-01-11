import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getAllProducts} from '../store';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import lifecycle from 'react-pure-lifecycle';

const styles = {
	root: {
		flexGrow: 1
	},
	paper: {
		height: 250,
		width: 200,
		margin: 5
	},
	control: {
		padding: 2
	}
};

const methods = {
	async componentDidMount(props) {
		await props.getProducts();
	}
};

const AllProducts = ({allProducts, classes}) => (
	<div>
		<Grid container className={classes.root} spacing={16}>
			<Grid item xs={12}>
				<Grid container className={classes.demo} justify="center">
					{allProducts.map(product => (
						<Grid key={product.id} item>
							<Paper className={classes.paper}>
								<img src={product.imageUrl} width="175px" />
								<div display="flex">
									{product.name}
									{'      $' + product.price}
								</div>
							</Paper>
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

export default connect(mapState, mapDispatch)(
	lifecycle(methods)(withStyles(styles)(AllProducts))
);

AllProducts.propTypes = {
	allProducts: PropTypes.array.isRequired
};
