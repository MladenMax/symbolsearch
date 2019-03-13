import * as TYPES from "./types";

const INITITAL_STATE = {
  loading: false,
  error: null,
  symbol: null,
  charts: null,
  news: null,
  updating: false,
  newsUpdate: null
};

// ----- HELPERS -----

const updateSymbol = (state, data) => {
  return Object.assign({}, state, data);
}
// ----- GET SYMBOL -----

const getSymbolInit = state => {
  const data = {
    loading: true,
    error: null,
    news: null,
    newsUpdate: null
  }
  return updateSymbol(state, data);
}

const getSymbolError = (state, error) => {
  const data = {
    loading: false,
    error
  }
  return updateSymbol(state, data);
}

const getSymbolEnd = (state, symbol) => {
  const data = {
    symbol
  }
  return updateSymbol(state, data);
}

// ----- GET CHARTS -----

const getChartsInit = state => {
  const data = {
    error: null
  }
  return updateSymbol(state, data);
}

const getChartsError = (state, error) => {
  const data = {
    loading: false,
    error
  }
  return updateSymbol(state, data);
}

const getChartsEnd = (state, charts) => {
  const data = {
    charts
  }
  return updateSymbol(state, data);
}

// ----- GET NEWS -----

const getNewsInit = state => {
  const data = {
    updating: true,
    error: null
  }
  return updateSymbol(state, data);
}

const getNewsError = (state, error) => {
  const data = {
    loading: false,
    updating: false,
    error
  }
  return updateSymbol(state, data);
}

const getNewsEnd = (state, news) => {
  const data = {
    loading: false,
    updating: false,
    news
  }
  return updateSymbol(state, data);
}

// ----- SYMBOL REDUCER -----

export const symbolReducer = (state = INITITAL_STATE, action) => {

  if (action.type === TYPES.GET_SYMBOL_INIT) {
    return getSymbolInit(state);
  }

  if (action.type === TYPES.GET_SYMBOL_ERROR) {
    return getSymbolError(state, action.error);
  }

  if (action.type === TYPES.GET_SYMBOL_END) {
    return getSymbolEnd(state, action.symbol);
  }

  if (action.type === TYPES.GET_CHARTS_INIT) {
    return getChartsInit(state);
  }

  if (action.type === TYPES.GET_CHARTS_ERROR) {
    return getChartsError(state, action.error);
  }

  if (action.type === TYPES.GET_CHARTS_END) {
    return getChartsEnd(state, action.charts);
  }

  if (action.type === TYPES.GET_NEWS_INIT) {
    return getNewsInit(state);
  }

  if (action.type === TYPES.GET_NEWS_ERROR) {
    return getNewsError(state, action.error);
  }

  if (action.type === TYPES.GET_NEWS_END) {
    return getNewsEnd(state, action.news);
  }

  return state;
}