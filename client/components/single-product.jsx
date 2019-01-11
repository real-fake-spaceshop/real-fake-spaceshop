import React from 'react';
import {connect} from 'react-redux';
import {getProduct} from '../store';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

const styles = {
	card: {
		maxWidth: 500,
		marginTop: 50
	}
};

class SingleProduct extends React.Component {
	componentDidMount() {
		this.props.getSingleProduct(this.props.match.params.id);
	}
	render() {
		let product = this.props.singleProduct;
		const {classes} = this.props;
		return (
			<div>
				<Card className={classes.card}>
					<CardHeader title={product.name} subheader={'$ ' + product.price} />
					<CardContent>
						<img src={product.imageUrl} />
					</CardContent>
					<Typography>{product.description}</Typography>
					<Button>Add to Cart</Button>
				</Card>
			</div>
		);
	}
}

const mapState = state => {
	return {
		singleProduct: state.singleProduct
	};
};

const mapDispatch = dispatch => {
	return {
		getSingleProduct: id => dispatch(getProduct(id))
	};
};

export default connect(mapState, mapDispatch)(
	withStyles(styles)(SingleProduct)
);
