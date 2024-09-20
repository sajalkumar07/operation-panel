import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import authUser, * as authenticate from "./authUser";
import { actionTypes } from "../actions";
import { reduce, curry } from "ramda";
import _get from "lodash/get";
import {
  FETCH_ORGANIZATIONS_FAILURE,
  FETCH_ORGANIZATIONS_REQUEST,
  FETCH_ORGANIZATIONS_SUCCESS,
  FETCH_ASSESSMENT_REQUEST,
  FETCH_ASSESSMENT_SUCCESS,
  FETCH_ASSESSMENT_FAILURE,
} from "../actions/actiontypes";

const {
  AUTHENTICATE,
  REQUEST,
  FAILURE,
  SUCCESS,
  RESET,
  LOGIN,
  REGISTER,
  ENTITIES,
  ALERT_CLOSE,
} = actionTypes;

let anyInString = curry((l, s) =>
  reduce((arr, v) => (arr ? true : s.indexOf(v) > -1), false, l)
);
const clearRequestList = [
  "TEACHER_TIME_BASED_FILTER_LIST_REQUEST",
  "ELIGIBLE_BATCH_TEACHER_REQUEST",
  "NEW_AFFILIATE_BATCH_REQUEST",
  "AUTO_LOGIN_LIST_REQUEST",
  "ONE_LOGIN_REQUEST",
  "TEACHER_REASSIGN_LIST_REQUEST",
  "S3_UPLOAD_LIST_REQUEST",
  "CLASS_VERSION_LIST_REQUEST",
  "STUDENT_ALL_BATCH_LIST_REQUEST",
  "STUDENT_RECOMMENDED_BATCH_LIST_REQUEST",
  "COURSE_VERSION_LIST_REQUEST",
  "CLASS_POPUP_LIST_REQUEST",
  "CLASS_TO_POPUP_LIST_REQUEST",
  "STUDENT_BATCH_TEACHER",
  "STUDENT_ALL_BATCH_LIST_REQUEST",
  "STUDENT_RECOMMENDED_BATCH_LIST_REQUEST",
];
const ignoreSuccessList = ["STUDENT_SESSION_PROFILE"];

const updateRequestQueued = [
  "ACTIVITY_ADD_SUCCESS",
  "CLASS_ADD_SUCCESS",
  "PROJECT_ADD_SUCCESS",
];
const failureActionList = ["UNSET_ERROR_UPDATE_FAILURE"];
const objectAssgined = {
  TEACHER_TIME_BASED_FILTER: [{}],
};
let getStateUpdate = function({ payload, type }) {
  if (type === "RESCHEDULE_REQUEST") {
    return { request_status: "fetching" };
  }
  if (
    type === "BULK_AF_UPLOAD_LIST_REQUEST" ||
    type === "BULK_AF_UPLOAD_VALIDATE_LIST_REQUEST"
  ) {
    return { request_status: "fetching" };
  }
  if (
    type === "BULK_AF_UPLOAD_LIST_SUCCESS" ||
    type === "BULK_AF_UPLOAD_VALIDATE_LIST_SUCCESS"
  ) {
    return { request_status: "success" };
  }
  if (
    type === "BULK_AF_UPLOAD_LIST_FAILURE" ||
    type === "BULK_AF_UPLOAD_VALIDATE_LIST_FAILURE"
  ) {
    return { request_status: "failed" };
  }

  if (
    type === "STUDENT_LIST_FAILURE" &&
    payload.message === "SEARCH_RESTRICTED_REGION"
  ) {
    return {
      ...payload,
      request_status: "failure",
      errorMsg: "You don't have access to view this student.",
      errorCode: payload ? payload.code : null,
      STUDENT_LIST_FAILURE: true,
    };
  }
  if (type && type.indexOf("_RESET") > 0) {
    const entityName = type.slice(0, type.indexOf("_RESET"));
    let returnState = {};
    returnState[entityName] = payload || [];
    return returnState;
  }

  const typeSplitLength = type.split("_").length;
  let loadingKeyName = "";
  if (typeSplitLength > 1) {
    loadingKeyName = `${type
      .split("_")
      .slice(0, typeSplitLength - 1)
      .join("_")}_LOADING`;
  }
  const userAction = anyInString(["_ADD_", "_UPDATE_", "_DELETE_"], type);

  if (
    payload &&
    payload.entityName &&
    type.indexOf(SUCCESS) > 0 &&
    ENTITIES.indexOf(payload.entityName) > -1 &&
    type.indexOf("_ADDLIST_") > 0
  ) {
    if (payload.data) {
      return {
        [payload.entityName]: payload.data,
        [loadingKeyName]: false,
        request_status: "success",
      };
    } else {
      return {
        [loadingKeyName]: false,
        request_status: "success",
      };
    }
  } else if (type.indexOf("FAILURE") > 0 && type.indexOf("_ADDLIST_") > 0) {
    return {
      request_status: "failure",
      errorMsg: payload ? payload.message : "Api is not working",
      errorCode: payload ? payload.code : null,
    };
  } else if (
    payload &&
    payload.data &&
    payload.entityName &&
    type.indexOf(SUCCESS) > 0 &&
    ENTITIES.indexOf(payload.entityName) > -1 &&
    type.indexOf("_LIST_") > 0
  ) {
    return {
      [payload.entityName]: payload.data,
      [loadingKeyName]: false,
    };
  } else if (
    payload &&
    payload.entityName &&
    type.indexOf(SUCCESS) > 0 &&
    ENTITIES.indexOf(payload.entityName) > -1 &&
    userAction
  ) {
    let returnObj;
    if (updateRequestQueued.includes(type)) {
      returnObj = { request_status: "success", request_state: "QUEUED" };
    } else if (ignoreSuccessList.includes(payload.entityName)) {
      returnObj = { request_status: "savedSuccess" };
    } else {
      returnObj = { request_status: "success" };
    }
    if (loadingKeyName) {
      returnObj[loadingKeyName] = false;
    }
    return returnObj;
  } else if (
    type &&
    type.indexOf("FAILURE") > 0 &&
    payload &&
    payload.code &&
    parseInt(payload.code) === 403
  ) {
    const returnObj = {
      request_status: "failure",
      errorMsg: "Un-authorized access, please reach out to tech support team",
      errorCode: _get(payload, "code", null),
    };
    if (loadingKeyName) {
      returnObj[loadingKeyName] = false;
    }
    return returnObj;
  } else if (type && type === "S3_SIGNED_URL_FAILURE") {
    let returnObj = {
      request_status: "failure",
      errorMsg: "doc file is not allowed",
      errorCode: payload ? payload.code : null,
    };
    if (loadingKeyName) {
      returnObj[loadingKeyName] = false;
    }
    return returnObj;
  } else if (type && type.indexOf(FAILURE) > 0 && userAction) {
    let returnObj = null;
    if (type && failureActionList.includes(type)) {
      returnObj = {
        request_status: "NA",
        errorMsg: "",
        errorCode: null,
      };
    } else {
      returnObj = {
        request_status: "failure",
        errorMsg: payload ? payload.message : "",
        errorCode: payload ? payload.code : null,
      };
    }
    if (loadingKeyName) {
      returnObj[loadingKeyName] = false;
    }
    return returnObj;
  } else if (type && type.indexOf(REQUEST) > 0 && userAction) {
    const returnObj = {
      request_status: "fetching",
    };
    if (loadingKeyName) {
      returnObj[loadingKeyName] = true;
    }
    return returnObj;
  } else if (type && type.indexOf(REQUEST) > 0) {
    const returnObj = {
      request_status: "NA",
    };
    if (loadingKeyName) {
      returnObj[loadingKeyName] = true;
    }
    return returnObj;
  } else if (
    type &&
    type.indexOf(REQUEST) > 0 &&
    clearRequestList.includes(type)
  ) {
    let returnObj = {
      [type.slice(0, type.indexOf("LIST_REQUEST") - 1)]: objectAssgined[
        type.slice(0, type.indexOf("LIST_REQUEST") - 1)
      ],
    };
    if (loadingKeyName) {
      returnObj[loadingKeyName] = true;
    }
    return returnObj;
  } else if (type.indexOf(REQUEST) > 0 && loadingKeyName) {
    return { [loadingKeyName]: true };
  }
  return { [loadingKeyName]: false };
};
////////////////////////////////////////////////////////////////////////////////////

const initialState = {
  loading: false,
  organizations: [],
  assessment: [],
  error: null,
};

export const organizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORGANIZATIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ORGANIZATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        organizations: action.payload,
      };
    case FETCH_ORGANIZATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const assessmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ASSESSMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ASSESSMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        candidates: action.payload,
      };
    case FETCH_ASSESSMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
/////////////////////////////////////////////////////////////////////////////////////
export default (history) => {
  const entityData = (state = {}, action) => {
    if (action.type.indexOf("LOCATION_CHANGE") > -1) {
      return {
        ME: state.ME,
        COUNTRY: state.COUNTRY,
        OPS_CONFIG: state.OPS_CONFIG,
      };
    } else {
      if (action.type.indexOf("CLEAR_WEEKLY") > -1) {
        return { ...state, TEACHER_WS: {} };
      }
      //Clear wizard from state
      if (action.type.indexOf("CLEAR_NOTIFICATION_RULES_WIZARD") > -1) {
        return { ...state, NOTIFICATION_RULES_WIZARD: null };
      }
      if (action.type.indexOf("CLEAR_NOTIFICATION_UPDATE_RULES_WIZARD") > -1) {
        return { ...state, NOTIFICATION_RULES_UPDATE_WIZARD: null };
      }
      let update = getStateUpdate(action);
      return { ...state, ...update };
    }
  };
  return combineReducers({
    router: connectRouter(history),
    authUser: authUser(),
    entityData,
    organization: organizationReducer,
    assessment: assessmentReducer,
  });
};

export const getLoadingRequired = (state) => state.loadingRequired;

export const getIsSubmitting = (state) => state.isSubmitting;

export const getUser = (state) => state.authUser.loggedInUser;

export const getErrorMessage = (state) =>
  authenticate.errorMessage(state.authUser);

export const getIsAuthenticated = (state) =>
  authenticate.isAuthenticated(state.authUser);

export const authInProgress = (state) =>
  authenticate.authInProgress(state.authUser);

export const getUserRole = (state) =>
  authenticate.getLoggedInUserRole(state.authUser);

export const isAuthenticationNeeded = (state) =>
  authenticate.isAuthenticationNeeded(state.authUser);

export const getLoggedInUserTimeZone = (state, props) =>
  authenticate.getLoggedInUserTimeZone(state.authUser);

export const getLoggedInUserId = (state, props) =>
  authenticate.getLoggedInUserId(state.authUser);

export const getPathname = (state) => state.router;
export const getStateData = (state) => state;
export const otpStatus = (state) => authenticate.otpStatus(state.authUser);

export const getIsUserExists = (state) =>
  authenticate.getIsUserExists(state.authUser);
