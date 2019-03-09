import * as TYPES from './types';

const INITIAL_STATE = {
    loading: false,
    error: null,
    symbols: null,
    watchlist: null,
    updated_watchlist: false
};

// ----- HELPER -----

const updateSearch = (state, data) => {
    return Object.assign({}, state.search, data);

}

// ----- GET SYMBOLS -----

const getSymbolsInit = state => {
    const data = {
        loading: true,
        error: null
    }
    return updateSearch(state, data);
}

const getSymbolsError = (state, error) => {
    const data = {
        loading: false,
        error
    }
    return updateSearch(state, data);
}

const getSymbolsEnd = (state, symbols) => {
    const data = {
        loading: false,
        symbols
    }
    return updateSearch(state, data);
}

// ----- GET WATCHLIST -----

const getWatchlistInit = state => {
    const data = {
        loading: true,
        error: null
    }
    return updateSearch(state, data);
}

const getWatchlistError = (state, error) => {
    const data = {
        loading: false,
        error
    }
    return updateSearch(state, data);
}

const getWatchlistEnd = (state, watchlist) => {
    const data = {
        loading: false,
        watchlist
    }
    return updateSearch(state, data);
}

// ----- UPDATE WATCHLIST -----

const updateWatchlistInit = state => {
    const data = {
        loading: true,
        error: null
    }
    return updateSearch(state, data);
}

const updateWatchlistError = (state, error) => {
    const data = {
        loading: false,
        error
    }
    return updateSearch(state, data);
}

const updateWatchlistEnd = (state, updated_watchlist) => {
    const data = {
        loading: false,
        updated_watchlist
    }
    return updateSearch(state, data);
}

// ----- SEARCH REDUCER -----

export const searchReducer = (state = INITIAL_STATE, action) => {

    if (action.type === TYPES.GET_SYMBOLS_INIT) {
        return getSymbolsInit(state);
    }

    if (action.type === TYPES.GET_SYMBOLS_ERROR) {
        return getSymbolsError(state, action.error);
    }

    if (action.type === TYPES.GET_SYMBOLS_END) {
        return getSymbolsEnd(state, action.symbols);
    }

    if (action.type === TYPES.GET_WATCHLIST_INIT) {
        return getWatchlistInit(state);
    }

    if (action.type === TYPES.GET_WATCHLIST_ERROR) {
        return getWatchlistError(state, action.error);
    }

    if (action.type === TYPES.GET_WATCHLIST_END) {
        return getWatchlistEnd(state, action.watchlist);
    }

    if (action.type === TYPES.UPDATE_WATCHLIST_INIT) {
        return updateWatchlistInit(state);
    }

    if (action.type === TYPES.UPDATE_WATCHLIST_ERROR) {
        return updateWatchlistError(state, action.error);
    }

    if (action.type === TYPES.UPDATE_WATCHLIST_END) {
        return updateWatchlistEnd(state, action.updated_watchlist);
    }

    return state;
}