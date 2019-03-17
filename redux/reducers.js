import { combineReducers } from 'redux';

import { authReducer } from './auth';
import { searchReducer } from './search';
import { symbolReducer } from './symbol';
import { snackbarReducer } from './snackbar';

const rootReducer = combineReducers({
	auth: authReducer,
	search: searchReducer,
	symbol: symbolReducer,
	snackbar: snackbarReducer,
});

export default rootReducer;
