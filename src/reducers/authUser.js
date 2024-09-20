import { combineReducers } from "redux";
import moment from "moment-timezone";
import { actionTypes } from "../actions";
import axios from "axios";
import { RESET_ERROR_MESSSAGE} from "../actions/actiontypes";
import { setCookie } from "../helpers/cookie";
const {
  AUTHENTICATE,
  REQUEST,
  FAILURE,
  SUCCESS,
  LOGIN,
  REGISTER,
  GOOGLE_LOGIN,
  SET,
  UNSET,
  OTP,
  VERIFY_OTP,
  OTP_STATUS,
  ALERT_CLOSE,
  LOGOUT,
  RESEND_OTP,
  ONE_LOGIN,
  CHECK_IS_USER_EXISTING,
  RESET_USER_VALIDATION
} = actionTypes;

const authUser = () => {
  const isAuthenticated = (state = false, payLoad) => {
    switch (payLoad.type) {
      case AUTHENTICATE[SUCCESS]:
      case LOGIN[SUCCESS]:
        return true;
      case LOGIN[REQUEST]:
      case LOGIN[FAILURE]:
        return state;
      case AUTHENTICATE[REQUEST]:
        return false;
      default:
        return state;
    }
  };
  const authInProgress = (state = false, payLoad) => {
    switch (payLoad.type) {
      case AUTHENTICATE[REQUEST]:
        return true;
      case AUTHENTICATE[FAILURE]:
      case AUTHENTICATE[SUCCESS]:
        return false;
      default:
        return state;
    }
  };

  const needAuthentication = (state = false, payLoad) => {
    switch (payLoad.type) {
      case LOGIN[SUCCESS]:
        return true;
      case AUTHENTICATE[SUCCESS]:
      case LOGIN[FAILURE]:
      case LOGIN[REQUEST]:

      case AUTHENTICATE[FAILURE]:
      case AUTHENTICATE[REQUEST]:
        return false;
      default:
        return state;
    }
  };

  const lastAccessedRoute = (state = "", action) => {
    switch (action.type) {
      case AUTHENTICATE[REQUEST]:
        return action.data.from;
      case AUTHENTICATE[FAILURE]:
      case AUTHENTICATE[SUCCESS]:
      default:
        return state;
    }
  };

  const loggedInUser = (state = {}, action) => {
    switch (action.type) {
      case AUTHENTICATE[SUCCESS]:
      case LOGIN[SUCCESS]:
        if (action.payload.timezone) {
          axios.defaults.params = {};
          axios.defaults.params["timezone"] = action.payload.timezone;
        }
        axios.defaults.params["langCode"] = "en_US";
        setCookie("langCode", "en_US", 355);
        return action.payload;
      case AUTHENTICATE[FAILURE]:
      case AUTHENTICATE[REQUEST]:
      default:
        return state;
    }
  };
  const loggedInStudents = (state = {}, action) => {
    switch (action.type) {
      case AUTHENTICATE[SUCCESS]:
      case LOGIN[SUCCESS]:
        return action.payload;
      case AUTHENTICATE[FAILURE]:
      case AUTHENTICATE[REQUEST]:
      default:
        return state;
    }
  };


  const errorMessage = (state = "", payload) => {
    switch (payload.type) {
      case LOGIN[FAILURE]:
        return typeof payload.payload === "undefined"
          ? "Network error"
          : payload.payload.message;
      case GOOGLE_LOGIN[FAILURE]:
        return typeof payload.payload === "undefined"
          ? "Network error"
          : payload.payload.message;
      case ONE_LOGIN[FAILURE]:
        return typeof payload.payload === "undefined"
          ? "Netwok error"
          : payload.payload.message;
      case OTP[FAILURE]:
        return typeof payload.payload === "undefined"
          ? "Network error"
          : payload.payload.message;
      case RESEND_OTP[FAILURE]:
        return typeof payload.payload === "undefined"
          ? "Network error"
          : payload.payload.message;
      case VERIFY_OTP[FAILURE]:
        return typeof payload.payload === "undefined"
          ? "Network error"
          : payload.payload.message;
      case RESET_ERROR_MESSSAGE:
        return "";
      case ALERT_CLOSE:
        return "";
      default:
        return state;
    }
  };

  const errorDetails = (state = "", payload) => {
    switch (payload.type) {
      case LOGIN[FAILURE]:
        return typeof payload.payload === "undefined"
          ? "Network error"
          : payload.payload;
      case OTP[FAILURE]:
        return typeof payload.payload === "undefined"
          ? "Network error"
          : payload.payload;
      case RESEND_OTP[FAILURE]:
        return typeof payload.payload === "undefined"
          ? "Network error"
          : payload.payload;
      case VERIFY_OTP[FAILURE]:
        return typeof payload.payload === "undefined"
          ? "Network error"
          : payload.payload;
      case LOGOUT[SUCCESS]:
        return Object.assign({});
      default:
        return state;
    }
  };
  const InitialOTPdata = {
    showValidation: false,
    showCaptcha: false
  };
  const otpData = (state = InitialOTPdata, payload) => {
    switch (payload.type) {
      case OTP[SUCCESS]:
        return Object.assign({}, state, payload.payload, {
          showValidation: true
        });
      case OTP[REQUEST]:
      case RESEND_OTP[SUCCESS]:
      case VERIFY_OTP[FAILURE]:
        return Object.assign({}, state, { showValidation: true });
      case VERIFY_OTP[SUCCESS]:
        return Object.assign({}, state, {
          showValidation: false,
          showCaptcha: true
        });
      case RESEND_OTP[FAILURE]:
      case OTP[FAILURE]:
        return Object.assign({}, state, { showValidation: false });
      default:
        return state;
    }
  };
  //TODO:[Refactor] Remove loggedInTeachers and loggedInStudent
  // not being used, data is fetched from loggedInUser
  const initialUserValidationCheck = {
    isExist: false,
    emailExists: false,
    mobileExists: false
  };

  const isUserExists = (state = { ...initialUserValidationCheck }, action) => {
    switch (action.type) {
      case CHECK_IS_USER_EXISTING[REQUEST]:
        return { ...state, isExist: "loading" };
      case CHECK_IS_USER_EXISTING[FAILURE]:
        return { ...state, isExist: false };
      case CHECK_IS_USER_EXISTING[SUCCESS]:
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };

  return combineReducers({
    isAuthenticated,
    //lastAccessedRoute,
    loggedInUser,
    loggedInStudents,
    authInProgress,
    needAuthentication,
    errorMessage,
    errorDetails,
    otpData,
    isUserExists,

  });
};

export default authUser;

export const lastAccessedRoute = state => state.lastAccessedRoute;
export const errorMessage = state => state.errorMessage;

export const isAuthenticated = state => state.isAuthenticated;

export const getLoggedInUserId = state => state.loggedInUser.id;

export const getLoggedInUserCourseId = state => state.loggedInUser.course.id;

export const authInProgress = state => state.authInProgress;

export const getStudent = state => {
  if (
    state.loggedInUser &&
    state.loggedInUser.students &&
    state.loggedInUser.students.length > 0
  ) {
    return state.loggedInUser.students[0];
  }
  return null;
};

export const getTeacher = state => {
  if (state.loggedInUser.teachers && state.loggedInUser.teachers.length > 0) {
    return state.loggedInUser.teachers[0];
  }
  return null;
};

export const getLoggedInUserRole = state => {
  if ("userRoles" in state.loggedInUser) {
    return state.loggedInUser.userRoles[0];
  } else {
    return null;
  }
};

export const isAuthenticationNeeded = state => state.needAuthentication;

export const getLoggedInUserTimeZone = state =>
  state.loggedInUser.timezone || moment.tz.guess();
export const otpStatus = state => state.otpStatus;

export const getIsUserExists = state => state.isUserExists;
