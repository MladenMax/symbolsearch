import * as TYPES from './types';

const INITIAL_STATE = {
	loading: false,
	error: null,
	symbols: null,
	watchlist: null,
};

// ----- HELPER -----

const updateState = (state, data) => {
	return Object.assign({}, state, data);
};

// ----- SEARCH -----

const initSearch = state => {
	const data = {
		loading: true,
		error: null,
	};
	return updateState(state, data);
};

const initError = (state, error) => {
	const data = {
		loading: false,
		error,
	};
	return updateState(state, data);
};

const endSymbols = (state, symbols) => {
	const data = {
		loading: false,
		error: null,
		symbols,
	};
	return updateState(state, data);
};

const endWatchlist = (state, watchlist) => {
	const data = {
		loading: false,
		error: null,
		watchlist,
	};
	return updateState(state, data);
};

const endUpdate = (state, symbol, following) => {
	const data = {
		watchlist: following
			? [...state.watchlist, symbol]
			: state.watchlist.filter(item => {
					return item.id !== symbol.id;
			  }),
	};
	return updateState(state, data);
};

export const searchReducer = (state = INITIAL_STATE, { type, payload }) => {
	switch (type) {
		case TYPES.SYMBOLS_INIT:
		case TYPES.WATCHLIST_INIT:
		case TYPES.UPDATE_INIT:
			return initSearch(state);

		case TYPES.SYMBOLS_ERROR:
		case TYPES.WATCHLIST_ERROR:
		case TYPES.UPDATE_ERROR:
			return initError(state, payload);

		case TYPES.SYMBOLS_END:
			return endSymbols(state, payload);
		case TYPES.WATCHLIST_END:
			return endWatchlist(state, payload);
		case TYPES.UPDATE_END:
			return endUpdate(state, payload.symbol, payload.following);

		default:
			return state;
	}
};
