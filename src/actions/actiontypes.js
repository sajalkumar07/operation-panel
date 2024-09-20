export const PENDING = "PENDING";
export const REQUEST = "REQUEST";
export const SUCCESS = "SUCCESS";
export const FAILURE = "FAILURE";
export const ALERT_CLOSE = "ALERT_CLOSE";
export const RESET_ERROR_MESSSAGE = "ERROR_MESSAGE_RESET";
export const SET = "SET";
export const UNSET = "UNSET";
export const RESET = "RESET";

export const createRequestTypes = (base) => {
  return [PENDING, REQUEST, SUCCESS, FAILURE, RESET].reduce((acc, type) => {
    if (type === RESET) acc[type] = `${base}`;
    else acc[type] = `${base}_${type}`;
    return acc;
  }, {});
};

export const RESCHEDULE = createRequestTypes("RESCHEDULE");
export const LOGIN = createRequestTypes("LOGIN");
export const GOOGLE_LOGIN = createRequestTypes("GOOGLE_LOGIN");
export const ONE_LOGIN = createRequestTypes("ONE_LOGIN");
export const AUTHENTICATE = createRequestTypes("AUTHENTICATE");
export const GET_CLASSES = createRequestTypes("GET_CLASSES");
export const GET_REFERRAL_DATA = createRequestTypes("GET_REFERRAL_DATA");
export const GET_ACTIVITIES = createRequestTypes("GET_ACTIVITIES");
export const GET_PROJECTS = createRequestTypes("GET_PROJECTS");
export const GET_REGION = createRequestTypes("GET_REGION");
export const GET_CONCENTRIX_DATA = createRequestTypes("GET_CONCENTRIX_DATA");
export const EDIT_REGION = createRequestTypes("EDIT_REGION");
export const DELETE_REGION = createRequestTypes("DELETE_REGION");
export const LOGOUT = createRequestTypes("LOGOUT");
export const OTP = createRequestTypes("OTP");
export const RESEND_OTP = createRequestTypes("RESEND_OTP");
export const VERIFY_OTP = createRequestTypes("VERIFY_OTP");
export const NEXTUI_REBUILD = createRequestTypes("NEXTUI_REBUILD");
export const CHECK_IS_USER_EXISTING = createRequestTypes(
  "CHECK_IS_USER_EXISTING"
);

export const SUBMIT_END_CLASS = createRequestTypes("SUBMIT_END_CLASS");

export const REQUEST_TYPES = {};
export const ENTITIES = [];
export const ACTIONS = ["ADD", "LIST", "ADDLIST", "UPDATE", "DELETE", "RESET"];

for (let i in ENTITIES) {
  for (let j in ACTIONS) {
    REQUEST_TYPES[ENTITIES[i] + "_" + ACTIONS[j]] = createRequestTypes(
      ENTITIES[i] + "_" + ACTIONS[j]
    );
  }
}

export const getRequestType = (entityName, action) =>
  REQUEST_TYPES[entityName + "_" + action];

export const FETCH_ORGANIZATIONS_REQUEST = "FETCH_ORGANIZATIONS_REQUEST";
export const FETCH_ORGANIZATIONS_SUCCESS = "FETCH_ORGANIZATIONS_SUCCESS";
export const FETCH_ORGANIZATIONS_FAILURE = "FETCH_ORGANIZATIONS_FAILURE";

// actionTypes.js
export const FETCH_ASSESSMENT_REQUEST = "FETCH_CANDIDATES_REQUEST";
export const FETCH_ASSESSMENT_SUCCESS = "FETCH_CANDIDATES_SUCCESS";
export const FETCH_ASSESSMENT_FAILURE = "FETCH_CANDIDATES_FAILURE";
