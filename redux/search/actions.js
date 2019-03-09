import * as TYPES from "./action-types";
import { get, put } from "../../lib/http";

import { getItem } from "../../lib/deviceStorage";

// ----- GET SYMBOLS -----

const getSymbolsInit = () => {
	return {
		type: TYPES.GET_SYMBOLS_INIT
	}
}

const getSymbolsError = error => {
	return {
		type: TYPES.GET_SYMBOLS_ERROR,
		error
	}
}

const getSymbolsEnd = symbols => {
	return {
		type: TYPES.GET_SYMBOLS_END,
		symbols
	}
}

export const getSymbols = () => {
	return dispatch => {
		dispatch(getSymbolsInit());
		return getItem("user_id")
			.then(userId => {
				return get(`users/${userId}/symbols`, null)
					.then(res => {
						const symbols = res.map(symbol => {
							return {
								id: symbol.id,
								name: symbol.displayName,
								price: symbol.price
							};
						});
						dispatch(getSymbolsEnd(symbols));
						return dispatch(getWatchlist());
					})
					.catch(error => {
						return dispatch(getSymbolsError(error));
					});
			})
			.catch(error => {
				throw error;
			});
	}
}

// ----- GET WATCHLIST -----

const getWatchlistInit = () => {
	return {
		type: TYPES.GET_WATCHLIST_INIT
	}
}

const getWatchlistError = error => {
	return {
		type: TYPES.GET_WATCHLIST_ERROR,
		error
	}
}

const getWatchlistEnd = watchlist => {
	return {
		type: TYPES.GET_WATCHLIST_END,
		watchlist
	}
}

export const getWatchlist = () => {
	return dispatch => {
		dispatch(getWatchlistInit());
		return getItem("account_id")
			.then(accountId => {
				return get(`/accounts/${accountId}/watchlist`, null)
					.then(res => {
						const watchlist = res.map(symbol => {
							return {
								id: symbol.id,
								name: symbol.displayName,
								price: symbol.price
							};
						});
						return dispatch(getWatchlistEnd(watchlist));
					})
					.catch(error => {
						return dispatch(getWatchlistError(error));
					});
			})
			.catch(error => {
				throw error;
			});
	}
}

// ----- UPDATE WATCHLIST -----

const updateWatchlistInit = () => {
	return {
		type: TYPES.UPDATE_WATCHLIST_INIT
	}
}

const updateWatchlistError = error => {
	return {
		type: TYPES.UPDATE_WATCHLIST_ERROR,
		error
	}
}

const updateWatchlistEnd = () => {
	return {
		type: TYPES.UPDATE_WATCHLIST_END,
		updated_watchlist: true
	}
}

export const updateWatchlist = (symbolId, following) => {
	return dispatch => {
		dispatch(updateWatchlistInit());
		return getItem("account_id")
			.then(accountId => {
				return put(`/accounts/${accountId}/watchlist/${symbolId}`, null, { following })
					.then(() => {
						dispatch(updateWatchlistEnd(watchlist));
						return dispatch(getWatchlist());
					})
					.catch(error => {
						return dispatch(updateWatchlistError(error));
					});
			})
			.catch(error => {
				throw error;
			});
	}
}