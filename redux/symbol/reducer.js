import * as TYPES from "./action-types";

export const INITITAL_STATE = {
  loading: false,
  error: null,
  symbol: null,
  chart: null,
  news: null
};

// ----- HELPERS -----

const updateSymbol = (state, data) => {
  return Object.assign({}, state.symbol, data);
}
// ----- GET SYMBOL -----

const getSymbolInit = state => {
  const data = {
      loading: true,
      error: null
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
      loading: false,
      symbol
  }
  return updateSymbol(state, data);
}

// ----- GET CHART -----

const getChartInit = state => {
  const data = {
      loading: true,
      error: null
  }
  return updateSymbol(state, data);
}

const getChartError = (state, error) => {
  const data = {
      loading: false,
      error
  }
  return updateSymbol(state, data);
}

const getChartEnd = (state, chart) => {
  const data = {
      loading: false,
      chart
  }
  return updateSymbol(state, data);
}

// ----- GET NEWS -----

const getNewsInit = state => {
  const data = {
      loading: true,
      error: null
  }
  return updateSymbol(state, data);
}

const getNewsError = (state, error) => {
  const data = {
      loading: false,
      error
  }
  return updateSymbol(state, data);
}

const getNewsEnd = (state, news) => {
  const data = {
      loading: false,
      news
  }
  return updateSymbol(state, data);
}

// ----- SYMBOL REDUCER -----

export const symbolReducer = (state = INITIAL_STATE, action) => {

  if (action.type === TYPES.GET_SYMBOL_INIT) {
      return getSymbolInit(state);
  }

  if (action.type === TYPES.GET_SYMBOL_ERROR) {
      return getSymbolError(state, action.error);
  }

  if (action.type === TYPES.GET_SYMBOL_END) {
      return getSymbolEnd(state, action.symbol);
  }

  if (action.type === TYPES.GET_CHART_INIT) {
      return getChartInit(state);
  }

  if (action.type === TYPES.GET_CHART_ERROR) {
      return getChartError(state, action.error);
  }

  if (action.type === TYPES.GET_CHART_END) {
      return getChartEnd(state, action.chart);
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