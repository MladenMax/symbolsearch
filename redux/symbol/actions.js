import * as TYPES from "./types";
import { apiConfig } from "../../config/api";
import { getItem } from "../../util/deviceStorage";
import { get } from "../../lib/http";

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

const getSymbolEnd = symbol => {
	return {
		type: TYPES.GET_SYMBOL_END,
		symbol
	}
}

export const getSymbol = symbolId => {
	return dispatch => {
		dispatch(getSymbolInit());
		return getItem("user_id")
			.then(userId => {
				return get(`/users/${userId}/symbols/${symbolId}`, null)
					.then(res => {
						const symbol = {
							id: res.id,
							name: res.displayName,
							price: res.price,
							description: res.baseInstrument.description.trim()
						};
						dispatch(getSymbolEnd(symbol));
						return dispatch(getCharts(symbolId));
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
		type: TYPES.GET_CHARTS_INIT
	}
}

const getChartsError = error => {
	return {
		type: TYPES.GET_CHARTS_ERROR,
		error
	}
}

const getChartsEnd = charts => {
	return {
		type: TYPES.GET_CHARTS_END,
		charts
	}
}

export const getCharts = symbolId => {
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
						dispatch(getChartsEnd(charts));
						return dispatch(getNews(5, 0, symbolId))
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
		return get(`applications/${apiConfig.applicationId}/news/coinpulse`, {
			limit,
			offset,
			tag
		})
			.then(res => {
				return dispatch(getNewsEnd(res.results));
			})
			.catch(error => {
				return dispatch(getNewsError(error));
			});
	}
}