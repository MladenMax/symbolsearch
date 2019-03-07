import * as TYPES from "./action-types";

export const AuthState = {
  loading: false,
  authenticated: false,
  token: null,
  error: null
};

export const authReducer = (state = AuthState, { payload, type }) => {
  switch (type) {
    case TYPES.SIGN_IN_START:
      return Object.assign({}, state, {
        loading: true,
        error: null
      });

    case TYPES.SIGN_IN_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        authenticated: !!payload,
        token: payload || null,
        error: null
      });

    case TYPES.SIGN_IN_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: payload
      });

    default:
      return state;
  }
};
