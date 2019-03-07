import * as TYPES from "./action-types";

export const UserState = {
  loading: false,
  userId: null,
  accountId: null,
  error: null
};

// ---------- USER INFO ----------

export const userInfoReducer = (state = UserState, { payload, type }) => {
  switch (type) {
    case TYPES.GET_USER_INFO_START:
      return Object.assign({}, state, {
        loading: true,
        error: null
      });

    case TYPES.GET_USER_INFO_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        userId: payload || null,
        error: null
      });

    case TYPES.GET_USER_INFO_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: payload
      });

    default:
      return state;
  }
};

// ---------- USER ACCOUNTS ----------

export const userAccountsReducer = (state = UserState, { payload, type }) => {
  switch (type) {
    case TYPES.GET_USER_ACCOUNTS_START:
      return Object.assign({}, state, {
        loading: true,
        error: null
      });

    case TYPES.GET_USER_ACCOUNTS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        accountId: payload || null,
        error: null
      });

    case TYPES.GET_USER_ACCOUNTS_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: payload
      });

    default:
      return state;
  }
};
