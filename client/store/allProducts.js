import axios from 'axios';

//Action Types

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';

//Initial State

const defaultProductList = [];

//Action Creators

const recAllProducts = products => ({type: GET_ALL_PRODUCTS, products});

//Thunk Creator

export const getAllProducts = () => {
	return async dispatch => {
		const response = await axios.get(`/api/products`);
		dispatch(recAllProducts(response.data || defaultProductList));
	};
};

//Reducer

export default function(state = defaultProductList, action) {
	switch (action.type) {
		case GET_ALL_PRODUCTS:
			return action.products;
		default:
			return state;
	}
}
