import * as actions from "./actiontypes";
import { compose, curry } from "ramda";
import { api } from "../services/helpers";

const {
  LOGIN,
  REQUEST,
  SUCCESS,
  FAILURE,
  RESET,
  ALERT_CLOSE,
  AUTHENTICATE,
  getRequestType,
  LOGOUT,
  OTP,
  RESEND_OTP,
  VERIFY_OTP,
  GOOGLE_LOGIN,
  CHECK_IS_USER_EXISTING,
  FETCH_ORGANIZATIONS_REQUEST,
  FETCH_ORGANIZATIONS_SUCCESS,
  FETCH_ORGANIZATIONS_FAILURE,
  FETCH_ASSESSMENT_REQUEST,
  FETCH_ASSESSMENT_SUCCESS,
  FETCH_ASSESSMENT_FAILURE,
} = actions;

export const action = (type, payload = {}) => {
  return { type, ...payload };
};

export const login = {
  request: (data) => action(LOGIN[REQUEST], { data }),
  success: (data, response) => {
    action(LOGIN[SUCCESS], { data, response });
  },
  failure: (login, error) => action(LOGIN[FAILURE], { login, error }),
  errorClose: (flg) => action(ALERT_CLOSE, { flg }),
};

export const logout = {
  request: (data) => action(LOGOUT[REQUEST], { data }),
  success: (data, response) => action(LOGOUT[SUCCESS], { data, response }),
  failure: (logout, error) => action(LOGOUT[FAILURE], { logout, error }),
  errorClose: (flg) => action(ALERT_CLOSE, { flg }),
};

export const authentication = {
  request: (data) => action(AUTHENTICATE[REQUEST], { data }),
  success: (data, response) =>
    action(AUTHENTICATE[SUCCESS], { data, response }),
  failure: (login, error) => action(AUTHENTICATE[FAILURE], { login, error }),
};
export const sendOTP = {
  request: (data) => action(OTP[REQUEST], { data }),
  success: (data, response) => action(OTP[SUCCESS], { data, response }),
  failure: (login, error) => action(OTP[FAILURE], { login, error }),
  errorClose: (flg) => action(ALERT_CLOSE, { flg }),
};
export const resendOTP = {
  request: (data) => action(RESEND_OTP[REQUEST], { data }),
  success: (data, response) => action(RESEND_OTP[SUCCESS], { data, response }),
  failure: (login, error) => action(RESEND_OTP[FAILURE], { login, error }),
  errorClose: (flg) => action(ALERT_CLOSE, { flg }),
};
export const verifyOTPAction = {
  request: (data) => action(VERIFY_OTP[REQUEST], { data }),
  success: (data, response) => action(VERIFY_OTP[SUCCESS], { data, response }),
  failure: (login, error) => action(VERIFY_OTP[FAILURE], { login, error }),
  errorClose: (flg) => action(ALERT_CLOSE, { flg }),
};

export const loginWithGoogle = {
  request: (data) => action(GOOGLE_LOGIN[REQUEST], { data }),
  success: (data, response) =>
    action(GOOGLE_LOGIN[SUCCESS], { data, response }),
  failure: (login, error) => action(GOOGLE_LOGIN[FAILURE], { login, error }),
};

export const doEntityOps = {
  request: (data) =>
    action(getRequestType(data.entityName, data.action)[REQUEST], { data }),
  success: (data, response) =>
    action(getRequestType(data.entityName, data.action)[SUCCESS], {
      data,
      response,
    }),
  failure: (data, error) =>
    action(getRequestType(data.entityName, data.action)[FAILURE], {
      data,
      error,
    }),
  reset: (data) =>
    action(getRequestType(data.entityName, data.action)[RESET], { data }),
};

export const dispatchWithRequest = curry((fn, dispatch) => {
  let valOrDef = (d) => (v, extraArgs) =>
    v ? (extraArgs ? { body: v, ...extraArgs } : { body: v }) : d;
  let attachBody = (o) => (body) => ({ ...o, ...body });
  let attachResetAction = (o) => (body) => ({ ...o, ...body, action: "RESET" });
  let req = (params) =>
    compose(dispatch, doEntityOps.request, attachBody(params), valOrDef({}));
  let reset = (params) =>
    compose(
      dispatch,
      doEntityOps.reset,
      attachBody(params),
      attachResetAction(params),
      valOrDef({})
    );
  return fn(dispatch, req, reset);
});

export const checkIsUserExists = {
  request: (data) => action(CHECK_IS_USER_EXISTING[REQUEST], { data }),
  success: (data, response) =>
    action(CHECK_IS_USER_EXISTING[SUCCESS], { data, response }),
  failure: (data, response) =>
    action(CHECK_IS_USER_EXISTING[FAILURE], { data, response }),
};

export const customApiCall = (method, url, data) =>
  new Promise(async (resolve, reject) => {
    const response = await api()[method](url, data);
    if (response.status === 200) {
      resolve({
        status: response.status,
        data: response.data,
      });
    } else {
      reject({
        status: response.status,
        data: response.data,
      });
    }
  }).catch((error) => {});

export const actionTypes = {
  ...actions,
};

////////////////////////////////////////////////////////////////////////
export const fetchOrganizationsRequest = () => ({
  type: FETCH_ORGANIZATIONS_REQUEST,
});

export const fetchOrganizationsSuccess = (organizations) => ({
  type: FETCH_ORGANIZATIONS_SUCCESS,
  payload: organizations,
});

export const fetchOrganizationsFailure = (error) => ({
  type: FETCH_ORGANIZATIONS_FAILURE,
  payload: error,
});

export const fetchAssessmentRequest = () => ({
  type: FETCH_ASSESSMENT_REQUEST,
});

export const fetchAssessmentSuccess = (assessment) => ({
  type: FETCH_ASSESSMENT_SUCCESS,
  payload: assessment,
});

export const fetchAssessmentFailure = (error) => ({
  type: FETCH_ASSESSMENT_FAILURE,
  payload: error,
});
////////////////////////////////////////////////////////////////
