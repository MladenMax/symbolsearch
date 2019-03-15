import { combineReducers } from 'redux';

import { authReducer } from './auth';
import { searchReducer } from './search';
import { symbolReducer } from './symbol';

const rootReducer = combineReducers({
	auth: authReducer,
	search: searchReducer,
	symbol: symbolReducer,
});

export default rootReducer;
