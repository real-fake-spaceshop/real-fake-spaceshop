import React from 'react';
import {connect} from 'react-redux';
import {getProduct, addToCart} from '../store';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

const styles = {
	card: {
		maxWidth: 1000,
		marginTop: 50,
		marginLeft: 'auto',
		marginRight: 'auto',
		textAlign: 'center'
	},
	button: {
		margin: '20px',
		marginTop: '10px'
	},
	desc: {
		margin: '10px'
	}
};

class SingleProduct extends React.Component {
	componentDidMount() {
		this.props.getSingleProduct(this.props.match.params.id);
	}

	handleClick = () => {
		this.props.addSingleProduct(
			this.props.user.shoppingCartId,
			this.props.singleProduct.id
		);
	};

	render() {
		let product = this.props.singleProduct;
		const {classes} = this.props;
		return (
			<div>
				<Card className={classes.card}>
					<CardContent>
						<CardHeader title={product.name} subheader={'$ ' + product.price} />
						<img src={product.imageUrl} />
						<Typography className={classes.desc}>
							{product.description}
						</Typography>
						<Button
							className={classes.button}
							variant="contained"
							color="primary"
							onClick={this.handleClick}>
							Add to Cart
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}
}

const mapState = state => {
	return {
		singleProduct: state.singleProduct,
		cart: state.user.shoppingCart,
		user: state.user
	};
};

const mapDispatch = dispatch => {
	return {
		getSingleProduct: id => dispatch(getProduct(id)),
		addSingleProduct: (orderId, productId) =>
			dispatch(addToCart(orderId, productId))
	};
};

export default connect(mapState, mapDispatch)(
	withStyles(styles)(SingleProduct)
);
