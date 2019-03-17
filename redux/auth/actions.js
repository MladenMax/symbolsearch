import * as TYPES from './types';
import { getItem, setItem } from '../../util/deviceStorage';
import { get, post } from '../../lib/http';

// ----- AUTH -----

const authUserInit = () => {
	return {
		type: TYPES.AUTH_INIT,
	};
};

const authUserError = error => {
	return {
		type: TYPES.AUTH_ERROR,
		payload: error,
	};
};

const authUserEnd = access_token => {
	return {
		type: TYPES.AUTH_END,
		payload: access_token,
	};
};

export const authUser = (username, password) => {
	return dispatch => {
		dispatch(authUserInit());
		return post('oauth/token', null, { username, password }, true)
			.then(res => {
				return setItem('access_token', res.access_token)
					.then(() => {
						dispatch(authUserEnd(res.access_token));
						return dispatch(getUser());
					})
					.catch(error => {
						throw error;
					});
			})
			.catch(error => {
				return dispatch(authUserError(error));
			});
	};
};

// ----- USER -----

const getUserInit = () => {
	return {
		type: TYPES.USER_INIT,
	};
};

const getUserError = error => {
	return {
		type: TYPES.USER_ERROR,
		payload: error,
	};
};

const getUserEnd = user_id => {
	return {
		type: TYPES.USER_END,
		payload: user_id,
	};
};

export const getUser = () => {
	return dispatch => {
		dispatch(getUserInit());
		return get('/users/me', null)
			.then(res => {
				return setItem('user_id', res.id)
					.then(() => {
						dispatch(getUserEnd(res.id));
						return dispatch(getAccount());
					})
					.catch(error => {
						throw error;
					});
			})
			.catch(error => {
				return dispatch(getUserError(error));
			});
	};
};

// ----- ACCOUNT -----

const getAccountInit = () => {
	return {
		type: TYPES.ACCOUNT_INIT,
	};
};

const getAccountError = error => {
	return {
		type: TYPES.ACCOUNT_ERROR,
		payload: error,
	};
};

const getAccountEnd = account_id => {
	return {
		type: TYPES.ACCOUNT_END,
		payload: account_id,
	};
};

export const getAccount = () => {
	return dispatch => {
		dispatch(getAccountInit());
		return getItem('user_id')
			.then(userId => {
				return get(`/users/${userId}/accounts`, null)
					.then(res => {
						return setItem('account_id', res[0].id)
							.then(() => {
								return dispatch(getAccountEnd(res[0].id));
							})
							.catch(error => {
								throw error;
							});
					})
					.catch(error => {
						return dispatch(getAccountError(error));
					});
			})
			.catch(error => {
				throw error;
			});
	};
};
