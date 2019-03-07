import axios from "axios";
import queryString from "qs";

import { apiConfig } from "../config/api";

import { getItem } from "../lib/deviceStorage";

const getAccessToken = () => {
  return getItem("access_token");
};

export const getHeaders = (onlyAuth, method, token) => {
  let headers = {};

  if (onlyAuth) {
    headers = { "Content-Type": "application/x-www-form-urlencoded" };
  } else if (method === "put") {
    headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded"
    };
  } else {
    headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    };
  }

  return headers;
};

export const request = (options, onlyAuth = false) => {
  if (!options.url) {
    throw new Error("url is required");
  }

  return getAccessToken()
    .then(token => {
      options.baseURL = apiConfig.baseUrl;
      options.method = options.method || "get";
      options.headers = getHeaders(onlyAuth, options.method, token);
    
      if (onlyAuth) {
        options.data.client_id = apiConfig.clientId;
        options.data.grant_type = apiConfig.grantTypes.password;
      }

      if (options.data) {
        options.data = queryString.stringify(options.data);
      }

      return axios(options)
        .then(res => {
          return res.data;
        })
        .catch(res => {
          let err = null;
          let response = res.response;
          if (response && response.data) {
            err = response.data;
          } else if (response) {
            err = new Error(response.statusText);
            err.status = response.status;
          } else {
            err = new Error(res.message || "HTTP Error");
            err.status = 0;
          }
          throw err;
        });
    })
    .catch(err => {
      throw err;
    });
};

export const get = (url, params) => request({ url, params });
export const post = (url, params, data, onlyAuth) =>
  request({ method: "post", url, params, data }, onlyAuth);
export const put = (url, params, data) =>
  request({ method: "put", url, params, data });
