import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import user from './user';
import singleProduct from './singleProduct';
import allProducts from './allProducts';
import errors from './errors';

const reducer = combineReducers({
	user: user,
	singleProduct: singleProduct,
	allProducts: allProducts,
	errors: errors
});
const middleware = composeWithDevTools(
	applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
);
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './singleProduct';
export * from './allProducts';
export * from './errors';
