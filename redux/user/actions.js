import * as TYPES from "./action-types";
import { get } from "../../lib/http";

import { setItem, getItem } from "../../lib/deviceStorage";

// ---------- USER INFO ----------

export const getUserInfoStart = () => {
  return {
    type: TYPES.GET_USER_INFO_START
  };
};

export const getUserInfoError = error => {
  return dispatch => {
    dispatch({
      type: TYPES.GET_USER_INFO_ERROR,
      payload: error
    });
  };
};

export const getUserInfoSuccess = result => {
  return dispatch => {
    dispatch({
      type: TYPES.GET_USER_INFO_SUCCESS,
      payload: result
    });
  };
};

export const getUserInfo = () => {
  return dispatch => {
    dispatch(getUserInfoStart());
    return get("/users/me", null)
      .then(res => {
        return setItem("user_id", res.id)
          .then(() => {
            return dispatch(getUserInfoSuccess(res.id));
          })
          .catch(err => {
            throw err;
          });
      })
      .catch(err => {
        return dispatch(getUserInfoError(err));
      });
  };
};

// ---------- USER ACCOUNTS ----------

export const getUserAccountsStart = () => {
  return {
    type: TYPES.GET_USER_ACCOUNTS_START
  };
};

export const getUserAccountsError = error => {
  return dispatch => {
    dispatch({
      type: TYPES.GET_USER_ACCOUNTS_ERROR,
      payload: error
    });
  };
};

export const getUserAccountsSuccess = result => {
  return dispatch => {
    dispatch({
      type: TYPES.GET_USER_ACCOUNTS_SUCCESS,
      payload: result
    });
  };
};

export const getUserAccounts = () => {
  return dispatch => {
    dispatch(getUserAccountsStart());
    return getItem("user_id")
      .then(userId => {
        return get(`/users/${userId}/accounts`, null)
          .then(res => {
            return setItem("account_id", res[0].id)
              .then(() => {
                return dispatch(getUserAccountsSuccess(res[0].id));
              })
              .catch(err => {
                throw err;
              });
          })
          .catch(err => {
            return dispatch(getUserAccountsError(err));
          });
      })
      .catch(err => {
        throw err;
      });
  };
};
