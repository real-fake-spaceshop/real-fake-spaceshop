import axios from 'axios';
import {enqueueError, enqueueSnack} from './snacks';
import history from '../history';

/**
 * ACTION TYPES
 */
const SET_STRIPE_ERROR = 'SET_STRIPE_ERROR';
const SET_STRIPE_RESPONSE = 'SET_STRIPE_RESPONSE';

/**
 * ACTION CREATORS
 */
export const setStripeError = error => ({
	type: SET_STRIPE_ERROR,
	error
});

export const setStripeResponse = response => ({
	type: SET_STRIPE_RESPONSE,
	response
});

/**
 * THUNK CREATORS
 */
export const submitCharge = token => async dispatch => {
	try {
		const res = await axios.post('/api/stripe/charge', {
			token: token.id,
			foo: 'bar'
		});
		if (res.status === 200) {
			console.log('Purchase complete');
			dispatch(setStripeResponse(res.data.status));
			dispatch(enqueueSnack({message: 'Order submitted successfully!'}));
			history.push(`/orders/${res.data.order.id}`);
		}
	} catch (error) {
		dispatch(setStripeError(error.message || error));
		dispatch(enqueueError('An error occurred processing transaction'));
	}
};

/**
 * INITIAL STATE
 */
const initialState = {error: null, response: null};

/**
 * REDUCER
 */

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_STRIPE_ERROR:
			return {...state, response: null, error: action.error};
		case SET_STRIPE_RESPONSE:
			return {...state, response: action.response, error: null};
		default:
			return state;
	}
};

export default reducer;
