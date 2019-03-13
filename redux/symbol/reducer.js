import * as TYPES from "./types";

const INITITAL_STATE = {
  isOpen: false,
  error: null,
  opening: false,
  symbol: null,
  charts: null,
  news: null,
  updating: false
};

// ----- HELPER -----

const updateSymbol = (state, data) => {
  return Object.assign({}, state, data);
}

// ----- OPEN SYMBOL -----

const openSymbol = (state, opening) => {
  const data = {
    opening,
    error: null
  }
  return updateSymbol(state, data);
}

// ----- CLOSE SYMBOL -----

const closeSymbol = state => {
  const data = {
    opening: false,
    isOpen: false,
    symbol: null,
    charts: null,
    news: null
  };
  return updateSymbol(state, data);
}

// ----- GET SYMBOL -----

const getSymbolInit = state => {
  const data = {
    error: null
  }
  return updateSymbol(state, data);
}

const getSymbolError = (state, error) => {
  const data = {
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
    updating: false,
    error
  }
  return updateSymbol(state, data);
}

const getNewsEnd = (state, news) => {
  const data = {
    isOpen: true,
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

  if (action.type === TYPES.OPEN_SYMBOL) {
    return openSymbol(state, action.opening);
  }

  if (action.type === TYPES.CLOSE_SYMBOL) {
    return closeSymbol(state);
  }

  return state;
}