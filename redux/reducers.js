import { combineReducers } from "redux";

import { userReducer } from "./user";
import { searchReducer } from "./search";
import { symbolReducer } from "./symbol";

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  symbol: symbolReducer
});

export default rootReducer;
