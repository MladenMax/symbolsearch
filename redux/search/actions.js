import * as TYPES from './types';
import { getItem } from '../../util/deviceStorage';
import { get, put } from '../../lib/http';

// ----- SYMBOLS -----

const getSymbolsInit = () => {
	return {
		type: TYPES.SYMBOLS_INIT,
	};
};

const getSymbolsError = error => {
	return {
		type: TYPES.SYMBOLS_ERROR,
		payload: error,
	};
};

const getSymbolsEnd = symbols => {
	return {
		type: TYPES.SYMBOLS_END,
		payload: symbols,
	};
};

export const getSymbols = () => {
	return dispatch => {
		dispatch(getSymbolsInit());
		return getItem('user_id')
			.then(userId => {
				return get(`users/${userId}/symbols`, null)
					.then(res => {
						dispatch(getSymbolsEnd(res));
						return dispatch(getWatchlist());
					})
					.catch(error => {
						return dispatch(getSymbolsError(error));
					});
			})
			.catch(error => {
				throw error;
			});
	};
};

// ----- WATCHLIST -----

const getWatchlistInit = () => {
	return {
		type: TYPES.WATCHLIST_INIT,
	};
};

const getWatchlistError = error => {
	return {
		type: TYPES.WATCHLIST_ERROR,
		payload: error,
	};
};

const getWatchlistEnd = watchlist => {
	return {
		type: TYPES.WATCHLIST_END,
		payload: watchlist,
	};
};

export const getWatchlist = () => {
	return dispatch => {
		dispatch(getWatchlistInit());
		return getItem('account_id')
			.then(accountId => {
				return get(`/accounts/${accountId}/watchlist`, null)
					.then(res => {
						return dispatch(getWatchlistEnd(res));
					})
					.catch(error => {
						return dispatch(getWatchlistError(error));
					});
			})
			.catch(error => {
				throw error;
			});
	};
};

// ----- UPDATE -----

const updateWatchlistInit = () => {
	return {
		type: TYPES.UPDATE_INIT,
	};
};

const updateWatchlistError = error => {
	return {
		type: TYPES.UPDATE_ERROR,
		payload: error,
	};
};

const updateWatchlistEnd = (symbol, following) => {
	return {
		type: TYPES.UPDATE_END,
		payload: { symbol, following },
	};
};

export const updateWatchlist = (symbolId, following) => {
	return dispatch => {
		dispatch(updateWatchlistInit());
		return getItem('account_id')
			.then(accountId => {
				return put(`/accounts/${accountId}/watchlist/${symbolId}`, null, {
					following,
				})
					.then(res => {
						return dispatch(updateWatchlistEnd(res, following));
					})
					.catch(error => {
						return dispatch(updateWatchlistError(error));
					});
			})
			.catch(error => {
				throw error;
			});
	};
};
