import * as TYPES from './types';

const INITIAL_STATE = {
    loading: false,
    error: null,
    access_token: null,
    user_id: null,
    account_id: null,
    authenticated: false
};

// ----- HELPER -----

const updateUser = (state, data) => {
    return Object.assign({}, state.user, data);
}

// ----- AUTH USER -----

const authUserInit = state => {
    const data = {
        loading: true,
        error: null
    }
    return updateUser(state, data);
}

const authUserError = (state, error) => {
    const data = {
        loading: false,
        authenticated: false,
        error
    }
    return updateUser(state, data);
}

const authUserEnd = (state, access_token) => {
    const data = {
        loading: false,,
        access_token
    }
    return updateUser(state, data);
}

// ----- GET USER -----

const getUserInit = state => {
    const data = {
        loading: true,
        error: null
    }
    return updateUser(state, data);
}

const getUserError = (state, error) => {
    const data = {
        loading: false,
        authenticated: false,
        error
    }
    return updateUser(state, data);
}

const getUserEnd = (state, user_id) => {
    const data = {
        loading: false,
        user_id
    }
    return updateUser(state, data);
}

// ----- GET ACCOUNT -----

const getAccountInit = state => {
    const data = {
        loading: true,
        error: null
    }
    return updateUser(state, data);
}

const getAccountError = (state, error) => {
    const data = {
        loading: false,
        authenticated: false,
        error
    }
    return updateUser(state, data);
}

const getAccountEnd = (state, account_id) => {
    const data = {
        loading: false,
        authenticated: true,
        account_id
    }
    return updateUser(state, data);
}

// ----- USER REDUCER -----

export const userReducer = (state = INITIAL_STATE, action) => {

    if (action.type === TYPES.AUTH_USER_INIT) {
        return authUserInit(state);
    }

    if (action.type === TYPES.AUTH_USER_ERROR) {
        return authUserError(state, action.error);
    }

    if (action.type === TYPES.AUTH_USER_END) {
        return authUserEnd(state, action.access_token);
    }

    if (action.type === TYPES.GET_USER_INIT) {
        return getUserInit(state);
    }

    if (action.type === TYPES.GET_USER_ERROR) {
        return getUserError(state, action.error);
    }

    if (action.type === TYPES.GET_USER_END) {
        return getUserEnd(state, action.user_id);
    }

    if (action.type === TYPES.GET_ACCOUNT_INIT) {
        return getAccountInit(state);
    }

    if (action.type === TYPES.GET_ACCOUNT_ERROR) {
        return getAccountError(state, action.error);
    }

    if (action.type === TYPES.GET_ACCOUNT_END) {
        return getAccountEnd(state, action.account_id);
    }

    return state;
}