/**
 * ACTION TYPES
 */
const ENQUEUE_ERROR = 'ENQUEUE_ERROR';
const DISMISS_ERROR = 'DISMISS_ERROR';

/**
 * INITIAL STATE
 */

const initialState = [];

/**
 * ACTION CREATORS
 */
export const enqueueError = error => ({
	type: ENQUEUE_ERROR,
	error
});

export const dismissError = error => ({
	type: DISMISS_ERROR,
	error
});

/**
 * REDUCER
 */

export default (state = initialState, action) => {
	let errorIndex;
	switch (action.type) {
		case ENQUEUE_ERROR:
			return [...state, action.error];
		case DISMISS_ERROR:
			errorIndex = state.findIndex(err => err === action.error);
			if (errorIndex !== -1) {
				return [...state.slice(0, errorIndex), ...state.slice(errorIndex + 1)];
			} else {
				return state;
			}
		default:
			return state;
	}
};
