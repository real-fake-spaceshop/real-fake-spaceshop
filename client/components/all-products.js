import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getAllProducts} from '../store';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const classes = {
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
	},
	group: {
		margin: `5px 0`
	},
	formControl: {
		margin: 3
	}
};

let searchFilter = '';

class AllProducts extends React.Component {
	handleChange = event => {
		searchFilter = event.target.value;
		console.log('searchFilter is now ' + searchFilter);
		this.render();
		this.forceUpdate();
	};
	async componentDidMount() {
		await this.props.getProducts();
	}
	render() {
		let products = [];
		if (this.props.allProducts) {
			products = this.props.allProducts;
		}
		let newArray = [];

		if (searchFilter === 'PriceLowHigh') {
			newArray = products.sort(function(a, b) {
				return a.price - b.price;
			});
			products = newArray;
		} else if (searchFilter === 'PriceHighLow') {
			newArray = products.sort(function(a, b) {
				return b.price - a.price;
			});
			products = newArray;
		} else if (searchFilter === 'AlphabeticalAZ') {
			newArray = products.sort(function(a, b) {
				const nameA = a.name.toLowerCase(),
					nameB = b.name.toLowerCase();
				if (nameA < nameB) return -1;
				if (nameA > nameB) return 1;
				return 0;
			});
			products = newArray;
		} else if (searchFilter === 'AlphabeticalZA') {
			newArray = products.sort(function(a, b) {
				const nameA = a.name.toLowerCase(),
					nameB = b.name.toLowerCase();
				if (nameA < nameB) return 1;
				if (nameA > nameB) return -1;
				return 0;
			});
			products = newArray;
		}

		console.log('IN RENDER');
		console.log(products);

		return (
			<div>
				<FormControl component="fieldset" className={classes.formControl}>
					<FormLabel component="legend">Filter By:</FormLabel>
					<RadioGroup
						aria-label="Filter By:"
						name="filters"
						className={classes.group}
						value={searchFilter}
						onChange={this.handleChange}>
						<FormControlLabel
							value="PriceLowHigh"
							control={<Radio />}
							label="Price (Low - High)"
						/>
						<FormControlLabel
							value="PriceHighLow"
							control={<Radio />}
							label="Price (High - Low)"
						/>
						<FormControlLabel
							value="AlphabeticalAZ"
							control={<Radio />}
							label="Alphabetical (A - Z)"
						/>
						<FormControlLabel
							value="AlphabeticalZA"
							control={<Radio />}
							label="Alphabetical (Z - A)"
						/>
					</RadioGroup>
				</FormControl>

				<Grid container className={classes.root} spacing={16}>
					<Grid item xs={12}>
						<Grid container className={classes.demo} justify="center">
							{products.map(product => (
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
												<Typography component="p">
													{'$' + product.price}
												</Typography>
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
	}
}

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

export default connect(mapState, mapDispatch)(withStyles(classes)(AllProducts));

AllProducts.propTypes = {
	allProducts: PropTypes.array.isRequired
};
