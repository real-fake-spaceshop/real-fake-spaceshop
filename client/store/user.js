import axios from 'axios';
import history from '../history';
import {enqueueError} from './snacks';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

/**
 * INITIAL STATE
 */
const defaultUser = {name: 'Guest', address: ''};

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user});
const removeUser = () => ({type: REMOVE_USER});

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
	try {
		const res = await axios.get('/auth/me');
		dispatch(getUser(res.data || defaultUser));
	} catch (err) {
		console.error(err);
	}
};

export const login = (email, password) => async dispatch => {
	let res;
	try {
		res = await axios.post('/auth/login', {email, password});
	} catch (authError) {
		dispatch(enqueueError('Invalid Username/Password credentials...'));
		return dispatch(getUser({error: authError}));
	}

	try {
		dispatch(getUser(res.data));
		history.push('/home');
	} catch (dispatchOrHistoryErr) {
		console.error(dispatchOrHistoryErr);
	}
};

export const signup = userData => async dispatch => {
	let res;
	try {
		res = await axios.post('auth/signup', userData);
	} catch (error) {
		return dispatch(getUser({error}));
	}

	try {
		dispatch(getUser(res.data));
		history.push('/home');
	} catch (err) {
		console.error(err);
	}
};

export const logout = () => async dispatch => {
	try {
		await axios.post('/auth/logout');
		dispatch(removeUser());
		history.push('/login');
	} catch (err) {
		console.error(err);
	}
};

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
	switch (action.type) {
		case GET_USER:
			return action.user;
		case REMOVE_USER:
			return defaultUser;
		default:
			return state;
	}
}
