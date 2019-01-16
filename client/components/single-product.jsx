import React from 'react';
import {connect} from 'react-redux';
import {getProduct, addToCart, me} from '../store';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import styles from '../styles';

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
						<CardHeader
							classes={{
								title: classes.title,
								subheader: classes.subheader
							}}
							title={product.name}
							subheader={'$' + product.price}
						/>
						<img src={product.imageUrl} />
						<Typography className={classes.desc}>
							{product.description}
						</Typography>
						<Button
							variant="contained"
							color="primary"
							className={classes.button}
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
		addSingleProduct: async (orderId, productId) => {
			await dispatch(addToCart(orderId, productId));
			await dispatch(me());
		}
	};
};

export default connect(mapState, mapDispatch)(
	withStyles(styles)(SingleProduct)
);
