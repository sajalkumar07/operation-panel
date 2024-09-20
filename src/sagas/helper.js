import { put } from "redux-saga/effects";
import { actionTypes } from "../actions";
import _get from "lodash/get";

const { REQUEST, SUCCESS, FAILURE } = actionTypes;

export function* sendPayload(apiResponse, event) {
  yield put({
    type:
      apiResponse.data && apiResponse.data.status
        ? event[SUCCESS]
        : event[FAILURE],
    payload: apiResponse.data
      ? apiResponse.data.status
        ? apiResponse.data.data
        : apiResponse.data.error
      : {}
  });
}

export function* sendPayloadOpsEntity(apiResponse, data) {
  const success = apiResponse.data && apiResponse.data.success;

  const type = success
    ? `${data.entityName}_${data.action}_SUCCESS`
    : `${data.entityName}_${data.action}_FAILURE`;

  if (success && data.cbs) {
    let res = apiResponse.data.data;
    for (const cb of data.cbs) {
      res = cb(res);
    }
    apiResponse.data.data = res;
  }

  yield put({
    type,
    payload: apiResponse.data
      ? apiResponse.data.success
        ? {
            entityName: data.entityName,
            action: data.action,
            data: apiResponse.data.data
          }
        : {
            entityName: data.entityName,
            action: data.action,
            data: apiResponse.data.error
          }
      : {}
  });
}

export function* sendPayloadFailure(error, event) {
  const errorStatus = _get(error, "response.status");
  if (errorStatus === 401) {
    yield put({
      type: actionTypes.LOGOUT[REQUEST]
    });
  } else {
    if (error.response) {
      yield put({
        type: event[FAILURE],
        payload: error.response.data ? error.response.data.error : {}
      });
    } else {
      yield put({
        type: event[FAILURE],
        payload: error.error
      });
    }
  }
}
