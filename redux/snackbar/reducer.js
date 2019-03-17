import * as TYPES from './types';

const INITIAL_STATE = {
	snackbar: null,
};

// ----- HELPER -----

const changeState = (state, data) => {
	return Object.assign({}, state, data);
};

// ----- SNACKBAR -----

const showSnackbar = (state, snackbar) => {
	const data = {
		snackbar,
	};
	return updateSnackbar(state, data);
};

export const snackbarReducer = (state = INITIAL_STATE, { type, payload }) => {
	switch (type) {
		case TYPES.SHOW_SNACKBAR:
			return showSnackbar(state, payload.snackbar);
		case TYPES.DISMISS_SNACKBAR:
			return INITIAL_STATE;
		default:
			return state;
	}
};
