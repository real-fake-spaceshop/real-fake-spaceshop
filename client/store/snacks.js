/**
 * ACTION TYPES
 */
const ENQUEUE_SNACK = 'ENQUEUE_SNACK';
const DISMISS_SNACK = 'DISMISS_SNACK';

/**
 * INITIAL STATE
 */

const initialState = [];

/**
 * ACTION CREATORS
 */
export const enqueueSnack = notification => ({
	type: ENQUEUE_SNACK,
	notification: {
		key: new Date().getTime() + Math.random(),
		...notification
	}
});

export const dismissSnack = key => ({
	type: DISMISS_SNACK,
	key
});

/**
 * REDUCER
 */

export default (state = initialState, action) => {
	switch (action.type) {
		case ENQUEUE_SNACK:
			return [...state, {...action.notification}];
		case DISMISS_SNACK:
			return state.filter(snack => snack.key !== action.key);
		default:
			return state;
	}
};
