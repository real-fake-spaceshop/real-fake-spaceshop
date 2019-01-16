import axios from 'axios';
import history from '../history';

//Action Types

const GET_PRODUCT = 'GET_PRODUCT';
const ADD_TO_CART = 'ADD_TO_CART';

//Initial State

const defaultProduct = {};

//Action Creators

const recProduct = product => ({type: GET_PRODUCT, product});
const addProduct = product => ({type: ADD_TO_CART, product});

//Thunk Creator

export const getProduct = id => {
	return async dispatch => {
		const response = await axios.get(`/api/products/${id}`);
		dispatch(recProduct(response.data || defaultProduct));
	};
};

export const addToCart = (orderId, productId, quantity = 1) => {
	return async dispatch => {
		const response = await axios.put(
			`/api/orders/${orderId}/${productId}?quantity=${quantity}`
		);
		const action = addProduct(response.data);
		dispatch(action);
		history.push('/cart');
	};
};

//Reducer

export default function(state = defaultProduct, action) {
	switch (action.type) {
		case GET_PRODUCT:
			return action.product;
		default:
			return state;
	}
}
