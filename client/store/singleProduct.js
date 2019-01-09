import axios from 'axios'

//Action Types

const GET_PRODUCT = 'GET_PRODUCT';

//Initial State

const defaultProduct = {};

//Action Creators

const recProduct = product => ({type: GET_PRODUCT, product});

//Thunk Creator

export const getProduct = id => {
    return async dispatch => {
        const response = await axios.get(`/api/products/${id}`)
        dispatch(recProduct(response.data || defaultProduct))
    }
}

//Reducer

export default function(state=defaultProduct, action){
    switch (action.type) {
        case GET_PRODUCT:
            return action.product
        default:
            return state
    }
}