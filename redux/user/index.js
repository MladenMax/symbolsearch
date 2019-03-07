import { combineReducers } from "redux";

import * as userActions from "./actions";
import { userInfoReducer, userAccountsReducer } from "./reducer";

const userRootReducer = combineReducers({
    info: userInfoReducer,
    accounts: userAccountsReducer
})

export * from "./action-types";
export { userActions };
export { userRootReducer };

