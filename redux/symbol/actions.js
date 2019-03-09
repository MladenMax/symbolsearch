import * as TYPES from "./action-types";
import { get, put } from "../../lib/http";

import { getItem } from "../../lib/deviceStorage";
import { apiConfig } from "../../config/api";

// ----- GET SYMBOL -----

const getSymbolInit = () => {
	return {
		type: TYPES.GET_SYMBOL_INIT
	}
}

const getSymbolError = error => {
	return {
		type: TYPES.GET_SYMBOL_ERROR,
		error
	}
}

const getSymbolEnd = symbols => {
	return {
		type: TYPES.GET_SYMBOL_END,
		symbols
	}
}

export const getSymbol = symbolId => {
	return dispatch => {
		dispatch(getSymbolInit());
		return getItem("user_id")
			.then(userId => {
				return get(`/users/${userId}/symbols/${symbolId}`, null)
					.then(res => {
						const symbol = res.map(symbol => {
							return {
								id: symbol.id,
								name: symbol.displayName,
								price: symbol.price,
								description: symbol.baseInstruments.description
							};
						});
						dispatch(getSymbolEnd(symbol));
						return dispatch(getCharts());
					})
					.catch(error => {
						return dispatch(getSymbolError(error));
					});
			})
			.catch(error => {
				throw error;
			});
	}
}

// ----- GET CHARTS -----

const getChartsInit = () => {
	return {
		type: TYPES.GET_CHART_INIT
	}
}

const getChartsError = error => {
	return {
		type: TYPES.GET_CHART_ERROR,
		error
	}
}

const getChartsEnd = charts => {
	return {
		type: TYPES.GET_CHARTS_END,
		charts
	}
}

export const getCharts = () => {
	return dispatch => {
		dispatch(getChartsInit());
		return getItem("user_id")
			.then(userId => {
				return get(`/users/${userId}/symbols/${symbolId}/charts`, null)
					.then(res => {
						const charts = res.map(chart => {
							return {
								high: chart.high,
								low: chart.low
							};
						});
						return dispatch(getChartsEnd(watchlist));
						return dispatch()
					})
					.catch(error => {
						return dispatch(getChartsError(error));
					});
			})
			.catch(error => {
				throw error;
			});
	}
}

// ----- GET NEWS -----

const getNewsInit = () => {
	return {
		type: TYPES.GET_NEWS_INIT
	}
}

const getNewsError = error => {
	return {
		type: TYPES.GET_NEWS_ERROR,
		error
	}
}

const getNewsEnd = news => {
	return {
		type: TYPES.GET_NEWS_END,
		news
	}
}

export const getNews = (limit, offset, tag) => {
	return dispatch => {
		dispatch(getNewsInit());
		return put(`applications/${apiConfig.applicationId}/news/coinpulse`, {
			limit,
			offset,
			tag
		})
			.then(() => {
				return dispatch(getNewsEnd());
			})
			.catch(error => {
				return dispatch(getNewsError(error));
			});
	}
}