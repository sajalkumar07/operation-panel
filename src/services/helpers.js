import { GET_AUTH, isAuthenticated } from "./auth";
import axios from "axios";
import { config } from "../config";
import qs from "querystring";

export const apiHeaders = (cf_flag = false, cf_token = false) => {
  let authHeaders = isAuthenticated()
    ? {
        Authorization: "Bearer " + GET_AUTH()
      }
    : {};
  if (cf_flag && cf_token) {
    authHeaders = {
      ...authHeaders,
      "cf-access-token": cf_token
    };
  }
  return authHeaders;
};
export const api = function(timeout = 200000, baseURL = config.apiUrl) {
  return axios.create({
    baseURL,
    timeout,
    headers: {
      ...apiHeaders(
        config.toggle_main_cloudflared,
        config.main_cloudflared_token
      )
    }
  });
};
export const GET = async (url, params = {}) => {
  const response = await api().get(url, { params });
  window.newVersion =
    response.data.clientMeta && response.data.clientMeta.version;
  return response;
};
export const POST = async (url, data, config = {}, timeout) => {
  const response = await api(timeout).post(url, data, config);
  window.newVersion =
    response.data.clientMeta && response.data.clientMeta.version;
  return response;
};
export const PUT = async (url, data) => {
  const response = await api().put(url, data);
  window.newVersion =
    response.data.clientMeta && response.data.clientMeta.version;
  return response;
};
export const DELETE = async (url, data) => {
  const response = await api().delete(url, data);
  window.newVersion =
    response.data.clientMeta && response.data.clientMeta.version;
  return response;
};
export const CUSTOM_GET = async mainURL => {
  const response = await axios.get(mainURL);
  return response;
};

export const POST_EXT = async (url, data = {}, config = {}) => {
  const response = await axios.post(url, data, config);
  return response;
};

export const APICALL = callType => async (
  url,
  data = {},
  configOption = {}
) => {
  let response;
  switch (callType) {
    case "GET":
      response = await api(null, config.apiABurl).get(url, { data });
      break;
    case "POST":
      response = await api(null, config.apiABurl).post(url, data, configOption);
      break;
    case "PUT":
      response = await api(null, config.apiABurl).put(url, data);
      break;
    case "DEL":
      response = await api(null, config.apiABurl).delete(url, data);
      break;
  }
  window.newVersion =
    response.data.clientMeta && response.data.clientMeta.version;
  return response;
};
