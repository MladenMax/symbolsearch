import { combineReducers } from "redux";

import { authReducer } from "./auth";
import { userRootReducer } from "./user";
import { symbolRootReducer } from "./symbol";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userRootReducer,
  symbol: symbolRootReducer
});

export default rootReducer;
