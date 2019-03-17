import * as types from './types';

export const showSnackbar = snackbar => {
	return dispatch => {
		return {
			type: types.SHOW_SNACKBAR,
			payload: snackbar,
		};
	};
};

export const dismissSnackbar = () => {
	return dispatch => {
		return {
			type: types.DISMISS_SNACKBAR,
		};
	};
};
