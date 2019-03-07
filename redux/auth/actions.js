import * as TYPES from "./action-types";
import { post } from "../../lib/http";

import { setItem } from "../../lib/deviceStorage";

export const signInStart = () => {
  return {
    type: TYPES.SIGN_IN_START
  };
};

export const signInError = error => {
  return dispatch => {
    dispatch({
      type: TYPES.SIGN_IN_ERROR,
      payload: error
    });
  };
};

export const signInSuccess = result => {
  return dispatch => {
    dispatch({
      type: TYPES.SIGN_IN_SUCCESS,
      payload: result
    });
  };
};

export const signIn = (username, password) => {
  return dispatch => {
    dispatch(signInStart());
    return post("oauth/token", null, { username, password }, true)
      .then(res => {
        return setItem("access_token", res.access_token)
          .then(() => {
            return dispatch(signInSuccess(res));
          })
          .catch(err => {
            throw err;
          });
      })
      .catch(err => {
        return dispatch(signInError(err));
      });
  };
};
