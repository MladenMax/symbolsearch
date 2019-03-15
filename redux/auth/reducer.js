import * as TYPES from './types';

const INITIAL_STATE = {
	loading: false,
	error: null,
	access_token: null,
	user_id: null,
	account_id: null,
	authenticated: false,
};

// ----- HELPER -----

const changeState = (state, data) => {
	return Object.assign({}, state, data);
};

// ----- AUTH -----

const initAuth = state => {
	const data = {
		loading: true,
		error: null,
	};
	return changeState(state, data);
};

const initInfo = state => {
	const data = {
		error: null,
	};
	return changeState(state, data);
};

const initError = (state, error) => {
	const data = {
		loading: false,
		error,
	};
	return changeState(state, data);
};

const endAuth = (state, access_token) => {
	const data = {
		error: null,
		access_token,
	};
	return changeState(state, data);
};

const endUser = (state, user_id) => {
	const data = {
		error: null,
		user_id,
	};
	return changeState(state, data);
};

const endAccount = (state, account_id) => {
	const data = {
		error: null,
		account_id,
		authenticated: true,
	};
	return changeState(state, data);
};

export const authReducer = (state = INITIAL_STATE, { type, payload }) => {
	switch (type) {
		case TYPES.AUTH_USER_INIT:
			return initAuth(state);
		case TYPES.GET_USER_INIT:
		case TYPES.GET_ACCOUNT_INIT:
			return initInfo(state);

		case TYPES.AUTH_USER_ERROR:
		case TYPES.GET_USER_ERROR:
		case TYPES.GET_ACCOUNT_ERROR:
			return initError(state, payload);

		case TYPES.AUTH_USER_END:
			return endAuth(state, payload);
		case TYPES.GET_USER_END:
			return endUser(state, payload);
		case TYPES.GET_ACCOUNT_END:
			return endAccount(state, payload);
		default:
			return state;
	}
};
