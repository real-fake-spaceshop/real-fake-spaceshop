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
import Card from '@material-ui/core/Card';
import styles from '../styles';

let searchFilter = '';

class AllProducts extends React.Component {
	handleChange = event => {
		searchFilter = event.target.value;
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

		return (
			<div>
				<Card className={this.props.classes.filterBar}>
					<FormControl component="fieldset">
						<FormLabel
							component="legend"
							className={this.props.classes.catTitle}>
							Available Ships
						</FormLabel>
						<RadioGroup
							aria-label="Filter By:"
							name="filters"
							value={searchFilter}
							onChange={this.handleChange}
							className={this.props.classes.filter}>
							<FormControlLabel
								value="PriceLowHigh"
								control={<Radio />}
								label="Price (Low - High)"
								className={this.props.classes.filterChoice}
								classes={{
									label: this.props.classes.white
								}}
							/>
							<FormControlLabel
								value="PriceHighLow"
								control={<Radio />}
								label="Price (High - Low)"
								className={this.props.classes.filterChoice}
								classes={{
									label: this.props.classes.white
								}}
							/>
							<FormControlLabel
								value="AlphabeticalAZ"
								control={<Radio />}
								label="Alphabetical (A - Z)"
								className={this.props.classes.filterChoice}
								classes={{
									label: this.props.classes.white
								}}
							/>
							<FormControlLabel
								value="AlphabeticalZA"
								control={<Radio />}
								label="Alphabetical (Z - A)"
								className={this.props.classes.filterChoice}
								classes={{
									label: this.props.classes.white
								}}
							/>
						</RadioGroup>
					</FormControl>
				</Card>

				<Grid container spacing={16}>
					<Grid item xs={12}>
						<Grid container justify="center">
							{products.map(product => (
								<Grid key={product.id} item>
									<Card className={this.props.classes.catalogueItem}>
										<Link to={`/catalogue/${product.id}`}>
											<CardActionArea className="classes.card">
												<CardMedia
													className={this.props.classes.media}
													image={product.imageUrl}
													title={product.name}
												/>
												<CardContent>
													<img src={product.imageUrl} width="250px" />
													<Typography
														gutterBottom
														variant="h5"
														component="h2"
														align="center"
														className={this.props.classes.white}>
														{product.name}
													</Typography>
													<Typography
														component="p"
														className={this.props.classes.white}>
														{'$' + product.price}
													</Typography>
												</CardContent>
											</CardActionArea>
										</Link>
									</Card>
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

export default connect(mapState, mapDispatch)(withStyles(styles)(AllProducts));

AllProducts.propTypes = {
	allProducts: PropTypes.array.isRequired
};
