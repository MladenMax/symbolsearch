import { combineReducers } from "redux";

import * as symbolActions from "./actions";
import {
  symbolSearchReducer,
  getWatchlistReducer,
  addSymbolToWatchlistReducer,
  removeSymbolFromWatchlistReducer,
  getSymbolChartsReducer,
  getSymbolNewsReducer
} from "./reducer";

const symbolRootReducer = combineReducers({
  symbolSearch: symbolSearchReducer,
  getWatchlist: getWatchlistReducer,
  addSymbolToWathlist: addSymbolToWatchlistReducer,
  removeSymbolFromWatchlist: removeSymbolFromWatchlistReducer,
  symbolCharts: getSymbolChartsReducer,
  symbolNews: getSymbolNewsReducer
});

export * from "./action-types";
export { symbolActions };
export { symbolRootReducer };
