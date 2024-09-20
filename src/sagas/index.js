import { push, replace } from "connected-react-router";
import { all, call, put, takeLatest, takeEvery } from "redux-saga/effects";
import {
  actionTypes,
  fetchOrganizationsFailure,
  fetchOrganizationsSuccess,
  fetchAssessmentSuccess,
  fetchAssessmentFailure,
} from "../actions";
import { setTimeZone } from "../helpers/dateHelper";
import _get from "lodash/get";
import _omit from "lodash/omit";
import { isAuthenticated, REMOVE_AUTH, SET_AUTH } from "../services/auth";
import loginAuthenticationRole from "../constants/LoginAuthenticationRole";
import {
  sendPayload,
  sendPayloadFailure,
  sendPayloadOpsEntity,
} from "./helper";
import {
  loginUser,
  loggedInUser,
  getRegions,
  editRegions,
  deleteRegions,
  getStudentById,
  getTeacherById,
  getSlotsWithBookings,
  getAllConfigs,
  cancelStudentSlots,
  bookTrialSlot,
  getStudentBookings,
  getOTP,
  resendOTP,
  verifyOTP,
  apiMap,
  loginWithGoogle,
  generateCertificateLink,
  fetchTeacherLeave,
  getAffiliateById,
  loginWithOneLogin,
  checkExistingUser,
  getSignedUrlForOps,
  getDocumentUrl,
  getCDN,
  weeklyChallenge,
  postEndClass,
  rebuildNextUI,
  getStudentAlternateBookings,
  bookClassViaAlternateBooking,
  fetchCreditLedger,
} from "../services/index";

import {
  GET_REGION,
  EDIT_REGION,
  DELETE_REGION,
  getRequestType,
  OTP,
  RESEND_OTP,
  VERIFY_OTP,
  GOOGLE_LOGIN,
  GET_CONCENTRIX_DATA,
  ONE_LOGIN,
  CHECK_IS_USER_EXISTING,
  FETCH_ORGANIZATIONS_REQUEST,
  FETCH_ASSESSMENT_REQUEST,
} from "../actions/actiontypes";

import { getMe } from "../services";
import axios from "axios";
import { apiUrl } from "../config/environments/development";
import { temporaryToken } from "../helpers/utils";

const {
  SUCCESS,
  REQUEST,
  FAILURE,
  LOGIN,
  AUTHENTICATE,
  LOGOUT,
  ENTITIES,
  ACTIONS,
  RESCHEDULE,
} = actionTypes;

const newLocal = "Not Authenticated";
//////////////////////////////////////////////////////////////////////////////////////////
function* fetchOrganizationsSaga(action) {
  try {
    // Dynamic Authorization header (replace with proper token management)
    const token = temporaryToken;
    const response = yield call(axios.get, `${apiUrl}/organization/List`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Destructure the response safely
    const organizations = response.data?.data?.data?.organizations || [];

    if (organizations.length === 0) {
      console.log("No organizations found");
    } else {
      console.log("Organizations found:", organizations);
    }

    yield put(fetchOrganizationsSuccess(organizations));
  } catch (error) {
    yield put(fetchOrganizationsFailure(error.message));
  }
}

// Root Saga for Organizations
export function* organizationSaga() {
  yield takeEvery(FETCH_ORGANIZATIONS_REQUEST, fetchOrganizationsSaga);
}

function* fetchAssessmentSaga(action) {
  try {
    // Extract userId from action payload
    const { userId } = action.payload;

    // Dynamic Authorization header (replace with proper token management)
    const token = localStorage.getItem("temporaryToken");

    // Make API call using axios and call effect
    const response = yield call(
      axios.get,
      `${apiUrl}/exam/list?orgId=${userId}&page=1&size=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Destructure the response safely
    const assessments = response.data?.data?.data || [];

    // Check if data exists and log the outcome
    if (assessments.length === 0) {
      console.log("No assessments found");
    } else {
      console.log("Assessments found:", assessments);
    }

    // Dispatch success action with the retrieved assessments
    yield put(fetchAssessmentSuccess(assessments));
  } catch (error) {
    // Dispatch failure action with error message
    yield put(fetchAssessmentFailure(error.message));
  }
}

export function* assessmentSaga() {
  yield takeLatest(FETCH_ASSESSMENT_REQUEST, fetchAssessmentSaga);
}
/////////////////////////////////////////////////////////////////////////////////////////

function* handleLoginUser({ data }) {
  try {
    REMOVE_AUTH();
    const apiResponse = yield call(loginUser, data);
    yield put(replace("/dashboard"));
    console.log(apiResponse);
    // if (apiResponse.data.success && apiResponse.data.data) {
    // checks if the user has ops related role

    // !apiResponse.data.success || SET_AUTH(apiResponse.data.data);
    yield sendPayload(apiResponse, LOGIN);
  } catch (e) {
    yield sendPayloadFailure(e, LOGIN);
  }
}
function* handleOTPRequest({ data }) {
  try {
    const apiResponse = yield call(getOTP, data);
    yield sendPayload(apiResponse, OTP);
  } catch (e) {
    yield sendPayloadFailure(e, OTP);
  }
}
function* handleResendOTPRequest({ data }) {
  try {
    const apiResponse = yield call(resendOTP, data);
    yield sendPayload(apiResponse, RESEND_OTP);
  } catch (e) {
    yield sendPayloadFailure(e, RESEND_OTP);
  }
}
function* handleVerifyOTPRequest({ data }) {
  try {
    const apiResponse = yield call(verifyOTP, data);
    !apiResponse.data.success || SET_AUTH(apiResponse.data.data);
    if (
      apiResponse.data.success &&
      apiResponse.data.data &&
      apiResponse.data.data.userRoles
    ) {
      // checks if the user has ops related role
      let userRoles = apiResponse.data.data.userRoles;
      let hasValidRole = false;
      for (let i = 0; i < userRoles.length; i++) {
        hasValidRole = !loginAuthenticationRole.includes(userRoles[i]);
        if (!hasValidRole) {
          break;
        }
      }
      if (!hasValidRole) {
        yield sendPayloadFailure(LOGIN);
      }
    }
    yield sendPayload(apiResponse, VERIFY_OTP);
  } catch (e) {
    yield sendPayloadFailure(e, VERIFY_OTP);
  }
}

function* handleLogOutUser({ data }) {
  try {
    REMOVE_AUTH();
    yield put({ type: LOGOUT[SUCCESS] });
    yield put({
      type: `ME_LIST_SUCCESS`,
      payload: {
        entityName: "ME",
        action: "LIST",
        data: {},
      },
    });
    yield put(replace("/"));
  } catch (e) {
    yield sendPayloadFailure(e, LOGIN);
  }
}

function* handleLoginSuccess() {
  console.log("inside login success");
  console.log("Current location: ", window.location.pathname);
  yield put(push("/dashboard"));
  // const response = yield call(getMe, {});
  // yield sendPayloadOpsEntity(response, {
  //   entityName: "ME",
  //   action: "LIST",
  //   body: {},
  // });
  console.log("After replace action");
}

function* handleAuthenticationRequest({ data }) {
  try {
    if (isAuthenticated()) {
      const apiResponse = yield call(loggedInUser);
      yield sendPayload(apiResponse, AUTHENTICATE);
    } else {
      throw newLocal;
    }
  } catch (e) {
    yield sendPayloadFailure(e, AUTHENTICATE);
  }
}

function* onAuthenticationSucess({ payload }) {
  yield setTimeZone(payload.timezone);
}

function* onAuthenticationFailure() {
  yield put(replace("/"));
}

const SUCCESS_HANDLERS = {};

const callFn = function*(fn, { entityName, action, body = {} }) {
  const response = yield call(fn, body);
  yield sendPayloadOpsEntity(response, {
    entityName,
    action,
    body,
  });
};

const FAILURE_HANDLERS = {};

let bodyCache = {};

function* handleOpsAction({ data }) {
  try {
    if (data.action === "LIST") {
      let key = `${data.entityName}_${data.action}`;
      bodyCache[key] = data.body;
    }
    const apiResponse = yield call(
      apiMap[`${data.entityName}_${data.action}`],
      data.body
    );
    yield sendPayloadOpsEntity(apiResponse, data);

    if (
      apiMap[`${data.entityName}_LIST`] &&
      ["ADD", "UPDATE", "DELETE"].includes(data.action)
    ) {
      const response = yield call(
        apiMap[`${data.entityName}_LIST`],
        bodyCache[`${data.entityName}_LIST`] || {}
      );
      yield sendPayloadOpsEntity(response, {
        entityName: data.entityName,
        action: "LIST",
        body: data.body || {},
      });
    }

    if (SUCCESS_HANDLERS[`${data.entityName}_${data.action}`]) {
      let fn = SUCCESS_HANDLERS[`${data.entityName}_${data.action}`];
      for (let i = 0; i < fn.length; i++) {
        let key = `${fn[i].entityName}_${fn[i].action}`;
        if (bodyCache[key]) {
          data.body = bodyCache[key];
        }
        if (apiMap[key])
          yield callFn(apiMap[key], { ...fn[i], body: data.body });
      }
    }
  } catch (e) {
    if (FAILURE_HANDLERS[`${data.entityName}_${data.action}`]) {
      let fn = FAILURE_HANDLERS[`${data.entityName}_${data.action}`];
      for (let i = 0; i < fn.length; i++) {
        let key = `${fn[i].entityName}_${fn[i].action}`;
        if (bodyCache[key]) {
          data.body = bodyCache[key];
        }
        if (apiMap[key])
          yield callFn(apiMap[key], { ...fn[i], body: data.body });
      }
    }
    yield sendPayloadFailure(e, getRequestType(data.entityName, data.action));
  }
}

export function* handleExistingUserValidation({ data }) {
  try {
    let apiResponse;

    apiResponse = yield call(checkExistingUser, data);

    if (apiResponse.data.success) {
      yield sendPayload(apiResponse, CHECK_IS_USER_EXISTING);
    }
  } catch (e) {
    yield sendPayloadFailure(e, CHECK_IS_USER_EXISTING);
  }
}

export default function* rootSaga() {
  const watchers = {
    watchLoginUser: takeLatest(LOGIN[REQUEST], handleLoginUser),
    watchLoginSuccess: takeLatest(LOGIN[SUCCESS], handleLoginSuccess),
    watchLogOutUser: takeLatest(actionTypes.LOGOUT[REQUEST], handleLogOutUser),
    watchOTPRequest: takeLatest(actionTypes.OTP[REQUEST], handleOTPRequest),
    watchResendOTPRequest: takeLatest(
      actionTypes.RESEND_OTP[REQUEST],
      handleResendOTPRequest
    ),
    watchVerifyOTPRequest: takeLatest(
      actionTypes.VERIFY_OTP[REQUEST],
      handleVerifyOTPRequest
    ),
    watchVerifyOTPSuccess: takeLatest(
      actionTypes.VERIFY_OTP[SUCCESS],
      handleLoginSuccess
    ),

    watchLoginWithGoogleSuccess: takeLatest(
      actionTypes.GOOGLE_LOGIN[SUCCESS],
      handleLoginSuccess
    ),

    watchAuthRequest: takeLatest(
      AUTHENTICATE[REQUEST],
      handleAuthenticationRequest
    ),

    watchAuthFailure: takeLatest(
      AUTHENTICATE[FAILURE],
      onAuthenticationFailure
    ),

    watchExistingContactValidation: takeLatest(
      CHECK_IS_USER_EXISTING[REQUEST],
      handleExistingUserValidation
    ),
  };
  const states = ["REQUEST", "SUCCESS", "FAILURE"];
  for (let i in ENTITIES) {
    for (let j in ACTIONS) {
      for (let k in states) {
        if (states[k] === "REQUEST") {
          watchers[`watch${ENTITIES[i]}${ACTIONS[j]}${states[k]}`] = takeLatest(
            `${ENTITIES[i]}_${ACTIONS[j]}_${states[k]}`,
            handleOpsAction
          );
        } else {
        }
      }
    }
  }
  yield all(watchers);
  yield all([organizationSaga()]);
  yield all([assessmentSaga()]);
}
