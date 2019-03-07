import * as TYPES from "./action-types";
import { get, put } from "../../lib/http";

import { getItem } from "../../lib/deviceStorage";
import { apiConfig } from "../../config/api";

// ---------- SYMBOL SEARCH ----------

export const symbolSearchStart = () => {
  return {
    type: TYPES.SYMBOL_SEARCH_START
  };
};

export const symbolSearchError = error => {
  return dispatch => {
    dispatch({
      type: TYPES.SYMBOL_SEARCH_ERROR,
      payload: error
    });
  };
};

export const symbolSearchSuccess = result => {
  return dispatch => {
    dispatch({
      type: TYPES.SYMBOL_SEARCH_SUCCESS,
      payload: result
    });
  };
};

export const symbolSearch = () => {
  return dispatch => {
    dispatch(symbolSearchStart());
    return getItem("user_id")
      .then(userId => {
        return get(`users/${userId}/symbols`, null, null)
          .then(res => {
            return dispatch(symbolSearchSuccess(res));
          })
          .catch(err => {
            return dispatch(symbolSearchError(err));
          });
      })
      .catch(err => {
        throw err;
      });
  };
};

// ---------- GET WATCHLIST ----------

export const getWatchlistStart = () => {
  return {
    type: TYPES.GET_WATCHLIST_START
  };
};

export const getWatchlistError = error => {
  return dispatch => {
    dispatch({
      type: TYPES.GET_WATCHLIST_ERROR,
      payload: error
    });
  };
};

export const getWatchlistSuccess = result => {
  return dispatch => {
    dispatch({
      type: TYPES.GET_WATCHLIST_SUCCESS,
      payload: result
    });
  };
};

export const getWatchlist = () => {
  return dispatch => {
    dispatch(getWatchlistStart());
    return getItem("account_id")
      .then(accountId => {
        return get(`/accounts/${accountId}/watchlist`, null, null)
          .then(res => {
            return dispatch(getWatchlistSuccess(res));
          })
          .catch(err => {
            return dispatch(getWatchlistError(err));
          });
      })
      .catch(err => {
        throw err;
      });
  };
};

// ---------- ADD SYMBOL TO WATCHLIST ----------

export const addSymbolToWatchlistStart = () => {
  return {
    type: TYPES.ADD_SYMBOL_TO_WATCHLIST_START
  };
};

export const addSymbolToWatchlistError = error => {
  return dispatch => {
    dispatch({
      type: TYPES.ADD_SYMBOL_TO_WATCHLIST_ERROR,
      payload: error
    });
  };
};

export const addSymbolToWatchlistSuccess = result => {
  return dispatch => {
    dispatch({
      type: TYPES.ADD_SYMBOL_TO_WATCHLIST_SUCCESS,
      payload: result
    });
  };
};

export const addSymbolToWatchlist = symbolId => {
  return dispatch => {
    dispatch(addSymbolToWatchlistStart());
    return getItem("account_id")
      .then(accountId => {
        return put(`/accounts/${accountId}/watchlist/${symbolId}`, null, {
          following: true
        })
          .then(res => {
            return dispatch(addSymbolToWatchlistSuccess(res));
          })
          .catch(err => {
            return dispatch(addSymbolToWatchlistError(err));
          });
      })
      .catch(err => {
        throw err;
      });
  };
};

// ---------- REMOVE SYMBOL FROM WATCHLIST ----------

export const removeSymbolFromWatchlistStart = () => {
  return {
    type: TYPES.REMOVE_SYMBOL_FROM_WATCHLIST_START
  };
};

export const removeSymbolFromWatchlistError = error => {
  return dispatch => {
    dispatch({
      type: TYPES.REMOVE_SYMBOL_FROM_WATCHLIST_ERROR,
      payload: error
    });
  };
};

export const removeSymbolFromWatchlistSuccess = result => {
  return dispatch => {
    dispatch({
      type: TYPES.REMOVE_SYMBOL_FROM_WATCHLIST_SUCCESS,
      payload: result
    });
  };
};

export const removeSymbolFromWatchlist = symbolId => {
  return dispatch => {
    dispatch(removeSymbolFromWatchlistStart());
    return getItem("account_id")
      .then(accountId => {
        return put(`/accounts/${accountId}/watchlist/${symbolId}`, null, {
          following: false
        })
          .then(res => {
            return dispatch(removeSymbolFromWatchlistSuccess(res));
          })
          .catch(err => {
            return dispatch(removeSymbolFromWatchlistError(err));
          });
      })
      .catch(err => {
        throw err;
      });
  };
};

// ---------- SYMBOL CHARTS ----------

export const getSymbolChartsStart = () => {
  return {
    type: TYPES.GET_SYMBOL_CHARTS_START
  };
};

export const getSymbolChartsError = error => {
  return dispatch => {
    dispatch({
      type: TYPES.GET_SYMBOL_CHARTS_ERROR,
      payload: error
    });
  };
};

export const getSymbolChartsSuccess = result => {
  return dispatch => {
    dispatch({
      type: TYPES.GET_SYMBOL_CHARTS_SUCCESS,
      payload: result
    });
  };
};

export const getSymbolCharts = symbolId => {
  return dispatch => {
    dispatch(getSymbolChartsStart());
    return getItem("user_id")
      .then(userId => {
        return get(`/users/${userId}/symbols/${symbolId}/charts`, null, null)
          .then(res => {
            return dispatch(getSymbolChartsSuccess(res));
          })
          .catch(err => {
            return dispatch(getSymbolChartsError(err));
          });
      })
      .catch(err => {
        throw err;
      });
  };
};

// ---------- SYMBOL NEWS ----------

export const getSymbolNewsStart = () => {
  return {
    type: TYPES.GET_SYMBOL_NEWS_START
  };
};

export const getSymbolNewsError = error => {
  return dispatch => {
    dispatch({
      type: TYPES.GET_SYMBOL_NEWS_ERROR,
      payload: error
    });
  };
};

export const getSymbolNewsSuccess = result => {
  return dispatch => {
    dispatch({
      type: TYPES.GET_SYMBOL_NEWS_SUCCESS,
      payload: result
    });
  };
};

export const getSymbolNews = (limit, offset, tag) => {
  return dispatch => {
    dispatch(getSymbolNewsStart());
    return get(`applications/${apiConfig.applicationId}/news/coinpulse`, {
      limit: limit,
      offset: offset,
      tag: tag
    })
      .then(res => {
        return dispatch(getSymbolNewsSuccess(res));
      })
      .catch(err => {
        return dispatch(getSymbolNewsError(err));
      });
  };
};

export const invalidateNews = () => {
  return dispatch => {
    dispatch({
      type: TYPES.INVALIDATE_NEWS
    });
  };
};
