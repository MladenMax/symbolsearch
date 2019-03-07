import * as TYPES from "./action-types";

export const SymbolState = {
  loading: false,
  symbols: null,
  watchlist: null,
  charts: null,
  news: null,
  error: null
};

// ---------- SYMBOL SEARCH ----------

export const symbolSearchReducer = (state = SymbolState, { payload, type }) => {
  switch (type) {
    case TYPES.SYMBOL_SEARCH_START:
      return Object.assign({}, state, {
        loading: true,
        error: null
      });

    case TYPES.SYMBOL_SEARCH_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        symbols: payload || null,
        error: null
      });

    case TYPES.SYMBOL_SEARCH_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: payload
      });

    default:
      return state;
  }
};

// ---------- GET WATCHLIST ----------

export const getWatchlistReducer = (state = SymbolState, { payload, type }) => {
  switch (type) {
    case TYPES.GET_WATCHLIST_START:
      return Object.assign({}, state, {
        loading: true,
        error: null
      });

    case TYPES.GET_WATCHLIST_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        watchlist: payload || null,
        error: null
      });

    case TYPES.GET_WATCHLIST_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: payload
      });

    default:
      return state;
  }
};

// ---------- ADD SYMBOL TO WATCHLIST ----------

export const addSymbolToWatchlistReducer = (
  state = SymbolState,
  { payload, type }
) => {
  switch (type) {
    case TYPES.ADD_SYMBOL_TO_WATCHLIST_START:
      return Object.assign({}, state, {
        loading: true,
        error: null
      });

    case TYPES.ADD_SYMBOL_TO_WATCHLIST_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        watchlist: [...state.watchlist, payload],
        error: null
      });

    case TYPES.ADD_SYMBOL_TO_WATCHLIST_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: payload
      });

    default:
      return state;
  }
};

// ---------- REMOVE SYMBOL FROM WATCHLIST ----------

export const removeSymbolFromWatchlistReducer = (
  state = SymbolState,
  { payload, type }
) => {
  switch (type) {
    case TYPES.REMOVE_SYMBOL_FROM_WATCHLIST_START:
      return Object.assign({}, state, {
        loading: true,
        error: null
      });

    case TYPES.REMOVE_SYMBOL_FROM_WATCHLIST_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        watchlist: state.watchlist.filter(symbol => {
          return symbol.id !== payload.id;
        }),
        error: null
      });

    case TYPES.REMOVE_SYMBOL_FROM_WATCHLIST_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: payload
      });

    default:
      return state;
  }
};

// ---------- SYMBOL CHARTS ----------

export const getSymbolChartsReducer = (
  state = SymbolState,
  { payload, type }
) => {
  switch (type) {
    case TYPES.GET_SYMBOL_CHARTS_START:
      return Object.assign({}, state, {
        loading: true,
        error: null
      });

    case TYPES.GET_SYMBOL_CHARTS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        charts: payload || null,
        error: null
      });

    case TYPES.GET_SYMBOL_CHARTS_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: payload
      });

    default:
      return state;
  }
};

// ---------- SYMBOL NEWS ----------

export const getSymbolNewsReducer = (
  state = SymbolState,
  { payload, type }
) => {
  switch (type) {
    case TYPES.GET_SYMBOL_NEWS_START:
      return Object.assign({}, state, {
        loading: true,
        error: null
      });

    case TYPES.GET_SYMBOL_NEWS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        news: payload || null,
        error: null
      });

    case TYPES.GET_SYMBOL_NEWS_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: payload
      });
      
    case TYPES.INVALIDATE_NEWS:
      return Object.assign({}, state, {
        loading: false,
        news: null,
        error: null
      });
    default:
      return state;
  }
};
