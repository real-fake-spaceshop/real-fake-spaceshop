import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getAllProducts} from '../store';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import lifecycle from 'react-pure-lifecycle';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import {Link} from 'react-router-dom';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
	root: {
		flexGrow: 1
	},
	paper: {
		height: 300,
		width: 250,
		margin: 8
	},
	control: {
		padding: 2
	},
	media: {
		width: 250
	},
	card: {
		display: 'flex',
		flexDirection: 'column',
		margin: 5
	},
	flex: {
		display: 'flex'
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
							<Link to={`/catalogue/${product.id}`}>
								<CardActionArea className="classes.card">
									<CardMedia
										className={classes.media}
										image={product.imageUrl}
										title={product.name}
									/>
									<CardContent className="classes.flex">
										<img src={product.imageUrl} width="250px" />
										<Typography
											gutterBottom
											variant="h5"
											component="h2"
											align="center">
											{product.name}
										</Typography>
										<Typography component="p">{'$' + product.price}</Typography>
									</CardContent>
								</CardActionArea>
							</Link>
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
