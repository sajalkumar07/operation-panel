import axios from "axios";
import { config } from "../config";
import { getCookie } from "../helpers/cookie";
import { GET_AUTH, isAuthenticated } from "./auth";
import moment from "moment-timezone";
import { checkIfString } from "../helpers/utils";
import {
  api,
  apiHeaders,
  CUSTOM_GET,
  DELETE,
  GET,
  POST,
  PUT,
  POST_EXT,
  APICALL,
  CUSTOM_POST
} from "./helpers";

axios.defaults.params = {};

const langCode = getCookie("langCode");

if (langCode) axios.defaults.params["langCode"] = langCode || "en_US";

const hackathonApi = function(timeout = 200000) {
  const req = axios.create({
    baseURL: config.HACKATHON_BASE_URL,
    timeout,
    headers: {
      ...apiHeaders(
        config.toggle_hackathon_cloudflared,
        config.hackathon_cloudflared_token
      )
    }
  });
  req.interceptors.response.use(
    function(response) {
      return { ...response, data: { ...response.data, success: true } };
    },
    function(error) {
      return Promise.reject({
        ...error,
        response: {
          ...error.response,
          data: {
            ...error.response.data,
            error: { message: error.response.data.message }
          }
        }
      });
    }
  );
  return req;
};

const GET_HACKATHON = async (url, params = {}) => {
  const response = await hackathonApi().get(url, { params });
  window.newVersion =
    response.data.clientMeta && response.data.clientMeta.version;
  return response;
};
const POST_HACKATHON = async (url, data, config = {}, timeout) => {
  const response = await hackathonApi(timeout).post(url, data, config);
  window.newVersion =
    response.data.clientMeta && response.data.clientMeta.version;
  return response;
};

const PUT_HACKATHON = async (url, data) => {
  const response = await hackathonApi().put(url, data);
  window.newVersion =
    response.data.clientMeta && response.data.clientMeta.version;
  return response;
};

const DELETE_HACKATHON = async (url, data) => {
  const response = await hackathonApi().delete(url, data);
  window.newVersion =
    response.data.clientMeta && response.data.clientMeta.version;
  return response;
};
export const loginUser = data => POST(`user/login`, data);
// Community Events

// Hackathon Contest Event

export const hackathon = {
  contestEvent: {
    getAll: data => GET_HACKATHON(`/community-hackathon/contest-event`, data),
    create: data => POST_HACKATHON(`/community-hackathon/contest-event`, data),
    update: data => PUT_HACKATHON(`/community-hackathon/contest-event`, data),
    shiftEventDate: ({ contestEventId, days }) =>
      PUT_HACKATHON(
        `/community-hackathon/contest-event/shift-date?days=${days}&contestEventId=${contestEventId}`,
        {}
      )
  },
  rootContest: {
    getAll: data => GET_HACKATHON(`/community-hackathon/parent-contest`, data),
    create: data => POST_HACKATHON(`/community-hackathon/contest`, data),
    update: data => PUT_HACKATHON(`/community-hackathon/contest`, data)
  },
  dailyContest: {
    getAll: data => GET_HACKATHON(`community-hackathon/contests`, data),
    create: data => POST_HACKATHON(`/community-hackathon/daily-contest`, data),
    update: data => PUT_HACKATHON(`/community-hackathon/daily-contest`, data)
  },
  challenges: {
    getAll: data => GET_HACKATHON(`/community-hackathon/all-challenges`, data),
    update: data =>
      POST_HACKATHON(`/community-hackathon/daily-contest/challenges`, data)
  }
};

export const weeklyChallenge = {
  event: {
    getAll: data =>
      GET_HACKATHON(`/community-challenge/event?langCode=en_US`, data),
    create: data => POST_HACKATHON("/community-challenge/event", data),
    update: data => PUT_HACKATHON("/community-challenge/event", data)
  },
  contest: {
    getAll: data => GET_HACKATHON("/community-challenge/contest", data),
    create: data => POST_HACKATHON("/community-challenge/contest", data),
    update: data => PUT_HACKATHON("/community-challenge/contest", data)
  },
  question: {
    getTagged: data =>
      GET_HACKATHON("/community-challenge/contest/questions", data),
    getUntagged: data => GET_HACKATHON("/community-challenge/question", data),
    create: data => POST_HACKATHON("/community-challenge/question", data),
    update: data => PUT_HACKATHON("/community-challenge/question", data),
    assign: data =>
      POST_HACKATHON("community-challenge/contest/questions", data),
    addTags: data =>
      POST_HACKATHON(`community-challenge/add/question/tags`, data),
    editTags: data =>
      POST_HACKATHON(`community-challenge/update/question/tags`, data)
  }
};
export const communityTags = {
  getAll: data => GET_HACKATHON(`/community-challenge/tag/get`, data),
  create: data => POST_HACKATHON("/community-challenge/tag/create", data),
  update: data => POST_HACKATHON("/community-challenge/tag/update", data),
  delete: data => POST_HACKATHON("/community-challenge/tag/delete", data)
};

//Hackathon Evaluation
export const getEvaluationProjects = ({ courseId, level = 4 }) =>
  GET_HACKATHON(`/community-hackathon/submissions/assigned/ops`, {
    courseId,
    level
  });

export const saveEvaluationProjects = data =>
  PUT_HACKATHON(`/community-hackathon/submissions/assigned/ops/`, {
    project: data
  });

export const getYTMReportedProjects = data =>
  GET_HACKATHON("/community/projects/flagged", data);

export const getModerationProjects = data =>
  GET_HACKATHON("/community/moderationSubmissions", data);

export const getModerationProjectsCount = data =>
  GET_HACKATHON("/community/getCount/moderation", data);

export const getEachModeratorProjects = data =>
  GET_HACKATHON("/community/getposts/moderator", data);

export const getModeratorList = data =>
  GET_HACKATHON("/community/moderators", data);

export const deleteModeratorPost = data =>
  GET_HACKATHON("/community/delete/moderator", data);

export const getAcceptedSubmissions = data =>
  POST_HACKATHON("/community/acceptSubmission", data);

export const getRejectedSubmissions = data =>
  POST_HACKATHON("/community/rejectSubmission", data);

export const getArchivedProjects = data =>
  GET_HACKATHON("/community/projects/flagged/archived", data);

export const updateProjectFlag = data =>
  PUT_HACKATHON("/community/studentProject/moderation", data);

export const getFlaggedItemsCount = () =>
  GET_HACKATHON("/community/projectsAndComments/flagged/count");

export const getYTMReportedComments = data =>
  GET_HACKATHON("/community/comments/flagged", data);

export const getArchivedComments = data =>
  GET_HACKATHON("/community/comments/flagged/archived", data);

export const updateCommentFlag = data =>
  PUT_HACKATHON("/community/comment/moderation", data);

export const getCommunityBannerList = data =>
  GET_HACKATHON("/community/banners", data);

export const updateCommunityBanners = data =>
  PUT_HACKATHON("/community/banners", data);

export const getSearchedProjects = data =>
  GET_HACKATHON("/community/projects/search", data);

export const getCommunityPosts = data => {
  const { searchValue, limit, currentPage, isTop, courseType } = data;
  const payload = {
    filterObject: {
      communityProjectSubmissionTime: {
        startTime: searchValue.startTime
          ? moment.utc(searchValue.startTime)
          : "",
        endTime: searchValue.endTime ? moment.utc(searchValue.endTime) : ""
      },
      grade: searchValue.grade,
      isTop,
      courseType
    },
    pageSize: limit,
    pageNo: currentPage
  };
  return GET_HACKATHON("community/communityProjects", payload);
};

export const curateCommunityTopPosts = data => {
  if (data.select) {
    return POST_HACKATHON("community/top-posts/select", data.payload);
  } else {
    return POST_HACKATHON("community/top-posts/unselect", data.payload);
  }
};

export const getCommunityPostsSelectionMode = () => {
  const data = {
    configName: "TOP_POSTS_SELECTION_CONFIG"
  };
  return GET_HACKATHON("community/getConfig", data);
};

export const updateCommunityPostsSelectionMode = data => {
  const payload = {
    configName: "TOP_POSTS_SELECTION_CONFIG",
    config: {
      selection: data
    }
  };
  return POST_HACKATHON("community/updateConfig", payload);
};

const hackathonApiMap = {
  HACKATHON_CONTEST_EVENT_LIST: hackathon.contestEvent.getAll,
  HACKATHON_CONTEST_EVENT_ADD: hackathon.contestEvent.create,
  HACKATHON_CONTEST_EVENT_UPDATE: hackathon.contestEvent.update,
  HACKATHON_SHIFT_EVENT_UPDATE: hackathon.contestEvent.shiftEventDate,
  HACKATHON_ROOT_CONTEST_LIST: hackathon.rootContest.getAll,
  HACKATHON_ROOT_CONTEST_ADD: hackathon.rootContest.create,
  HACKATHON_ROOT_CONTEST_UPDATE: hackathon.rootContest.update,
  HACKATHON_DAILY_CONTEST_LIST: hackathon.dailyContest.getAll,
  HACKATHON_DAILY_CONTEST_ADD: hackathon.dailyContest.create,
  HACKATHON_DAILY_CONTEST_UPDATE: hackathon.dailyContest.update,
  HACKATHON_CHALLENGE_LIST: hackathon.challenges.getAll,
  HACKATHON_CHALLENGE_UPDATE: hackathon.challenges.update,
  HACKATHON_EVALUATION_LIST: getEvaluationProjects,
  HACKATHON_EVALUATION_SAVE_UPDATE: saveEvaluationProjects,
  HACKATHON_RC_PROJECT_YTM_LIST: getYTMReportedProjects,
  HACKATHON_MODERATION_PROJECT_LIST: getModerationProjects,
  HACKATHON_MODERATOR_POST_DELETE: deleteModeratorPost,
  HACKATHON_EACH_MODERATOR_PROJECT_LIST: getEachModeratorProjects,
  HACKATHON_ACCEPTED_SUBMISSIONS_UPDATE: getAcceptedSubmissions,
  HACKATHON_REJECTED_SUBMISSIONS_UPDATE: getRejectedSubmissions,
  HACKATHON_MODERATOR_LIST: getModeratorList,
  HACKATHON_RC_PROJECT_ARCHIVE_LIST: getArchivedProjects,
  HACKATHON_RC_PROJECT_SEARCH_LIST: getSearchedProjects,
  HACKATHON_RC_PROJECT_FLAG_UPDATE: updateProjectFlag,
  HACKATHON_RC_COMMENT_YTM_LIST: getYTMReportedComments,
  HACKATHON_RC_COMMENT_ARCHIVE_LIST: getArchivedComments,
  HACKATHON_RC_COMMENT_FLAG_UPDATE: updateCommentFlag,
  HACKATHON_REPORTED_CONTENT_COUNT_LIST: getFlaggedItemsCount,
  HACKATHON_MODERATION_PROJECT_COUNT_LIST: getModerationProjectsCount,
  COMMUNITY_HOMEPAGE_BANNER_LIST: getCommunityBannerList,
  COMMUNITY_HOMEPAGE_BANNER_UPDATE: updateCommunityBanners,
  COMMUNITY_POSTS_CURATOR_LIST: getCommunityPosts,
  COMMUNITY_POST_CURATE_UPDATE: curateCommunityTopPosts,
  COMMUNITY_POSTS_SELECTION_MODE_LIST: getCommunityPostsSelectionMode,
  COMMUNITY_POSTS_SELECTION_MODE_UPDATE: updateCommunityPostsSelectionMode,
  CHALLENGE_EVENT_LIST: weeklyChallenge.event.getAll,
  CHALLENGE_EVENT_ADD: weeklyChallenge.event.create,
  CHALLENGE_EVENT_UPDATE: weeklyChallenge.event.update,
  WEEKLY_CHALLENGE_CONTEST_LIST: weeklyChallenge.contest.getAll,
  WEEKLY_CHALLENGE_CONTEST_ADD: weeklyChallenge.contest.create,
  WEEKLY_CHALLENGE_CONTEST_UPDATE: weeklyChallenge.contest.update,
  WEEKLY_CHALLENGE_QUESTION_TAGGED_LIST: weeklyChallenge.question.getTagged,
  WEEKLY_CHALLENGE_QUESTION_UNTAGGED_LIST: weeklyChallenge.question.getUntagged,
  // WEEKLY_CHALLENGE_QUESTION_ADD: weeklyChallenge.question.create,
  // WEEKLY_CHALLENGE_QUESTION_UPDATE: weeklyChallenge.question.update,
  WEEKLY_CHALLENGE_ASSIGN_ADD: weeklyChallenge.question.assign,
  TAG_EVENT_LIST: communityTags.getAll,
  TAG_EVENT_ADD: communityTags.create,
  TAG_EVENT_UPDATE: communityTags.update,
  TAG_EVENT_DELETE: communityTags.delete
};

// Daily Challenge

export const DCGetAll = data =>
  GET_HACKATHON(`/community-hackathon/challenge`, data);
export const DCCreate = data =>
  POST_HACKATHON(`/community-hackathon/challenge`, data);
export const DCUpdate = data =>
  PUT_HACKATHON(`/community-hackathon/challenge`, data);

const dcApiMap = {
  DAILY_CHALLENGE_LIST: DCGetAll,
  DAILY_CHALLENGE_ADD: DCCreate,
  DAILY_CHALLENGE_UPDATE: DCUpdate
};

export const addAuthToken = () => {
  api().defaults.headers.common["Authorization"] = isAuthenticated()
    ? "Bearer " + GET_AUTH()
    : "";
  api().defaults.headers["Authorization"] = isAuthenticated()
    ? "Bearer " + GET_AUTH()
    : "";
};

export const sendOTP = data => {
  POST(`users/sendVerificationCode/`, data);
};

export const getOTP = ({ emailOrMobile, dialCode, captchaToken = "" }) => {
  const obj = {
    emailOrMobile: `${emailOrMobile}`,
    dialCode: dialCode
  };
  Object.assign(obj, captchaToken !== "" ? { token: captchaToken } : "");
  return POST(`/users/sendOpsVerificationCode`, obj);
};

export const resendOTP = ({
  emailOrMobile,
  dialCode,
  challenge,
  captchaToken = ""
}) => {
  const obj = {
    emailOrMobile: `${emailOrMobile}`,
    dialCode: dialCode,
    challenge: challenge
  };
  Object.assign(obj, captchaToken !== "" ? { token: captchaToken } : "");
  return POST(`/users/resendVerificationCode`, obj);
};

export const verifyOTP = ({ emailOrMobile, token, challenge }) =>
  POST(`/users/authenticateVerificationCode`, {
    emailOrMobile,
    token,
    challenge
  });

export const getTrialOTP = ({ userId }) => GET(`/users/getTrialOTP/${userId}`);

const awsapi = function(
  timeout = 20000,
  baseURL = config.apiUrl,
  customHeaders = {}
) {
  return axios.create({
    baseURL: baseURL,
    timeout: timeout,
    headers: {
      common: {},
      ...customHeaders
    },
    params: { langCode: null }
  });
};
const AWS_PUT = async (url, data, customHeaders = {}) => {
  const response = await awsapi(null, null, customHeaders).put(url, data);
  return response;
};

const fileUpload = formData =>
  POST(`/util/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

const notificationConfigUpload = formData =>
  POST(`/notification-configs/importNotification`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

const refreshNotificationCache = id =>
  GET(`/notification_master/refreshCache/${id}`);

const refreshAllV3NotificationCache = email =>
  GET(`/notification_master/refreshAllNotificationCache/${email}`);

const refreshNotificationV3List = () =>
  GET(`/notification_master/refreshNotificationList`);

const payslipUpload = formData =>
  POST(`/teachers/teacherPaySlip`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
const s3upload = formData =>
  POST(`/util/uploadUsingOps`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

export const getSignedUrlForOps = data =>
  POST(`/util/getSignedUrlForOps`, data);

export const getDocumentUrl = data =>
  AWS_PUT(data.url, data.file, { "Content-Type": `${data.contentType}` });

export const getCDN = fileName =>
  POST(`util/getSignedDocumentUrl`, { fileName });

const bulkUsersFileUpload = formData =>
  POST(`/users/bulkCreate`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
const vendorUpload = formData =>
  POST(`/shipping/shippingDetailBulkUpload`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
const bulkUnSubscribeUpload = formData =>
  POST(`/communication/upload/unsubscribe`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

const eventCommandUpload = formData =>
  POST(`/communication/upload/event_command`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
const cronConfigUpload = formData =>
  POST(`/communication/upload/cron_config`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
const configSchemaUpload = formData =>
  POST(`/communication/upload/config_chema`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

//AB tests

export const getAllABTest = () => GET(`abTest/config`);
export const getABTestById = id => GET(`abTest/config/${id}`);
export const postNewABTest = data => POST(`abTest/config`, data);
export const putUpdateTrafficPercent = data =>
  PUT(`abTest/updateTrafficPercentage/${data.id}`, data.data);
export const putAddCountryVariant = data =>
  PUT(`abTest/addVariants/${data.id}`, data.data);

// api() services

export const loggedInUser = () => GET(`userDetail/meOps/`);

export const loginWithGoogle = data =>
  GET(`users/authenticateGoogle?access_token=${data.token}`);
export const loginWithOneLogin = data =>
  GET(`users/authenticateOneLogin?access_token=${data.token}`);

export const disposeSlashRTC = data => POST(`call/slashRtc/dispose`, data);
export const disposeSykes = data => POST(`call/sykes/dispose`, data);
// export const getCoursesAndClasses = data =>
//   GET(`userDetail/authenticatePassword/`, data);

export const fetchCreditLedger = arg => {
  return GET(`/students/${arg.studentId}/getCreditLedger`, arg.payload);
};
export const getRegions = () => GET(`regions`);
export const clickToDisposeConcentrix = url => CUSTOM_GET(url);
export const getCallHistory = data => GET(`task/getTaskByEntityId`, data);
export const addRegions = ({ regionName: name, currency }) =>
  POST(`regions`, { name, currency });
export const editRegions = ({ name, currency, id }) =>
  PUT(`regions/${id}`, { name, currency });
export const deleteRegions = ({ id }) => DELETE(`regions/${id}`);
// Zendesk Chat
export const addIssueCategory = data =>
  PUT(`zendesk/chat-admin/issue/category`, data);
export const addIssueSubCategory = data =>
  PUT(`zendesk/chat-admin/issue/sub-category`, data);
export const addIssueDepartmentMapping = data =>
  PUT(`zendesk/chat-admin/issue-mapping`, data);
export const addZendeskDepartment = data =>
  PUT(`zendesk/chat-admin/support-dept`, data);
export const getIssueCategory = () => GET(`zendesk/chat-admin/issue/category`);
export const getIssueSubCategory = () =>
  GET(`zendesk/chat-admin/issue/sub-category`);
export const getAllDepartments = () => GET(`zendesk/chat-admin/support-dept`);
export const getIssueDepartmentMapping = userType =>
  GET(`zendesk/chat-admin/issue-mapping?user.user_type=${userType}`);
export const addModule = data => PUT(`zendesk/chat-admin/module`, data);
export const getModule = () => GET(`zendesk/chat-admin/module`);
export const syncDepartments = () => GET(`zendesk/chat-admin/department-sync`);
export const getTags = () => GET(`zendesk/chat-admin/tag`);
export const addTags = data => PUT(`zendesk/chat-admin/tag`, data);
// Zendesk Chat Alert
export const getAllChatAlerts = () => GET(`zendesk/chat-admin/alert`);
export const addChatAlert = data => POST(`zendesk/chat-admin/alert`, data);
export const toggleChatAlert = data =>
  PUT(`zendesk/chat-admin/alert/${data.id}/toggle`, data.data);
export const updateChatAlert = data =>
  PUT(`zendesk/chat-admin/alert/${data.id}`, data.data);
export const deleteChatAlert = id => DELETE(`zendesk/chat-admin/alert/${id}`);
export const getAllChatLogs = data =>
  GET(
    `chatbot-apig/teacherInteractionLogs?${
      data.teacherId ? `teacherId=${data.teacherId}` : ""
    }${data.teacherEmail ? `teacherEmail=${data.teacherEmail}` : ""}${
      data.teacherNumber ? `teacherNumber=${data.teacherNumber}` : ""
    }${data.to ? `&to=${data.to}` : ""}${data.from ? `&from=${data.from}` : ""}`
  );
export const getChatDetailLogs = id => GET(`chatbot-apig/interactionLog/${id}`);

//save event
export const saveEventData = data => POST(`events/saveEvent`, data);

export const zendeskEmailList = data => {
  return GET(
    "zendesk/help_section/getRecipientAddresses"
    // {
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Credential": "true"
    //   },
    //   auth: {
    //     username: "sunil.wankhede@whitehatjr.com/token",
    //     password: data.AuthToekn
    //   }
    // }
  );
};

// Country api calls
export const getCountries = () => GET(`regions/countries`);
export const addCountries = data => POST(`regions/countries`, data);
export const editCountries = ({
  name,
  code,
  id,
  language,
  regionId,
  timezone
}) =>
  PUT(`regions/countries/${id}`, { name, code, regionId, language, timezone });
export const deleteCountries = ({ id }) => DELETE(`regions/countries/${id}`);

export const getCourses = () => GET(`courses/getAll`);
export const getEligiableCourses = ({ studentId }) =>
  GET(`students/${studentId}/getEligibleCourses`);
export const addCourses = data => POST(`courses/create`, data);
export const editCourses = data => POST(`courses/edit`, data);
export const deleteCourses = ({ id }) => DELETE(`courses/${id}`);
export const getCourseItem = () => GET(`courses/getCourseItemList`);

export const createdTaskForCrm = data =>
  POST(`call/getOrCreateTaskForCallCentre`, data);

export const addCourseItem = ({
  courseId,
  classType,
  maxStudent,
  classDuration
}) =>
  POST(`courses/createCourseItem`, {
    courseId,
    classType,
    maxStudent,
    classDuration
  });

export const updateCourseItem = ({
  courseId,
  classType,
  maxStudent,
  id,
  classDuration,
  recordStatus
}) =>
  POST(`courses/editCourseItem`, {
    courseId,
    classType,
    maxStudent,
    id,
    recordStatus,
    classDuration
  });

export const addReferralWinner = ({ userId, winnerPicUrl, winnerDeclaredAt }) =>
  PUT(`/referral/${userId}`, { winnerDeclaredAt, winnerPicUrl });
export const getReferralWinner = ({ userId }) => GET(`/referral/${userId}`);
export const getCoursePrice = params => GET(`packages/V2/`, params);
export const getCoursePriceOld = params => GET(`packages/`, params);

export const getPostNotification = params =>
  POST("notifications/notification/getAll", params);
export const createNewNotification = params =>
  POST("notifications/submit", params);
export const deleteNotification = id =>
  PUT("notifications/updateUserNotificationDetail/" + id, { recordStatus: 0 });
export const getNotificationTargets = () =>
  GET("notifications/target_groups/getAll");

export const getAcknowledgeCount = id => GET("notifications/counts/" + id);
export const addCoursePrice = ({
  courseItemId,
  name,
  packageDescription,
  regionId,
  mrp,
  sellingPrice,
  perClassPrice,
  credits,
  currency,
  type,
  subscriptionMode,
  subscriptionTenure,
  totalCredits,
  minClassPrice,
  minCredits,
  roofCredits,
  rooftopRpc,
  addOnEnabled,
  isRestrictedPackage,
  addOnProductIds,
  isTeacherReferralPackage,
  packageAdditionalInfo,
  orderAttributes,
  packageScope,
  displayName,
  learningJourneyId
}) =>
  POST(`packages`, {
    courseItemId,
    name,
    packageDescription,
    regionId: regionId,
    mrp,
    sellingPrice,
    perClassPrice,
    credits,
    currency,
    type,
    minClassPrice,
    minCredits,
    roofCredits,
    rooftopRpc,
    subscriptionMode: type === "SUBSCRIPTION" ? subscriptionMode : null,
    subscriptionTenure: type === "SUBSCRIPTION" ? subscriptionTenure : null,
    totalCredits: type === "SUBSCRIPTION" ? totalCredits : null,
    addOnEnabled,
    addOnProductIds,
    isRestrictedPackage,
    isTeacherReferralPackage,
    packageAdditionalInfo,
    orderAttributes,
    packageScope,
    displayName,
    learningJourneyId
  });
export const updateCoursePrice = ({
  courseItemId,
  name,
  packageDescription,
  regionId,
  mrp,
  sellingPrice,
  perClassPrice,
  credits,
  currency,
  id,
  type,
  subscriptionMode,
  subscriptionTenure,
  totalCredits,
  minClassPrice,
  minCredits,
  roofCredits,
  rooftopRpc,
  addOnEnabled,
  addOnProductIds,
  isRestrictedPackage,
  isTeacherReferralPackage,
  packageAdditionalInfo,
  orderAttributes,
  packageScope,
  displayName,
  learningJourneyId
}) =>
  PUT(`packages/${id}`, {
    courseItemId,
    name,
    packageDescription,
    regionId: regionId,
    mrp,
    sellingPrice,
    perClassPrice,
    credits,
    currency,
    id,
    type,
    minClassPrice,
    minCredits,
    roofCredits,
    rooftopRpc,
    subscriptionMode: type === "SUBSCRIPTION" ? subscriptionMode : null,
    subscriptionTenure: type === "SUBSCRIPTION" ? subscriptionTenure : null,
    totalCredits: type === "SUBSCRIPTION" ? totalCredits : null,
    addOnEnabled,
    addOnProductIds,
    isRestrictedPackage,
    isTeacherReferralPackage,
    packageAdditionalInfo,
    orderAttributes,
    packageScope,
    displayName,
    learningJourneyId
  });

export const deleteCoursePrice = ({ id, recordStatus }) =>
  PUT(`packages/${id}`, {
    recordStatus: 0
  });

export const getReferralData = ({ offset = 0, limit = 10 }) =>
  GET(`studentsReferral/getAllReferredUsers`, { offset, limit });

export const getClasses = ({ courseId, courseItemId, moduleId }) =>
  GET(`courses/getClassList`, { courseId, courseItemId, moduleId });

export const getSqlData = data => POST(`admin/sql/execute`, data);

export const findUnsubscribeDetails = data =>
  POST(`communication/getsubscriptionStatus`, data);
export const findDuplicateStudents = data =>
  POST(`students/findDuplicateStudents`, data);
export const unsubscribeNotification = data =>
  POST(`communication/subscriptionStatus/contacts`, data);

export const addClass = data => {
  return POST(`courses/createClass`, data);
};

export const updateClass = data => POST(`courses/editClass`, data);
export const changeClass = data =>
  POST(`/bookings/students/${data.studentId}/changeClass`, data);
export const deleteClass = ({ id }) => DELETE(`courses/classes/${id}`);
export const uploadClassesPdf = ({ docLink }) =>
  POST(`courses/upload`, { docLink });

export const getHourlyRecurringFreeSlots = ({
  teacherId,
  startTime,
  endTime,
  timezone,
  studentTimezone
}) =>
  GET(`slots/teachers/${teacherId}/getHourlyRecurringFreeSlots`, {
    startTime,
    endTime,
    timezone,
    studentTimezone
  });
export const getTeacherMatricCorrection = ({
  entityType,
  fromDate,
  toDate,
  courseType,
  status,
  corrected,
  studentEmail,
  teacherId
}) => {
  return POST(`/teacher_metric_modification?teacherId`, {
    entityType,
    fromDate,
    toDate,
    courseType,
    status,
    corrected,
    studentEmail,
    teacherId
  });
};

export const getTeacherMatricBookingCorrection = ({
  entityType,
  fromDate,
  toDate,
  courseType,
  status,
  corrected,
  studentEmail,
  teacherId
}) => {
  return POST(`/teacher_metric_modification?teacherId`, {
    entityType,
    fromDate,
    toDate,
    courseType,
    status,
    corrected,
    studentEmail,
    teacherId
  });
};

export const updateTeacherMatricCorrection = ({
  entityType,
  entityId,
  action,
  reason,
  comments
}) => {
  return PUT(`/teacher_metric_modification`, {
    entityType,
    entityId,
    action,
    reason,
    comments
  });
};

export const getTeacherMatricCorrectionAudit = ({ entityType, entityId }) => {
  return GET(
    `/teacher_metric_modification/audit?entityType=${entityType}&entityId=${entityId}`
  );
};

export const addRecurringBookings = ({
  studentId,
  teacherId,
  courseItemId,
  bookingsCount,
  dayOfWeek,
  startMinute,
  endMinute,
  slots,
  startTime
}) => {
  return POST(`bookings/students/${studentId}/addRecurringBookings`, {
    teacherId,
    courseItemId,
    bookingsCount,
    dayOfWeek,
    startMinute,
    endMinute,
    slots,
    startTime
  });
};

export const getAutoLoginLink = params => GET(`admin/autoLoginToken`, params);
export const getHmsToken = ({ roomName, role }) =>
  GET(`/util/getHMSToken`, { roomName, role });

export const getTwilioToken = () => GET(`/util/getTwilioToken`);

export const getTwilioChatToken = ({ sessionId }) =>
  GET(`/util/getTwilioChatToken?sessionId=${sessionId}`);

export const getTeachers = () => GET(`teachers/getAll`);
export const addTeachers = (
  name,
  address,
  countryCode,
  email,
  password,
  state,
  phone1,
  phone2,
  city,
  zipcode,
  timezone
) =>
  POST(`teachers/create`, {
    name,
    address,
    countryCode,
    email,
    password,
    state,
    phone1,
    phone2,
    city,
    zipcode,
    timezone
  });

export const addTeachersAdditionals = ({
  teacherId,
  statusNote,
  educationalDegree,
  bankName,
  panCard,
  accountNumber,
  ifscCode,
  bankBranch,
  bankAddress,
  panCardUrl,
  aadharCardUrl,
  specialization,
  others,
  teacherRecruitmentLead,
  recruitmentRemarks,
  dateOfOnboarding,
  teacherOperationLead,
  performanceNotes
}) =>
  POST(`teachers/${teacherId}/additionals`, {
    statusNote,
    educationalDegree,
    bankName,
    panCard,
    accountNumber,
    ifscCode,
    bankBranch,
    bankAddress,
    panCardUrl,
    aadharCardUrl,
    specialization,
    others,
    teacherRecruitmentLead,
    recruitmentRemarks,
    dateOfOnboarding,
    teacherOperationLead,
    performanceNotes
  });

export const editTeachers = (
  name,
  address,
  countryCode,
  email,
  password,
  state,
  phone1,
  phone2,
  city,
  zipcode,
  timezone,
  teacherId
) =>
  PUT(`teachers/update`, {
    name,
    address,
    countryCode,
    email,
    password,
    state,
    phone1,
    phone2,
    city,
    zipcode,
    timezone,
    teacherId
  });

export const editTeachersAdditionals = ({
  teacherId,
  statusNote,
  educationalDegree,
  bankName,
  panCard,
  accountNumber,
  ifscCode,
  bankBranch,
  bankAddress,
  panCardUrl,
  aadharCardUrl,
  specialization,
  others,
  teacherRecruitmentLead,
  recruitmentRemarks,
  dateOfOnboarding,
  teacherOperationLead,
  performanceNotes
}) =>
  PUT(`teachers/${teacherId}/additionals`, {
    statusNote,
    educationalDegree,
    bankName,
    panCard,
    accountNumber,
    ifscCode,
    bankBranch,
    bankAddress,
    panCardUrl,
    aadharCardUrl,
    specialization,
    others,
    teacherRecruitmentLead,
    recruitmentRemarks,
    dateOfOnboarding,
    teacherOperationLead,
    performanceNotes
  });

export const deleteTeachers = ({ recordStatus, teacherId }) =>
  PUT(`teachers/update`, { recordStatus, teacherId });

export const getActivities = ({
  courseId,
  courseItemId,
  courseClassId,
  activityType
}) =>
  GET(`courses/getActivityListForClass`, {
    courseId,
    courseClassId,
    courseItemId,
    activityType
  });
export const getAllActivities = () => GET(`courses/getActivitylist`);

export const addActivities = ({
  name,
  description,
  courseClassId,
  skillType,
  activityType,
  sequenceNo,
  recordStatus,
  selectClass,
  activityLink,
  problemStatementLink,
  problemSolutionLink,
  activityNameType
}) =>
  POST(`courses/createActivity`, {
    name,
    description,
    courseClassId,
    skillType,
    activityType,
    sequenceNo,
    recordStatus,
    selectClass,
    activityLink,
    problemStatementLink,
    problemSolutionLink,
    activityNameType
  });

export const clearCache = ({ cacheName, entityName }) =>
  POST("/caching/clear", {
    cacheName,
    entityName
  });
export const uploadImageTinyEditor = formData =>
  POST("/util/uploadWysiwygImage", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
export const rebuildNextUI = (props = {}) => {
  POST_EXT(
    "https://api.vercel.com/v1/integrations/deploy/QmeiVPBXR8uon9sdRfnswxs8cUdN8H7xtvgUw4aSZ34Fcw/" +
      config.rebuildNextEnv,
    props
  );
};
export const editActivities = ({
  id,
  name,
  description,
  courseClassId,
  skillType,
  activityType,
  sequenceNo,
  recordStatus,
  selectClass,
  activityLink,
  problemStatementLink,
  problemSolutionLink
}) =>
  PUT(`courses/editActivity`, {
    id,
    name,
    description,
    courseClassId,
    skillType,
    activityType,
    sequenceNo,
    recordStatus,
    selectClass,
    activityLink,
    problemStatementLink,
    problemSolutionLink
  });
export const deleteActivities = ({ recordStatus, id }) =>
  PUT(`courses/editActivity`, { recordStatus, id });

// Projects

export const getProjects = params => GET(`projects`, params);
export const addProjects = values => POST(`projects`, values);
export const editProjects = values =>
  POST(`projects/${values.id}/update`, values);
export const deleteProjects = ({ id, status }) =>
  POST(`projects/${id}/update`, {
    status: status
  });

export const addAdditionalTask = data =>
  POST(`projects/createAdditionalTask`, data);

export const getAdditionalTask = taskId => GET(`projects/info/${taskId}`);

export const getSubstituteTeacherList = ({ studentId }) =>
  GET(`/students/${studentId}/getSubstituteTeacherFromAdmin`);
export const searchStudents = data => POST(`/admin/searchStudents`, data);
export const searchStudentsSales = data =>
  POST(`/admin/searchStudentsForSales`, data);
export const updateConversionDetail = data =>
  POST(`/admin/updateConversionDetail`, data);
export const getStudentById = ({ studentId }) =>
  GET(`/admin/getStudent/${studentId}`);
export const searchTeachers = data => POST(`/admin/searchTeachers`, data);
export const getTeacherById = ({ teacherId, studentType }) =>
  GET(
    `/admin/getTeacher/${teacherId}?studentType=${
      studentType ? studentType : "All"
    }`
  );

export const getTeacherByAffiliate = ({ teacherId }) =>
  GET(`/b2b/getTeacherAffiliates/${teacherId}`);

// Decision Tree API Nodes
export const searchDecisionTreeNodes = ({ treeNodeId }) =>
  GET(`/help_section/getDecisionTreeAssociatedNodes?treeNodeId=${treeNodeId}`);

export const getFaqById = ({ faqId }) =>
  GET(`/help_section/getFaq?faqId=${faqId}`);
export const addSubNodes = data =>
  POST(`help_section/createDecisionTreeNode`, data);

export const orderSubNodes = ({ nodeId, order }) =>
  POST(`help_section/updateNodeOrder?nodeId=${nodeId}&order=${order}`, {});

export const editSubNodes = data =>
  POST(`help_section/updateDecisionTreeNode?nodeId=${data.id}`, data);
export const deleteSubNodes = ({ treeNodeId }) =>
  DELETE(`/help_section/removeDecisionTreeNode?treeNodeId=${treeNodeId}`);

export const getLinkedFAQs = ({ nodeId }) =>
  GET(`/help_section/getRelatedFaqs?nodeId=${nodeId}`);
export const updateLinkedFaqs = data =>
  POST(`help_section/updateRelatedFaqs`, data);

export const searchFAQTreeNodes = data => {
  return POST(
    `/help_section/getFilteredFaqs?userType=${
      data.userType ? data.userType : null
    }&nodeName=${data.nodeName ? data.nodeName : ""}&region=${
      data.region ? data.region : null
    }&pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`,
    {
      courseTypes: data.courseTypes,
      faqIds: data.faqIds
    }
  );
};

export const deleteFAQNode = id => DELETE(`help_section/removeFaq?faqId=${id}`);

export const createUpdateFAQ = data =>
  POST("/help_section/createUpdateFaq", data);

// Teacher Comms Templates Data
export const getTeacherCommsTemplates = ({ region, courseTypes }) =>
  GET(
    `/teacherComms/getTemplates?region=${region ? region : null}&courseTypes=${
      courseTypes ? courseTypes : []
    }`
  );
export const addTCTemplates = data => POST(`teacherComms/addTemplate`, data);
export const editTCTemplates = data =>
  PUT(`teacherComms/updateTemplate/${data.templateId}`, data);
export const deleteTCTemplates = ({ templateId }) =>
  DELETE(`/teacherComms/deleteTemplate/${templateId}`);

// Teacher Strikes Data
export const getTeacherStrikes = data =>
  POST(
    `/teacher_strike/getStrikes?teacherId=${data.teacherId}&pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`,
    data
  );
export const getTeacherStrikesAuditData = strikeId =>
  GET(`/audit/teacherStrike/${strikeId}`);
export const getTeacherQualities = teacherId =>
  GET(`/micro/metrics/teacherAudit/teacherQualities/${teacherId}`);
export const addTeacherStrike = data => POST(`teacher_strike`, data);
export const editTeacherStrike = data =>
  PUT(`teacher_strike?strikeId=${data.strikeId}`, data);

export const getFreeWeeklySlots = ({ teacherId, timezone }) =>
  GET(`/slots/teachers/${teacherId}/getFreeWeeklySlots?adminFilter=true`, {
    timezone
  });
export const getWeeklySlots = ({ studentId, timezone }) =>
  GET(`/bookings/students/${studentId}/getWeeklySlots`, { timezone });
export const saveWeeklySlots = ({
  studentId,
  timezone,
  teacherId,
  courseItemId,
  bookings
}) =>
  POST(
    `bookings/students/${studentId}/saveWeeklySlots`,
    { studentId, teacherId, courseItemId, bookings },
    { params: { timezone } }
  );

export const studentPasswordChange = ({ id, newPassword }) =>
  POST(`userDetail/me/changePasswordAdmin`, { id, newPassword });

export const studentInvoiceGenerate = ({ studentId }) =>
  GET(`orderDetails/${studentId}/invoiceOfOrder`);

export const orderInvoiceGenerate = ({ studentId, orderId }) =>
  POST(`orderDetails/${studentId}/regenInvoice/${orderId}`);

export const studentGetAllInvoice = ({ studentId }) =>
  GET(`orderDetails/students/${studentId}/ordersForStudent`);

export const studentCancelInvoice = (parentOrderId = "") =>
  DELETE(`cleartax/${parentOrderId}`);

export const studentGetLaptop = ({ studentId }) =>
  GET(`student_laptop_order/all/?studentId=${studentId}`);

export const getAllVendors = () => {
  return GET(`/inventory/vendor`);
};

export const getAllPendingShippingOrders = () => {
  return GET(`/inventory/orders/getPendingShippingOrders`);
};

export const getAllInventoryOrders = () => {
  return GET(`/inventory/orders`);
};

export const addInventoryOrder = data => POST(`/inventory/orders`, data);

export const updateInventoryOrder = ({ id, data }) => {
  return PUT(`inventory/orders/${id}`, data);
};

export const getAllOrderLineItems = () => {
  return GET(`/inventory/orderItem`);
};

export const addOrderLineItem = data => POST(`/inventory/orderItem`, data);

export const getDeliveryStatus = () => {
  return GET(`/inventory/deliveryStatus`);
};

export const getAddressMaster = () => {
  return GET(`/inventory/address`);
};

export const addAddressMaster = data => POST(`/inventory/address`, data);

export const getInventoryFlow = () => {
  return GET(`/inventory/inventoryFlow`);
};

export const getAllProductItems = () => {
  return GET(`/inventory/productItem`);
};

export const addProductItem = data => POST(`/inventory/productItem`, data);

export const updateProductItem = ({ id, data }) => {
  return PUT(`/inventory/productItem/${id}`, data);
};

export const addAddressMasterToPendingOrder = ({ id, data }) => {
  return POST(`/inventory/orders/addDeliveryAddress/${id}`, data);
};

export const getAllProductSkus = () => {
  return GET(`/inventory/productSKU`);
};

export const addProductSku = data => POST(`/inventory/productSKU`, data);

export const updateProductSku = ({ id, data }) => {
  return PUT(`/inventory/productSKU/${id}`, data);
};

export const addDeliveryStatus = data =>
  POST(`/inventory/deliveryStatus`, data);

export const addVendor = data => POST(`/inventory/vendor`, data);

export const addVendorStatus = data => POST(`/inventory/vendorStatus`, data);

export const getAllVendorStatus = () => {
  return GET(`/inventory/vendorStatus`);
};

export const addInventoryFlow = data => POST(`/inventory/inventoryFlow`, data);

export const cancelStudentSlots = ({
  teacherId,
  studentId,
  bookingId,
  courseItemId,
  newStatus,
  ncReasonCode,
  remark,
  ncReasonDesc,
  noCreditDeduction,
  slots
}) =>
  POST(`/bookings/students/${studentId}/cancelSlots`, {
    studentId,
    bookingId,
    courseItemId,
    newStatus,
    ncReasonCode,
    remark,
    ncReasonDesc,
    noCreditDeduction,
    slots
  });

export const getFreeSlots = data =>
  GET(`/bookings/students/${data.studentId}/teacherFreeSlots`, data);
export const getFreeB2BSlots = data =>
  GET(`/b2b/students/${data.studentId}/teacherFreeSlots`, data);
export const addStudentClassBooking = ({
  teacherId,
  courseItemId,
  studentId,
  slots,
  timezone
}) =>
  POST(
    `/bookings/students/${studentId}/addSlots`,
    {
      teacherId,
      courseItemId,
      slots
    },
    { params: { timezone } }
  );

export const updateStudentLevel = ({
  studentId,
  courseVersionId,
  prevCourseItemId,
  newCourseItemId,
  startClassNumber
}) =>
  POST(`/students/${studentId}/changeCourse`, {
    studentId,
    courseVersionId,
    prevCourseItemId,
    newCourseItemId,
    startClassNumber
  });
export const updateStudentCourseLevel = ({
  studentId,
  courseVersionId,
  prevCourseItemId,
  newCourseItemId,
  startClassNumber,
  isAdmin = true,
  ncReasonCode,
  ncReasonDesc
}) =>
  POST(`/students/${studentId}/changeCourse`, {
    studentId,
    courseVersionId,
    prevCourseItemId,
    newCourseItemId,
    startClassNumber,
    isAdmin,
    ncReasonCode,
    ncReasonDesc
  });
export const updateStudentHat = ({
  studentId,
  bookingId,
  sessionId,
  hatsOffType
}) =>
  POST(`/classSession/students/${studentId}/addHatsOff`, {
    studentId,
    bookingId,
    sessionId,
    hatsOffType
  });
export const getAllPayslipOfTeacher = ({ teacherId }) =>
  GET(`/teachers/${teacherId}/teacherPaySlip`);
export const updateStudentCourse = course => PUT(`admin/studentCourse`, course);
export const assignVoucherToStudent = ({ studentId, courseItemId }) =>
  POST(`offer/${studentId}/assign`, { courseItemId });
export const updateUserProfile = function({ userId, data }) {
  return PUT(`/admin/updateUserProfile/${userId}`, data);
};
export const updateStudentProfileAddress = function({ data }) {
  return POST(`/admin/updateStudentAddress`, data);
};

export const getTeachersByLanguage = params => {
  return GET(`teachers/getTeacherBySkills`, params);
};

export const addTeacherSlot = ({ teacherId, slots, timezone }) =>
  POST(
    `/slots/teachers/${teacherId}/addSlots`,
    {
      teacherId,
      slots
    },
    { params: { timezone } }
  );

export const saveTeacherWeeklySlots = ({ teacherId, timezone, weeklySlots }) =>
  POST(
    `/slots/teachers/${teacherId}/saveWeeklySlots`,
    { teacherId, weeklySlots },
    { params: { timezone } }
  );

export const getComms = data =>
  POST(`/communication/getAllNotificationAPI`, data);

export const cancelTeacherSlot = ({
  teacherId,
  timezone,
  slots,
  ncReasonCode,
  remark,
  ncReasonDesc
}) =>
  POST(
    `/slots/teachers/${teacherId}/cancelSlots`,
    { teacherId, slots, ncReasonCode, ncReasonDesc, remark },
    { params: { timezone } }
  );

export const addTeacherSkill = data => {
  return POST(`/teachers/skills`, data);
};

export const updateTeacherSkill = function(skill) {
  return PUT(`/teachers/skills`, skill);
};

export const updateVCProvider = function({ id, ...args }) {
  return PUT(`/teachers/${id}/updateVCProvider`, { ...args });
};

export const deleteTeacherSkill = function({ id }) {
  return DELETE(`/teachers/skills/${id}`);
};

export const closeClass = function({ teacherId, class_session }) {
  return POST(`/classSession/teachers/${teacherId}/endClass`, class_session);
};

export const getCourseByGrade = function({ grade, type = "CODING" }) {
  return GET(`courses/getCourseByGrade`, { grade, type });
};

export const getTeachersBySkill = function({
  countryCode,
  courseId,
  adminFilter,
  startTime,
  endTime,
  isTrial,
  oneTime
}) {
  return GET(`teachers/getTeacherBySkills`, {
    countryCode,
    courseId,
    adminFilter,
    startTime,
    endTime,
    isTrial,
    oneTime
  });
};

export const getSubstituteTeacherForStudent = function({
  studentId,
  courseType
}) {
  return GET(
    `/students/${studentId}/getSubstituteTeacherFromAdmin?courseType=${courseType}`
  );
};

export const getTeachersForReassignment = function({ studentId, courseType }) {
  return GET(
    `/students/${studentId}/getTeachersForReassignment?courseType=${courseType}`
  );
};
export const getNewTeachersForReassignment = function({
  studentId,
  courseType
}) {
  console.log(courseType, "M>>>>>", studentId);
  return POST(
    `/students/${studentId}/getNewTeachersForStudent?courseType=${courseType}`
  );
};

export const studentChangeTeacher = function({
  studentId,
  teacherId,
  courseItemId,
  ncReasonCode,
  ncReasonDesc,
  auditInfo
}) {
  return POST(`/students/${studentId}/changeTeacher`, {
    teacherId,
    courseItemId,
    ncReasonCode,
    ncReasonDesc,
    auditInfo
  });
};
export const studentNewChangeTeacher = data => {
  console.log("newChangeTeacher", data);
  return POST(
    `/students/${data.studentId}/newChangeTeacher?courseType=${data.courseType}`,
    data
  );
};

export const addTeacher = function(data) {
  return POST(`teachers/create`, data);
};

export const addStudent = function({ data, utmParams }) {
  return POST(`/trial/users/register`, data, { params: utmParams });
};

export const getAllAffiliateByChannel = data =>
  POST("/third_party_affiliate/getAllByParams", data);

export const addAffiliate = function(data) {
  return POST(`/third_party_affiliate/register`, data); // have to update to affiliate api
};

export const searchAffiliates = data =>
  GET(`/third_party_affiliate/getAll`, data);

export const getAffiliateById = ({ id }) =>
  GET("/third_party_affiliate/getById", { id });

export const updateAffiliateProfile = function({ affiliateId, data }) {
  return PUT(`/third_party_affiliate/update/${affiliateId}`, data);
};

export const getAffiliateStudents = function({ affiliateId }) {
  return GET(`/third_party_affiliate/${affiliateId}/students`);
};

export const associateAffiliateStudent = function({ affiliateId, studentId }) {
  return POST("/third_party_affiliate/associateStudent", {
    affiliateId,
    studentId
  });
};

export const associateAffiliateStudentDelete = function({
  affiliateId,
  studentId
}) {
  return DELETE(`/third_party_affiliate/${affiliateId}/student/${studentId}`);
};

export const addLaptop = function(data) {
  return POST(`/packages/addOnProducts`, data); // have to update to affiliate api
};

export const getLaptops = function(data) {
  return GET(`/packages/addOnProducts/getAll`, data);
};

export const getLaptopById = ({ id }) => GET(`/packages/addOnProducts/${id}`);

export const updateLaptopProfile = function({ id, data }) {
  return PUT(`/packages/addOnProducts/${id}`, data);
};

export const deleteLaptop = function({ id }) {
  return DELETE(`/packages/addOnProducts/${id}`);
};

export const createUpdateAffiliateAddress = addressObj =>
  POST("/third_party_affiliate/createOrUpdateAddress", addressObj);

export const updateAffiliatesProfileDetail = ({ values, affiliateId }) =>
  PUT(`/third_party_affiliate/${affiliateId}/profileDetail`, values);

export const getAllAffiliateSchedule = ({ affiliateId }) =>
  GET(`b2b/affiliate/${affiliateId}/schedules`);

export const createAffiliateSchedule = ({ affiliateId, data }) =>
  POST(`b2b/affiliate/${affiliateId}/schedules`, data);

export const deactivateAffiliateSchedule = ({ affiliateId }) =>
  POST(`/b2b/affiliate/${affiliateId}/schedules/deactivate`);

export const updateAffiliatesPreference = ({ values, affiliateId }) =>
  PUT(`/third_party_affiliate/${affiliateId}/preference`, values);

export const addStudentCourse = function({
  studentId,
  courseType,
  grade,
  courseSubType
}) {
  return PUT(`/students/${studentId}/checkCoursesAndRouteForward`, {
    courseType,
    grade,
    courseSubType
  });
};
export const createCertificateForStudentByAdmin = function({
  studentId,
  type,
  courseType
}) {
  return POST(
    `/studentsCertificates/createCertificateByAdmin?courseType=${courseType}`,
    {
      studentId,
      type
    }
  );
};
export const createCertificateForTeacherByAdmin = function({
  teacherId,
  type,
  courseType
}) {
  return POST(
    `/teacherCertificates/createCertificateByAdmin?courseType=${courseType}`,
    {
      teacherId,
      type
    }
  );
};
export const getAllStudentCertificate = function({ studentId }) {
  return GET(`/studentsCertificates/getAllCertificate/${studentId}`);
};
export const getAllTeacherCertificate = function({ teacherId }) {
  return GET(`/teacherCertificates/${teacherId}/getAll`);
};
export const updateMobileorEmail = function({
  studentId,
  teacherId,
  affiliateId,
  userId,
  dialCode,
  mobile,
  email
}) {
  return POST(`/users/updateMobileorEmail`, {
    studentId,
    teacherId,
    affiliateId,
    userId,
    dialCode,
    mobile,
    email
  });
};
export const getTeacherSlotCount = function({ teacherId, startTime }) {
  return GET(
    `/slots/teachers/${teacherId}/getHourlySlotsCount?startTime=${startTime}`
  );
};

export const getSlotsWithBookings = function({
  teacherId,
  startTime,
  endTime
}) {
  return GET(`/slots/teachers/${teacherId}/getSlotsWithBookings`, {
    startTime,
    endTime
  });
};
export const getSlotsWithPayment = function({ teacherId, startTime, endTime }) {
  return GET(`/slots/teachers/${teacherId}/getSlotsWithPayments`, {
    startTime,
    endTime
  });
};

export const getB2BSlotsWithPayment = function({
  teacherId,
  startTime,
  endTime
}) {
  return GET(`/b2b/teachers/${teacherId}/getSlotsWithPayments`, {
    startTime,
    endTime
  });
};
export const getSessionVcProvider = function({ sessionId }) {
  return GET(`/classSession/${sessionId}/getVCProvider`);
};
export const getTeacherVcProvider = function({ teacherId }) {
  return GET(`/teachers/getVCProvider?userId=${teacherId}&userType=TEACHER`);
};
//TODO: Update endpoint once BE ready
export const getUserVcProvider = function(data) {
  return GET(`/teachers/getVCProvider`, data);
};
export const getAllLanguages = () => GET(`/regions/languages/admin`);
export const addLanguages = ({ name }) =>
  POST(`/regions/languages/create`, { name });
export const deleteLanguages = ({ id }) => DELETE(`/regions/languages/${id}`);
export const updateLanguages = ({ id, name }) =>
  POST(`/regions/languages/edit`, { id, name });

export const getNotificationCategories = () =>
  GET(`/communication/config/notificationCategory`);

export const getAllConfigs = data => GET(`/config/getAllConfigs`, data);
export const getConfigValue = data => GET(`/config/getConfigValue`, data);
export const getConfigsOpsCached = ({ body, countryCode, brandId }) =>
  POST(`/config/getConfigsOpsCached`, body, {
    params: { countryCode: countryCode, brandId: brandId }
  });
export const submitConfig = data => {
  data.value = checkIfString(data.value)
    ? Buffer.from(data.value).toString("base64")
    : Buffer.from(JSON.stringify(data.value)).toString("base64");
  return POST(`/config/saveConfigValue`, data);
};
export const deleteConfig = ({ id }) => DELETE(`/config/${id}`);

export const submitFeatureConfig = data => POST("/feature/addFeature", data);
export const getAllFeatureConfigs = data => GET("/feature/getfeature", data);
export const updateFeatureConfig = data => {
  const idParam = data.id;
  delete data.id;
  return PUT(`/feature/updateFeature/${idParam}`, data);
};

export const deleteFeatureConfig = id => DELETE(`/feature/deleteFeature/${id}`);
export const getFeatureConfigStatus = id => GET(`/feature/${id}/checkStatus`);

export const getAllFeatureConfigUsers = ({ featureId, filterData }) =>
  GET(`/feature/${featureId}/getEntityList`, { ...filterData });

export const mapUserToFeature = data => POST("/feature/addUser", data);
export const deleteUserToFeature = data => PUT("/feature/removeUser", data);

export const getPackageScopes = () =>
  getAllConfigs({ name: "package_scope", schema: "default" });
export const getConfigs = configNameList =>
  POST(`/config/getConfigsOps`, { configNameList });
export const getFeedbackTriggersEntityTypeConfig = () =>
  GET(`/config/getAllConfigs`, { name: "FEEDBACK_TRIGGER_TYPES" });
export const getAllFeedbackQuestionTypes = () =>
  GET(`/config/getAllConfigs`, { name: "FEEDBACK_QUESTION_TYPES" });
export const getPostSubmissionConfigTypes = () =>
  GET(`/config/getAllConfigs`, { name: "COMMUNITY_POSTS_PERMISSION" });
export const getDispositionTypes = () =>
  GET(`/config/getAllConfigs`, { name: "FINANCIAL_ADJUSTMENTS_DISPOSITIONS" });

export const getBulkTestingDefaultValue = data =>
  GET(`/config/getAllConfigs`, data);

export const getBulkTestingAdditionalRuleConstants = () =>
  GET(`/config/getAllConfigs`, {
    name: "BULK_TESTING_ADDITIONAL_RULE_DETAILS"
  });
export const getDifferenceResult = data =>
  POST(
    `/communication/compareBulkTestResult/${data.name}/${data.type}/${data.referenceTag}/${data.resultTag}`
  );

export const getReverseTemplateTest = id => POST(`/communication/rules/${id}`);
export const getReferenceTagData = data =>
  GET(`/communication/bulkTesting/searchTags/${data.name}/${data.type}`);

export const getAllMessages = () =>
  GET("/languageString/languageStringMessage");
export const submitMessage = data =>
  POST("/languageString/languageStringMessage", data);

export const getTeacherConversion = ({ teacherId, ...data }) =>
  GET(`/teachers/getTeacherConversion/${teacherId}`, data);

export const getSlotsWithWeeklyBookings = ({ teacherId, startTime, endTime }) =>
  GET(`/slots/teachers/${teacherId}/getWeeklySlots`, { startTime, endTime });

export const getState = () => GET(`/regions/state`);

export const getStateByCountry = ({ countryId }) =>
  GET(`/regions/getStateByCountry/${countryId}`);

// Users apis
export const getLead = ({ studentUserId }) =>
  GET(`/leads/info/?userId=${studentUserId}`);

export const getLeadsAnalytics = ({ studentUserId }) =>
  GET(
    `/leadsAnalytics/getReferredUser?userId=${studentUserId}&offset=0&limit=1000`
  );
export const getAllUsers = data => GET(`/users/getAll`, data);
export const getAgentUsers = data => GET(`/admin/getAgentUsers`, data);

export const updateLoggedInUser = data => POST(`/userDetail/me/update`, data);
export const updateUser = data => POST(`/users/edit`, data);
export const createUser = data => POST(`/users/create`, data);
export const deleteUser = data => POST(`/users/${data.id}`, data);

export const getLeadScore = data =>
  POST(`/task/${data.taskId}/generateLeadQualificationScore`, data.payload);

export const getAllSessions = data => GET(`/bookings`, data);

export const getAllB2BSessions = data => GET(`/bookings`, data);

export const reassignTrial = data => POST(`/trial/slots/reassign`, data);
export const rescheduleTrial = data => POST(`/trial/slots/reschedule`, data);

export const getTrialSlots = ({
  grade,
  countryCode,
  timezone,
  startTime,
  courseType,
  subType
}) =>
  GET(`/trial/slots/get?adminFilter=true`, {
    grade,
    countryCode,
    timezone,
    startTime,
    courseType,
    courseSubType: subType
  });

export const triggerCustomGmail = data =>
  POST(`/proactiveNotification/sendProactiveEmail`, data);

export const updateCustomGmailConfig = data =>
  PUT(`/proactiveNotification/updateProactiveMailer/${data.id}`, data);

export const saveCustomGmailConfig = data =>
  POST(`/proactiveNotification/createProactiveMailer/`, data);

export const checkIfCustomGmailConfig = ({ userId }) =>
  GET(`/proactiveNotification/checkProactiveMailer/${userId}`);

export const getCustomGmailConfig = data => {
  let id = "";
  if (data && data.id) {
    id = data.id;
  }
  return GET(`/proactiveNotification/getProactiveMailer/${id}`);
};

export const deleteCustomGmailConfig = ({ id }) =>
  DELETE(`/proactiveNotification/deleteProactiveMailer/${id}`);

export const sendStudentTrialLink = data =>
  POST(`/communication/sendNotificationAPI`, data);

export const bookTrialSlot = ({ timezone, courseType, ...data }) =>
  POST(`/trial/slots/book`, { ...data }, { params: { timezone, courseType } });

export const generateVerificationCode = ({ email, mobile }) =>
  POST(`/users/generateVerificationCode`, { email, mobile });

export const getMe = () => GET(`/userDetail/meOps`);
export const getStudentPackages = ({
  studentId,
  timezone,
  grade,
  courseType,
  affiliateId,
  courseId
}) =>
  GET(`/packages/students/${studentId}/get`, {
    timezone,
    grade,
    courseType,
    affiliateId,
    courseId
  });

export const getStudentSubscriptions = ({ studentId }) =>
  GET(`/orders/students/${studentId}/subscriptions`);

export const cancelSubscriptions = ({ subscriptionId }) =>
  POST(`/orders/students/subscriptions/${subscriptionId}/cancel`);

export const pauseSubscriptions = ({ subscriptionId, data }) =>
  PUT(`/orders/students/subscriptions/${subscriptionId}/pause`, data);

export const resumeSubscriptions = ({ subscriptionId }) =>
  PUT(`/orders/students/subscriptions/${subscriptionId}/resume`);

export const getSingleApplicableCoupon = ({ studentId, courseType }) =>
  GET(`/orders/students/${studentId}/getSingleApplicableCoupon`, {
    courseType
  });

export const createOrder = data => POST(`/orders/createOrder`, data);

export const confirmPendingOfflineCapture = data =>
  POST(`/orders/confirmPendingOrder/${data.orderId}`, data);

export const capturePendingAdjustment = data =>
  POST(`/orders/capturePendingAdjustment/${data.orderId}`, data);

export const isPendingAmount = studentId =>
  GET(`/orders/${studentId}/isPendingAmountForStudent`);

export const getPartialPayment = studentId =>
  GET(`/orders/students/${studentId}/getPartialPayments`);

export const getRefundEligibleOrders = studentId =>
  GET(`/orders/students/${studentId}/refundEligibleOrders`);

export const getOrderLink = ({ url, userId }) =>
  POST(`/util/shortenUrl`, { url, userId });

export const getSession = ({ sessionId }) =>
  GET(`/classSession/${sessionId}/getSession`);

export const refundStudentBooking = data => POST(`/admin/refundBooking`, data);

export const cancelTeacherBulkSlots = ({
  teacherId,
  startTime,
  endTime,
  cancelOnlyNonBookingSlots = true,
  ncReasonCode,
  ncReasonDesc
}) =>
  POST(`/slots/teachers/${teacherId}/cancelBulkSlots`, {
    startTime,
    endTime,
    cancelOnlyNonBookingSlots,
    ncReasonCode,
    ncReasonDesc
  });

export const deactivateTeacher = ({ teacherId }) =>
  DELETE(`/teachers/deactivate/${teacherId}`);
export const activateTeacher = ({ teacherId }) =>
  PUT(`/teachers/activate/${teacherId}`);
export const deactivateStudent = ({ studentId }) =>
  DELETE(`/students/deactivate/${studentId}`);
export const activateStudent = ({ studentId }) =>
  PUT(`/students/activate/${studentId}`);

export const getAllSQLJobEntity = () => GET(`/sql-job-entity`);
export const createSQLJobEntity = data => POST(`/sql-job-entity`, data);
export const updateSQLJobEntity = data => PUT(`/sql-job-entity`, data);
export const deleteSQLJobEntity = ({ id }) => DELETE(`/sql-job-entity/${id}`);
export const testSQLJobEntity = data => POST(`/sql-job-entity/test`, data);

export const getAllCronConfigs = data =>
  GET(`/cron-config/getAllCronConfigs`, data);
export const createCronConfig = data =>
  POST(`/cron-config/createCronConfig`, data);
export const updateCronConfig = data =>
  PUT(`/cron-config/updateCronConfig`, data);
export const deleteCronConfig = ({ id }) => DELETE(`/cron-config/${id}`);

export const verifyCouponCode = data => POST(`/orders/coupon/verify`, data);

export const getAllNotificationConfigs = query =>
  GET(`/notification-configs/searchNotification`, query);
export const getEmailInsight = query =>
  GET(`notification-insights-auth/getEmailInsight`, query);
export const getSMSInsight = query =>
  GET(`notification-insights-auth/getSMSInsight`, query);
export const getWhatsappInsight = query =>
  GET(`notification-insights-auth/getWhatsappInsight`, query);
export const getIVRInsight = query =>
  GET(`notification-insights-auth/getIVRInsight`, query);
export const getStatusConstant = query =>
  GET(`notification-insights-auth/constants/${query.type}/${query.status}`);
export const createNotificationConfig = data =>
  POST(`/notification-configs`, data);
export const updateNotificationConfig = data =>
  PUT(`/notification-configs`, data);
export const deleteNotificationConfig = ({ id }) =>
  DELETE(`/notification-configs/${id}`);
export const testNotificationConfig = ({ id, json }) =>
  POST(`/communication/test/${id}`, { ...json });
export const testNotificationConfigPreview = data =>
  POST(`/communication/test`, data);
export const testNotificationConfigUsingForm = ({ id, name, type, data }) =>
  POST(`/communication/test/${id}?name=${name}&notificationType=${type}`, data);

export const getWhatsappProviderNumbersLimits = query =>
  GET(`communication/report/whatsappCapacity`, query);

export const getNotificationReference = ({ name, type }) =>
  GET(`/communication/bulkTestingReference/search/${name}/${type}`);

// const vendorUpload = formData =>
//     POST(`/shipping/shippingDetailBulkUpload`, formData, {
//       headers: { "Content-Type": "multipart/form-data" }
//     });
export const saveNotificationReference = formData =>
  POST(`/communication/bulkTestingReference/save`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

export const runBulkTest = data =>
  POST(`/communication/testV3Notification`, data);

export const getWhatsappProviderLimit = formData =>
  POST(`/communication/report/whatsappConfigLimit`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

export const createOrUpdateTestNotificationConfigPayload = ({
  name,
  type,
  body
}) => POST(`/communication/test/${name}/${type}`, body);
export const getTestNotificationConfigPayload = ({ name, type }) =>
  GET(`/communication/test/${name}/${type}`);

export const getAllNotificationMasterConstants = () =>
  GET(`/notification_master/constants`);
export const createV3NotificationConfig = data =>
  POST(`/notification_master`, data);
export const getV3NotificationConfig = query =>
  GET(`/notification_master`, query);
export const getAllV3NotificationConfigs = query =>
  GET(`/notification_master/searchNotification`, query);
export const updateV3NotificationConfig = data =>
  PUT(`/notification_master`, data);
export const deleteV3NotificationConfig = ({ id }) =>
  DELETE(`/notification_master/${id}`);
export const getFetchEnvName = query =>
  GET(`/communication/migrate/fetch/env`, query);
export const getV3NotificationDiff = data =>
  GET(`/communication/migrate/fetch/getNotifDataFromDifferentEnvs`, data);

export const fetchValidateRules = data =>
  POST(`/communication/migrate/validateRules`, data);
export const createOrUpdateMasterAndRules = data =>
  POST(`/communication/migrate/createOrUpdateMasterAndRules`, data);

export const getAllTemplates = query => GET(`/template/searchTemplate`, query);
export const getAllTemplatesNew = ({ notifRuleId }) =>
  GET(`/rule_template/notification-rules-for-rule-id/${notifRuleId}`);
export const getAllTemplateConstants = () => GET(`/template/constants`);
export const getValidUserForContent = () =>
  GET(`/template/validTemplateUpdateUser`);
export const getTemplate = id => GET(`/template/${id}`);
export const createTemplate = data => POST(`/template`, data);
export const updateTemplate = data => PUT(`/template`, data);
export const deleteTemplate = ({ id }) => DELETE(`/template/${id}`);
export const searchTemplateByCriteria = criteria => {
  return GET(`/criteria/searchCriteria?${criteria}`);
};

export const updateDraftStatus = data => {
  return PUT(`/draft_template`, data);
};

export const updateProviderDraftStatus = data => {
  return PUT(`/draft_template/provider`, data);
};
export const getTemplateVersions = id => {
  return GET(`/template/getTemplateVersions/${id}`);
};
export const getAllDraftTemplates = query =>
  GET(`/draft_template/searchTemplate`, query);
export const getDraftTemplate = id => GET(`/draft_template/${id}`);
export const createDraftTemplate = data => POST(`/draft_template`, data);
export const updateDraftTemplate = data => PUT(`/draft_template`, data);
export const deleteDraftTemplate = ({ id }) => DELETE(`/draft_template/${id}`);

export const getAllNotifcationRules = query =>
  GET(`/notification_rule/getNotificationRuleWithSearchParams`, query);
export const getAllNotificationRuleConstants = () =>
  GET(`/notification_rule/constants`);
export const getAllTemplatesForRule = id =>
  GET(`/notification_rule/searchNotificationRule/${id}`);
export const addTemplateMapping = data => POST(`/rule_template`, data);
export const updateTemplateMapping = data => PUT(`/rule_template`, data);
export const updateBulkTemplateMapping = data =>
  PUT(`/rule_template/bulkUpdateRuleTemplateMapping`, data);
export const deleteTemplateMapping = id => DELETE(`/rule_template/${id}`);
export const createNotificationRule = data => POST(`/notification_rule`, data);
export const createNotificationRuleWizard = data =>
  POST(`/notification_rule/wizard`, data);
export const updateNotificationRule = data => PUT(`/notification_rule`, data);
export const deleteNotificationRule = id => DELETE(`/notification_rule?${id}`);

export const getAllEventCommand = () => GET(`/event-command`);
export const createEventCommandConfig = data => POST(`/event-command`, data);
export const updateEventCommandConfig = data => PUT(`/event-command`, data);
export const deleteEventCommandConfig = ({ id }) =>
  DELETE(`/event-command/${id}`);

export const getAllConfigSchemas = () => GET(`/config/getAllConfigSchemas`);

//Experiments API

export const createExperiment = data => POST("/notification_experiment", data);
export const updateExperiment = data => PUT("/notification_experiment", data);
export const deleteExperiment = id => DELETE(`/notification_experiment/${id}`);
export const createBulkRulesExperimentMapping = data =>
  POST("/notification_experiment/rule_experiment_mapping/wizard", data);
export const createRuleExperimentMapping = data =>
  POST("/notification_experiment/rule_experiment_mapping", data);
export const deleteMultipleRuleExperiment = id =>
  DELETE(`/notification_experiment/rule_experiment_mapping?${id}`);
export const updateExperimentRuleMapping = data =>
  PUT("/notification_experiment/rule_experiment_mapping", data);
export const getAllExperimentList = data =>
  GET("/notification_experiment/all", data);
export const updateWinnerExperiment = data =>
  PUT(`/notification_experiment/updateWinner`, data);
export const clearExperimentCache = id =>
  PUT(`/notification_experiment/clearCache/${id}`);

export const getStudentBookings = ({
  studentId,
  timezone,
  regionId,
  allBookings = true
}) =>
  GET(`/bookings/students/${studentId}/getAllClasses`, {
    timezone,
    regionId,
    allBookings
  });

export const getB2BStudentBookings = ({ studentId, timezone, regionId }) =>
  GET(`/b2b/batch/${studentId}/getAllClasses`, { timezone, regionId });

export const getStudentProjects = ({ studentId, courseType }) =>
  GET(`/projects/student/${studentId}`, { courseType });

export const getStudentAllQuizzes = ({ studentId, courseType }) =>
  GET(`/quiz/studentQuizzes?studentId=${studentId}`, { courseType });

export const getStudentAllSongChallenges = ({
  studentId,
  courseType,
  courseId
}) =>
  GET(`/quiz/getSongChallenge?studentId=${studentId}`, {
    courseType,
    courseId
  });

export const removeStudentProject = ({ studentId, projectId }) =>
  POST(`projects/unassignToStudentForClass`, {
    projectId,
    studentId
  });

export const clearStudentBooking = ({ studentId }) =>
  POST(`/bookings/students/clearBookingCache`, {
    studentId
  });

export const addQuizToStudent = (data = {}) =>
  POST(`/quiz/assignQuizToStudentForClass`, data);

export const updateStudentQuiz = (data = {}) =>
  POST(`/quiz/updateQuizTracker`, data);

export const updateDueDateForProjects = data =>
  PUT(`/projects/studentProjects/${data.id}/update`, {
    dueDate: data.dueDate
  });

export const createUpdateClassJoinTime = ({ studentId, projectId }) =>
  POST(`/bookings/students/${studentId}/updateClassJoinTime`, {
    id: projectId
  });

export const removeClassFromWeeklyTarget = ({ studentId, projectId }) =>
  POST(`/gamification/student/${studentId}/removeClassFromWeeklyTarget`, {
    id: projectId
  });

export const BadgeStreakReSync = ({ studentId, badgeType }) =>
  POST(`/gamification/student/${studentId}/BadgeStreakReSync`, {
    badgeType: badgeType
  });

export const setStudentAsWeeklyWinnerByWeek = data =>
  POST(
    `/gamification/student/${data.studentId}/setStudentAsWeeklyWinnerByWeek`,
    { date: data.date }
  );
export const refundToStudent = data => POST(`/orders/captureRefund`, data);

export const updateCallingHours = data =>
  POST("/communication/userAvailability", data);

export const getCallingHours = studentId =>
  GET(`/communication/userAvailability?studentId=${studentId}`);

export const clearCacheUser = ({ userId }) =>
  GET(`/caching/clearUserCache?userId=${userId}`);

export const clearCacheAffiliate = data =>
  POST(
    `/third_party_affiliate/clearCache?referralCode=${data.referralCode}&id=${data.affiliateId}`
  );

export const getTeacherEarning = ({
  teacherId,
  orderBy = "date",
  startDate = null,
  endDate = null,
  timezone
}) =>
  GET(`/teachers/getTeacherEarning/${teacherId}`, {
    orderBy: orderBy === "monthly" ? "" : orderBy,
    startDate,
    endDate,
    timezone
  });

// Call Framework API's start'

export const getCallIntentList = data =>
  GET(`/call_log/management/callIntent`, data);

export const createCallIntent = data =>
  POST(`/call_log/management/callIntent`, data);

export const getCallProvider = data =>
  GET(
    `/call/getProvider?countryCode=${data.countryCode}&callIntentType=${data.callIntentType}`
  );

export const triggerSaleskenCall = data => POST(`/call/connect/salesken`, data);

export const updateCallIntent = ({ callIntentId, payload }) =>
  PUT(`/call_log/management/callIntent/${callIntentId}`, payload);

export const deleteCallIntent = ({ callIntentId }) =>
  DELETE(`/call_log/management/callIntent/${callIntentId}`);

export const getCallCampaignList = data =>
  GET(`/call_log/management/feature/campaign`, data);

export const updateCampaign = data =>
  PUT(`/call_log/management/feature/campaign`, data);

export const getCallPlatformList = () =>
  GET(`/call_log/management/feature/platform`);

export const updatePlatform = data =>
  PUT(`/call_log/management/feature/platform`, data);

export const getDispositionEffectList = () =>
  GET(`/call_log/management/feature/dispositionEffects`);

export const updateDispositionEffect = data =>
  PUT(`/call_log/management/feature/dispositionEffects`, data);

export const getAllDispositionCF = () =>
  GET(`/call_log/management/dispositions`);

export const getAllSubDispositionCF = (data = {}) =>
  GET(`/call_log/management/subDispositions`, data);

export const getDispositionMapping = () =>
  GET(`/call_log/management/dispositionMapping`);

export const getDispositionGroupList = data =>
  GET(`/call_log/dispositionGroups`, data);

export const getCallRecommendationList = ({ id }) =>
  GET(`/svcRecommendations/callRecommendation/${id}`);

export const createDispositionCF = data =>
  POST(`/call_log/management/disposition`, data);

export const createSubDispositionCF = data =>
  POST(`/call_log/management/subDisposition`, data);

export const createDispositionMapping = data =>
  POST(`/call_log/management/dispositionMapping`, data);

export const updateDispositionCF = ({ dispositionId, payload }) =>
  PUT(`/call_log/management/disposition/${dispositionId}`, payload);

export const deleteDispositionCF = ({ dispositionId }) =>
  DELETE(`/call_log/management/disposition/${dispositionId}`);

export const updateSubDispositionCF = ({ subDispositionId, payload }) =>
  PUT(`/call_log/management/subDisposition/${subDispositionId}`, payload);

export const deleteSubDispositionCF = ({ subDispositionId }) =>
  DELETE(`/call_log/management/subDisposition/${subDispositionId}`);

export const updateDispositionMapping = ({ mappingId, payload }) =>
  PUT(`/call_log/management/dispositionMapping/${mappingId}`, payload);

export const deleteDispositionMapping = ({ mappingId }) =>
  DELETE(`/call_log/management/dispositionMapping/${mappingId}`);

// Call Framework API's end

export const getAllSubTaskType = data =>
  GET(`/disposition/getAllSubTaskType`, data);
export const getAllTasks = () => GET(`/task`);

export const getAllPayments = data => GET("/orders/getPaymentsMade", data);
export const getAllTasksType = data => GET(`/disposition/getAllTaskType`, data);
export const getAllSubTasksType = data =>
  GET(`/disposition/getAllSubTaskType`, data);
export const getAllResolution = () => GET(`/disposition/getAllResolution`);
export const getFilteredResolution = data =>
  GET(
    `/disposition/getResolution?dispositionId=${data.dispositionId}&subdispositionId=${data.subdispositionId}`
  );
export const getAllDisposition = () => GET(`/disposition/getAllDisposition`);
export const getAllDispositionWithCallType = callType =>
  GET(`/disposition/getAllDisposition?callType=${callType}`);
export const getAllSubDisposition = data =>
  GET(`/disposition/getAllSubDisposition`, data);

export const getWeeklyCalendarSlots = ({ teacherId, startTime, endTime }) =>
  GET(`/slots/teachers/${teacherId}/getWeeklySlots`, { startTime, endTime });
export const getAllTeacherBasedOnTime = ({
  studentId,
  startTime,
  courseType,
  languageId,
  fromTrialSlot,
  capacityCheck
}) =>
  GET(`/bookings/students/${studentId}/getAllTeachersOfSlot`, {
    startTime,
    courseType,
    languageId,
    fromTrialSlot,
    capacityCheck
  });
export const getAllTeachersOfSlotNotOpenedOrFreeBasedOnTime = ({
  studentId,
  startTime,
  courseType
}) =>
  GET(`/bookings/students/${studentId}/getAllTeachersOfSlotNotOpenedOrFree`, {
    startTime,
    courseType
  });
export const getVcAdapterRoomInfo = ({ roomName, vcProvider, sessionId }) =>
  GET(
    `/vcAdapter/getVCRoomInfo?roomName=${roomName}&vcProvider=${vcProvider}&sessionId=${sessionId}`
  );

export const getSocketDataRoomInfo = ({ roomName }) =>
  GET(`/vcAdapter/getSocketDataForRoom?roomName=${roomName}`);

export const getSessionSystemInfo = ({ sessionId }) =>
  GET(`/vcAdapter/inclassSystemAudits?sessionId=${sessionId}`);
export const createTask = data => POST(`/task/create`, data);
export const updateTask = ({
  id,
  typeId,
  subTypeId,
  dispositionTypeId,
  subDispositionTypeId,
  remarks
}) =>
  POST(`/task/update/${id}`, {
    typeId,
    subTypeId,
    dispositionTypeId,
    subDispositionTypeId,
    remarks
  });
export const buddyClassCancelled = data => {
  return POST(`/bookings/students/cancelClassAndRestoreToOriginal`, data);
};
export const updateTaskWithAgentID = ({
  id,
  studentBookingId,
  typeId,
  subTypeId,
  dispositionTypeId,
  subDispositionTypeId,
  remarks,
  AgentID,
  resolutionId,
  customerRemarks
}) =>
  POST(`/task/update/${id}`, {
    studentBookingId,
    typeId,
    subTypeId,
    dispositionTypeId,
    subDispositionTypeId,
    remarks,
    AgentID,
    resolutionId,
    customerRemarks
  });

export const updateStudentTask = ({ id, subDispositionTypeId, remarks }) =>
  POST(`/task/update/student/${id}`, {
    subDispositionTypeId,
    remarks
  });

export const getTask = data => GET(`/task`, data);

export const getAllTasksPaginated = data =>
  GET(
    `/task/paginated?limit=${data.limit}&offset=${data.offset}${
      data.startTime ? `&startTime=${data.startTime}` : ""
    }${data.endTime ? `&endTime=${data.endTime}` : ""}${
      data.emailId ? `&emailId=${data.emailId}` : ""
    }${data.status ? `&status=${data.status}` : ""}${
      data.taskTypeId ? `&taskTypeId=${data.taskTypeId}` : ""
    }${data.userId ? `&userId=${data.userId}` : ""}
    ${
      data.startTimeHour === undefined
        ? ""
        : `&startTimeHour=${data.startTimeHour}`
    }
    ${data.endTimeHour ? `&endTimeHour=${data.endTimeHour}` : ""}
    ${data.mobile ? `&mobile=${data.mobile}` : ""}
      `
  );

export const getTeacherAllBookingInfo = ({
  startTime,
  endTime,
  courseId,
  regionId
}) =>
  GET(`/slots/teachers/getAllBookingInfo`, {
    startTime,
    endTime,
    courseId,
    regionId
  });

export const callConnect = ({
  to = encodeURIComponent(to),
  timezone,
  trackingCode,
  dialCode,
  isSecondary = false
}) =>
  GET(`/call/connect`, { to, timezone, trackingCode, dialCode, isSecondary });

export const captureOfflinePayment = values =>
  POST(`/orders/captureOfflinePayment`, values);

export const generateCertificateLink = ({ studentId, courseType }) =>
  GET(
    `students/${studentId}/getTrialCertificate?adminFilter=true&courseType=${courseType}`
  );

export const websitedelete = ({ studentId }) =>
  DELETE(`/students/${studentId}/deleteWebsite`);
export const studentFollowupDetail = ({ studentId }) =>
  GET(`/classSession/student/${studentId}/followUpDetails`);
export const getTeachersForReassign = ({
  startTime,
  courseId,
  regionId,
  studentId,
  teacherId,
  courseType,
  isLanguage = false
}) =>
  GET(`/trial/slots/getBookedAndNonBookedTeacherListForReassign`, {
    startTime,
    courseId,
    regionId,
    studentId,
    teacherId,
    courseType,
    isLanguage
  });

export const assignProjectToStudentForClass = values =>
  POST(`/projects/assignToStudentForClass`, values);

export const getAuditForStudentBookingId = ({ bookingId }) =>
  GET(`/audit/classBooking/${bookingId}`);
export const getAuditForStudentCourseId = ({ courseId }) =>
  GET(`/audit/studentCourse/${courseId}`);
export const getAuditForStudentDetails = ({ studentId }) =>
  GET(`/audit/student/${studentId}`);
export const getAuditForTeacherSlotInfoId = ({ slotId }) =>
  GET(`/audit/teacherSlot/${slotId}`);
export const getAuditForTeacherSkillInfoId = ({ teacherId }) =>
  GET(`/audit/teacherSkill/${teacherId}`);
export const getAuditForTeacherId = ({ teacherId }) =>
  GET(`/audit/teacher/${teacherId}`);
export const getAuditForCourseId = ({ courseId }) =>
  GET(`/audit/course/${courseId}`);
export const getAuditForCourseItemId = ({ courseItemId }) =>
  GET(`/audit/courseItem/${courseItemId}`);
export const getAuditForCourseVersion = ({ courseVersionId }) =>
  GET(`/audit/courseVersion/${courseVersionId}`);
export const getAuditForTeacherResign = ({ teacherAdditionalId }) =>
  GET(`/audit/teacherAdditional/${teacherAdditionalId}`);
export const getAuditForTeacherPenality = ({ teacherSlotPaymentPenaltyId }) =>
  GET(`/audit/teacherSlotPaymentPenalty/${teacherSlotPaymentPenaltyId}`);
export const getAuditForCoursePrice = ({ coursePriceId }) =>
  GET(`/audit/coursePrice/${coursePriceId}`);
export const getAuditForRecurringBatch = ({ batchId }) =>
  GET(`/audit/batchSchedule/${batchId}`);
export const getAuditForBatch = ({ id }) => GET(`audit/classBatch/${id}`);
export const getAuditTask = data =>
  GET(`/micro/metrics/teacherAudit/auditTasks/${data.taskId}/getAuditTaskById`);
export const getAuditTaskResponses = data =>
  GET(
    `/micro/metrics/teacherAudit/auditTasks/${data.taskId}/getAllAuditTaskResponse`
  );
export const getAuditGeneralQueneralQuestionList = ({
  auditTaskId,
  teacherId
}) =>
  GET(
    `micro/metrics/teacherAudit/teacherQuality/getOrCreateAuditTaskResponseDetail/${auditTaskId}/${teacherId}`
  );

export const getAuditWithLanguageString = ({
  entityTable,
  entityId,
  languageKeys
}) =>
  POST(`/audit/withLanguageString/${entityTable}/${entityId}`, {
    languageKeys
  });
export const saveAuditTaskResponses = data =>
  POST(
    `/micro/metrics/teacherAudit/auditTasks/${data.taskId}/saveAuditTaskResponses`,
    { data: data.payload }
  );
export const setAuditTaskStatus = data =>
  PUT(
    `/micro/metrics/teacherAudit/auditTasks/${data.taskId}/updateStatus?status=${data.taskStatus}`
  );
export const getAuditList = data =>
  GET(`/micro/metrics/teacherAudit/auditTasks/getAllAuditTasks`, data);
export const rejectAuditTask = data =>
  PUT(`/micro/metrics/teacherAudit/auditTasks/rejectAuditTask/${data.taskId}`);
export const assignMeAuditTask = data =>
  POST(`/micro/metrics/teacherAudit/auditTasks/assignMeTask`, data);
export const assignReAssignAuditTask = data =>
  PUT(
    `/micro/metrics/teacherAudit/auditTasks/assignReAssignAuditTask/${data.userId}/${data.auditTaskId}`
  );
export const getDndAudit = ({ id }) =>
  GET(`audit/UserNotificationSubscription/${id}`);
export const getUserAudit = ({ id }) => GET(`audit/user/${id}`);
export const getMlAuditQuestion = () =>
  GET(`/micro/metrics/mlAudit/getAllQuestion`);
export const getMlAuditResponse = data =>
  GET(`/micro/metrics/mlAudit/getResponseByFilter`, data);
export const createMlAuditResponse = data =>
  POST(`/micro/metrics/mlAudit/createResponse`, data);
export const deleteMlAuditResponse = data =>
  DELETE(`/micro/metrics/mlAudit/deleteAuditResponse/${data.id}`, data);
export const updateMlAuditResponse = data =>
  PUT(`/micro/metrics/mlAudit/updateResponse/${data.id}`, {
    auditOptionId: data.auditOptionId
  });
export const getMlAuditQuestionOptionByFilter = data =>
  GET(
    `/micro/metrics/mlAudit/getQuestionOptionByfilter/${data.questionId}`,
    data
  );
export const fetchRecordingAndCreateTasks = data =>
  POST(
    `/micro/metrics/teacherAudit/auditTasks/fetchRecordingAndCreateTasks`,
    data
  );
export const assignReAssignMultipleAuditTask = data =>
  PUT(
    `/micro/metrics/teacherAudit/auditTasks/assignReAssignMultipleAuditTask/${data.userId}`,
    data
  );
const auditApiMap = {
  STUDENT_BOOKING_AUDIT_LIST: getAuditForStudentBookingId,
  STUDENT_COURSE_AUDIT_LIST: getAuditForStudentCourseId,
  STUDENT_AUDIT_LIST: getAuditForStudentDetails,
  TEACHER_SLOT_INFO_AUDIT_LIST: getAuditForTeacherSlotInfoId,
  TEACHER_SKILL_INFO_AUDIT_LIST: getAuditForTeacherSkillInfoId,
  TEACHER_AUDIT_INFO_LIST: getAuditForTeacherId,
  COURSE_AUDIT_LIST: getAuditForCourseId,
  COURSE_CLASS_AUDIT_LIST: getAuditWithLanguageString,
  COURSE_ITEM_AUDIT_LIST: getAuditForCourseItemId,
  QUIZ_AUDIT_LIST: getAuditWithLanguageString,
  COURSE_VERSION_AUDIT_LIST: getAuditForCourseVersion,
  TEACHER_RESIGN_AUDIT_LIST: getAuditForTeacherResign,
  TEACHER_PENALITY_AUDIT_LIST: getAuditForTeacherPenality,
  COURSE_PRICE_AUDIT_LIST: getAuditForCoursePrice,
  PROJECT_AUDIT_LIST: getAuditWithLanguageString,
  BATCH_SCREEN_AUDIT_LIST: getAuditForBatch,
  TEACHER_AUDIT_TASK_LIST: getAuditTask,
  TEACHER_AUDIT_RESPONSES_LIST: getAuditTaskResponses,
  TEACHER_AUDIT_RESPONSES_UPDATE: saveAuditTaskResponses,
  TEACHER_AUDIT_STATUS_UPDATE: setAuditTaskStatus,
  TEACHER_AUDIT_LIST: getAuditList,
  ASSIGN_AUDIT_ADD: assignMeAuditTask,
  REJECT_AUDIT_TASK_UPDATE: rejectAuditTask,
  ASSIGN_REASSIGN_AUDIT_TASK_UPDATE: assignReAssignAuditTask,
  DND_AUDIT_LIST: getDndAudit,
  USER_AUDIT_LIST: getUserAudit,
  RECURRING_BATCH_AUDIT_LIST: getAuditForRecurringBatch,
  AUDIT_GENERAL_QUESTION_LIST: getAuditGeneralQueneralQuestionList,
  ML_AUDIT_QUESTION_LIST: getMlAuditQuestion,
  ML_AUDIT_RESPONSE_LIST: getMlAuditResponse,
  CREATE_ML_AUDIT_RESPONSE_ADD: createMlAuditResponse,
  DELETE_ML_AUDIT_RESPONSE_DELETE: deleteMlAuditResponse,
  UPDATE_ML_AUDIT_RESPONSE_UPDATE: updateMlAuditResponse,
  ML_AUDIT_QUESTION_OPTION_BY_FILTER_LIST: getMlAuditQuestionOptionByFilter,
  FETCH_RECORDING_AND_CREATE_AUDIT_TASK_ADD: fetchRecordingAndCreateTasks,
  ASSIGN_REASSIGN_MULTIPLE_AUDIT_TASK_UPDATE: assignReAssignMultipleAuditTask
};

export const getAllStudentAchievementEntriesOps = data =>
  GET(
    `/studentAchievements/getAllStudentAchievementEntriesOps?impactType=${data.impactType}&pageSize=${data.pageSize}&page=${data.page}&search=${data.searchTerm}`
  );

export const updateStudentAchievementEntry = data =>
  PUT(`studentAchievements/studentAchievementEntry/${data.id}`, data);

export const updateStudentAchievementEntryNews = data =>
  POST(
    `studentAchievements/studentAchievementEntry/${data.id}/submitNewsEntry`,
    data
  );

const wofApiMap = {
  WALL_OF_FAME_LIST: getAllStudentAchievementEntriesOps,
  WALL_OF_FAME_UPDATE: updateStudentAchievementEntry,
  WALL_OF_FAME_ADD_NEWS_ADD: updateStudentAchievementEntryNews
};

export const testEvent = data =>
  POST(
    `/event-command/testEventNotification?sendNotification=${!!data.sendNotification}`,
    data
  );

export const pushToSalesForce = data =>
  POST(`/orders/salesforce/sendOfflinePayment`, data);
export const getTeacherPenalty = ({ teacherId }) =>
  GET(`/teachers/${teacherId}/penalty`);
export const refundTeacherPenalty = (value = {}) =>
  POST(`/teachers/${value.teacherId}/updateSlotPaymentPenalty`, value);
// export const refundTeacherBooking = ({ teacherId, payments }) =>
//     POST(`/teachers/${teacherId}/refundPayment`, payments);
export const addLead = ({
  name,
  mobile,
  parentName,
  email,
  dialCode,
  referredBy
}) => {
  if (email === "" || email === null) {
    return POST(`/leads/create`, {
      name,
      mobile,
      parentName,
      dialCode,
      referredBy
    });
  }
  return POST(`/leads/create`, {
    name,
    mobile,
    parentName,
    email,
    dialCode,
    referredBy
  });
};
export const getAllShippingAddress = ({ addressType, status, type }) =>
  GET(`/shipping/${addressType}/getAllAddress/${status}?type=${type}`);

export const getDailyShippingData = data =>
  GET(`shipping/downloadDailyCsv?date=${data.dateInUtc}&vendor=${data.vendor}`);
const updateShippingAddress = data =>
  POST(`/shipping/updateTrackingDetail`, data);
const updateAddressStatus = data =>
  POST(`/shipping/address/updateStatus`, data);
export const getAllTaskRoster = ({ taskTypeId, regionId, status }) =>
  GET(
    `/taskRosterUser/getAll?taskTypeId=${taskTypeId}&regionId=${regionId}&status=${status}`
  );
export const taskRosterCreate = data => POST("/taskRosterUser/create", data);
export const taskRosterUpdate = data => {
  if (data.type === "update") {
    return PUT(`/taskRosterUser/update/${data.id}`, data);
  } else if (data.type === "activate") {
    return activateTaskRoster(data);
  } else if (data.type === "deactivate") {
    return deactivateTaskRoster(data);
  }
};
export const taskRosterDelete = ({ id }) => DELETE(`/taskRosterUser/${id}`);

export const taskRosterBulkUpload = formData =>
  POST(`/taskRosterUser/processBulkActionCSV`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

export const taskAgentUpdate = ({ taskId, taskRoasterUserId, userId }) =>
  POST(
    `/task/changeTaskRosterUser/${taskId}?taskRosterUserId=${taskRoasterUserId}&userId=${userId}`
  );

export const activateTaskRoster = ({ id }) =>
  POST(`/taskRosterUser/activate/${id}`);
export const deactivateTaskRoster = ({ id }) =>
  POST(`/taskRosterUser/deactivate/${id}`);
export const reassignVcUrl = data =>
  POST(`/classSession/createNewVCRoomForSession`, data);
export const sessionJoinedFromOpsPanel = data =>
  POST(`/classSession/sessionJoinedFromOpsPanel`, data);
export const smJoinClassBtl = ({ sessionId }) =>
  POST(`/classSession/smJoinClassBtl?sessionId=${sessionId}`);
export const smEndClassBtl = ({ sessionId }) =>
  POST(`/classSession/smEndClassBtl?sessionId=${sessionId}`);
export const inActiveUserUpdate = data => POST(`/admin/activeOrDeactive`, data);
export const updateNotificationStatus = data =>
  POST(`/admin/notificationStatus`, data);
export const studentActionsLockUpdate = ({ studentId, actionsLock }) =>
  PUT(`/admin/setStudentActionsLock`, {
    studentId,
    actionsLock
  });
export const getCourseVersions = ({ courseItemId, moduleId }) =>
  GET(`/courseVersion/getAll/${courseItemId}`, { moduleId });

export const getAllEligibleVersions = ({ courseItemId, payload }) => {
  return GET(`/courseVersion/getAllEligibleVersion/${courseItemId}`, payload);
};

export const createCourseVersion = ({ id, payload }) =>
  POST(`/courseVersion/create`, payload);

export const getClassFromVersion = ({
  courseItemId,
  courseVersionId,
  versionNo,
  excludeBuddyTrials = false,
  moduleId
}) =>
  GET(`/courseVersion/getInfo/${courseItemId}`, {
    courseVersionId,
    excludeBuddyTrials,
    versionNo,
    moduleId
  });
export const updateCourseVersionInfo = ({ id, payload }) =>
  POST(`/courseVersion/updateVersion/${id}`, payload);

export const AddBulkClasses = data =>
  POST(`/courseVersion/bulkCreateClass/`, data);
export const updateClassVersionInfo = data =>
  POST(`/courseVersion/updateVersionClass/${data.courseVersionClassId}`, data);
export const createClassVersionInfo = data =>
  POST(`/courseVersion/createClass`, data);

export const createCourseBaseVersion = payload =>
  POST(`/courseVersion/createBase/`, payload);
export const removeCourseVersionInfo = ({ id }) =>
  POST(`/courseVersion/removeVersionClass/${id}`);

export const getSyncStudentBooking = ({ courseVersionId }) =>
  POST("/batch_jobs/batchWiseBookingSync", { courseVersionId });

export const getMentorsForGroup = ({ groupId }) =>
  GET(`/mentorship/program/fetchAllMentorsForGroup`, { groupId });
export const deactivateMentor = ({ mentorId }) =>
  POST(`/mentorship/program/deactivateMentor`, { mentorId });

export const searchMentorActivity = ({
  senderId,
  status,
  startDate,
  endDate
}) => GET(`/activity/searchActivity`, { senderId, status, startDate, endDate });
export const getTeachersForMentor = ({ mentorId }) =>
  GET(`/mentorship/program/fetchAllMenteeForMentor`, { mentorId });
export const assignMentorMentee = data =>
  POST(`/mentorship/program/assignMentorMentee`, data);

export const updateTeacherAdditionalDetail = data =>
  POST(`/teachers/${data.teacherId}/updateAdditionalDetail`, data);
export const createOrUpdateReimbursement = data =>
  POST(`/reimburse/${data.userId}/createOrUpdateReimbursement`, data);
export const getTeacherReimbursement = ({ userId }) =>
  GET(`/reimburse/${userId}/getReimbursementDetails`);
export const getPaycycles = () => GET(`payroll/fetchAllActivePaycycle`);
export const getRewards = data =>
  GET(
    `/teacher-gamification/getRewardTrackerDetails?offset=${
      data.offset
    }&limit=${data.limit}${data.query ? "&search=" + data.query : ""}`
  );
export const createOrUpdatePayCycle = data =>
  POST(`payroll/payCycleCreateOrUpdate`, data);
export const createPayCycleBusinessUnit = data =>
  POST(`payrollBusinessUnit/createPayrollBusinessUnit`, { data: { ...data } });
export const updatePayCycleBusinessUnit = data => {
  return PUT(`payrollBusinessUnit/payrollBusinessUnit/${data.id}`, {
    data: { ...data }
  });
};
export const updateTeacherPayrollBusinessUnit = data => {
  return PUT(`payrollBusinessUnit/updateTeacherPayrollBusinessUnit`, data);
};
export const getPayrollCompensation = data =>
  POST(`payroll/calculateCompensation`, data, {}, 0);
export const uploadPaySlip = data =>
  POST(`/payroll/uploadTeacherPaySlip`, data);
export const uploadCsv = data => POST(`/teacher-gamification/uploadCSV`, data);
export const getThemes = () => GET("/eventthemes/getAll");
export const getTeacherLeaderboards = data =>
  GET("/teachers/getLeaderBoard", data);

export const splitAndRunTeacherBatchJob = data =>
  POST(`/batch_jobs/splitAndRunTeacherBatchJob`, data, {}, 0);
export const splitAndRunTeacherBatchJobByPBU = data =>
  POST(`/batch_jobs/splitAndRunTeacherBatchJobByPBU`, data, {}, 0);
export const splitAndRunTeacherByTimezoneBatchJob = data =>
  POST(`/batch_jobs/splitAndRunTeacherByTimezoneBatchJob`, data, {}, 0);
export const getPaycycleBusinessUnits = () =>
  GET(`payrollBusinessUnit/getAllPayrollBusinessUnits`);

export const calculateCompensationPaginated = ({
  payOutCycleId,
  status,
  page,
  pageSize
}) =>
  POST(
    `/payroll/calculateCompensationPaginated?pageSize=${pageSize}${
      page !== undefined && pageSize ? `&page=${page}` : ""
    }`,
    { payOutCycleId, status }
  );

export const getPayoutExcelUpload = ({ payoutCycleId }) =>
  GET(`/payoutExcelUploadLog/getAllPayoutExcelUploadLogs`, { payoutCycleId });

export const getAllFeedbackTriggersForCourse = ({
  courseItemId = "",
  versionNo = "",
  entity = "",
  moduleId = ""
}) =>
  GET(
    `/feedback/getFeedbackTriggerByVersion/${courseItemId}?versionNo=${versionNo}&triggerType=${entity}&moduleId=${moduleId}`
  );
export const addFeedbackTriggersForCourse = data =>
  POST(`/feedback/createFeedbackTrigger/`, data);
export const deleteFeedbackTriggersForCourse = data =>
  POST(`/feedback/updateFeedbackTrigger/`, data);

export const getAllPostSubmissions = (data = {}) =>
  GET(`/postPermission/getPostPermission/`, data);
export const addPostSubmissionForCourse = (data = {}) =>
  POST(`/postPermission/create/`, data);
export const updatePostSubmissionsForCourse = (data = {}) => {
  const id = data.id || "";
  return POST(`/postPermission/${id}/update`, data);
};
export const processPayoutExcel = (data = {}) => {
  return POST(`/payroll/processPayoutExcel`, data);
};

const payoutApiMap = {
  TEACHER_ADDITIONAL_UPDATE: updateTeacherAdditionalDetail,
  TEACHER_REIMBURSEMENT_UPDATE: createOrUpdateReimbursement,
  TEACHER_REIMBURSEMENT_LIST: getTeacherReimbursement,
  TEACHER_PBU_UPDATE: updateTeacherPayrollBusinessUnit,
  PBU_LIST: getPaycycleBusinessUnits,
  PBU_UPDATE: updatePayCycleBusinessUnit,
  PBU_ADD: createPayCycleBusinessUnit,
  REWARDS_LIST: getRewards,
  REWARDS_ADD: uploadCsv,
  PAYCYCLE_LIST: getPaycycles,
  PAYCYCLE_ADD: createOrUpdatePayCycle,
  PAYOUT_EXCEL_DATA_LIST: getPayoutExcelUpload,
  PAYROLL_COMPENSATION_LIST: calculateCompensationPaginated,
  TEACHER_PAYSLIP_UPLOAD_ADD: uploadPaySlip,
  TEACHER_BATCH_JOB_ADD: splitAndRunTeacherBatchJob,
  TEACHER_BATCH_JOB_PBU_ADD: splitAndRunTeacherBatchJobByPBU,
  TEACHER_BATCH_JOB_TIMEZONE_ADD: splitAndRunTeacherByTimezoneBatchJob,
  PROCESS_PAYOUT_EXCEL_LIST: processPayoutExcel
};

const teacherLeaderboardApiMap = {
  EVENT_THEME_LIST: getThemes,
  TEACHER_LEADERBOARD_LIST: getTeacherLeaderboards
};

export const getListOfEmail = ({
  courseIds,
  noOfTrialClasses,
  noOfPaidClasses,
  regionIds
}) =>
  GET(`teachers/getByFilters`, {
    courseIds,
    noOfTrialClasses,
    noOfPaidClasses,
    regionIds
  });
export const sendEmail = data =>
  POST(`/communication/sendPlainTextEmail`, data);

export const uploadMentorMenteeSeeds = data =>
  POST(`/mentorship/seed/uploadMentorMenteeSeeds`, data);

export const uploadGraduatedMentees = data =>
  POST(`/mentorship/seed/uploadGraduatedMentees`, data);

export const uploadMentorsToBeDeactivated = data =>
  POST(`/mentorship/seed/uploadMentorsForDeAllocationOrAllocation`, data);

const getMpmActivityTypes = ({}) => GET(`/activity/fetchAllActivityType`);
const createOrUpdateActivityConfig = data =>
  POST(`/activity/activityCreateOrUpdate`, data);
const getMpmActivities = () => GET(`/activity/fetchAllActivityConfig`);
const mpmCsvUpload = formData =>
  POST(`/activity/activityAssignBulkUpload`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
const updateMentorActivity = data =>
  POST(`/activity/updateActivityTracker`, data);

const teacherUserUpdate = data => POST(`/teachers/update`, data);

const mentorApiMap = {
  TEACHER_USER_UPDATE: teacherUserUpdate,
  MENTOR_LIST: getMentorsForGroup,
  MENTOR_DELETE: deactivateMentor,
  MENTOR_ACTIVITY_LIST: searchMentorActivity,
  MENTOR_TEACHERS_LIST: getTeachersForMentor,
  MENTOR_TEACHERS_UPDATE: assignMentorMentee,
  MENTOR_ACTIVITY_UPDATE: updateMentorActivity,
  MPM_SEED_ADD: uploadMentorMenteeSeeds,
  MPM_GRADUATE_ADD: uploadGraduatedMentees,
  MPM_DEACTIVATE_ADD: uploadMentorsToBeDeactivated,
  MPM_ACTIVITY_TYPE_LIST: getMpmActivityTypes,
  MPM_ACTIVITY_LIST: getMpmActivities,
  MPM_ACTIVITY_ADD: createOrUpdateActivityConfig,
  MPM_ACTIVITY_UPDATE: mpmCsvUpload
};
export const getCourseVersionForCountry = ({ courseItemId, countryCode }) =>
  GET(
    `/courseVersion/getAllForStudents/${courseItemId}?countryCode=${countryCode}&dialCode=${countryCode}`
  );
export const screenShotStart = ({
  classSessionId,
  isTrial,
  fileName,
  vcMeetingUrl,
  timeout
}) =>
  POST(`/screencast/start`, {
    classSessionId,
    isTrial,
    fileName,
    vcMeetingUrl
  });
export const screenShotEnd = ({ classSessionId }) =>
  POST(`/screencast/stop`, {
    classSessionId
  });
export const recordingAdd = ({ classBookingId, isRecordingEnabled }) =>
  POST(`/screencast/bookings`, { classBookingId, isRecordingEnabled });
export const recordingEdit = ({ classBookingId, isRecordingEnabled }) =>
  PUT(`/screencast/bookings/${classBookingId}`, { isRecordingEnabled });
export const recordingList = data => GET(`screencast/bookings`, data);
const api__retryTwilioSessionRecording = data =>
  POST(`screencast/retryTwilioSessionRecording`, data);
export const getAllRm = () => GET(`teachers/getAllTeacherRms`);

// Renewals
export const searchRenewalStudents = params =>
  GET(`renewals/admin/getAll`, params);
export const sendRenewalReportMail = ({ id, status }) =>
  PUT(`/renewals/sendReportEmail/${id}`, { status });
export const renewalMarkAsComplete = ({ id, submitData }) =>
  PUT(`/renewals/leads/${id}`, submitData);
export const renewalFormUpdate = ({ id, submitData }) =>
  PUT(`renewals/form/${id}`, submitData);
export const regenerateStudentWebsite = ({ id }) =>
  PUT(`/students/regenerateWebsite/${id}`);

//student communication
export const addStudentCommunication = data =>
  POST(`/communication/subscriptionStatus/contacts`, data);
export const getStudentCommunication = data => {
  return GET(`/communication/commsPreference?studentId=${data.studentId}`);
};

const screenShot = {
  SCREENSHOT_START_ADD: screenShotStart,
  SCREENSHOT_END_UPDATE: screenShotEnd,
  RECORDING_ADD: recordingAdd,
  RECORDING_UPDATE: recordingEdit,
  RECORDING_BOOKING_LIST: recordingList,
  RETRY_SESSION_RECORDING_ADD: api__retryTwilioSessionRecording
};
const courseVersionsApiMap = {
  COURSE_VERSION_COUNTRY_LIST: getCourseVersionForCountry,
  COURSE_VERSION_LIST: getCourseVersions,
  COURSE_VERSION_ADD: createCourseVersion,
  COURSE_VERSION_UPDATE: updateCourseVersionInfo,
  BULK_CLASSES_ADD: AddBulkClasses,
  CLASS_VERSION_LIST: getClassFromVersion,
  CLASS_VERSION_UPDATE: updateClassVersionInfo,
  CLASS_VERSION_ADD: createClassVersionInfo,
  COURSE_BASE_VERSION_ADD: createCourseBaseVersion,
  CLASS_VERSION_DELETE: removeCourseVersionInfo,
  COURSE_VERSION_FOR_POPUP_LIST: getCourseVersions,
  CLASS_VERSION_FOR_POPUP_LIST: getClassFromVersion,
  SYNC_STUDENT_BOOKING_LIST: getSyncStudentBooking,
  ELLIGIBLE_COURSE_VERSION_LIST: getAllEligibleVersions
};

const feedbackTriggersForCourseApiMap = {
  FEEDBACK_TRIGGERS_FOR_COURSE_LIST: getAllFeedbackTriggersForCourse,
  FEEDBACK_TRIGGERS_FOR_COURSE_DELETE: deleteFeedbackTriggersForCourse,
  FEEDBACK_TRIGGERS_FOR_COURSE_ADD: addFeedbackTriggersForCourse
};

const postSubmissionForCourseApiMap = {
  POST_SUBMISSIONS_FOR_COURSE_LIST: getAllPostSubmissions,
  POST_SUBMISSIONS_FOR_COURSE_UPDATE: updatePostSubmissionsForCourse,
  POST_SUBMISSIONS_FOR_COURSE_ADD: addPostSubmissionForCourse
};

// Feedback GET
const getFeedbackQuestions = ({ courseType = "", questionType = "" }) =>
  GET(
    `/feedback/feedbackQuestion?courseType=${courseType}&questionType=${questionType}`
  );

const getFeedbackQuestionDetailsById = ({ id }) =>
  GET(`/feedback/feedbackQuestionDetails/${id}`);

const getFeedbackQuestionOptions = () =>
  GET(`/feedback/feedbackQuestionOption`);
const getFeedbackTrigger = () => GET(`/feedback/feedbackTrigger`);

// Mindset POST
const createMindset = data => {
  return POST("/feedback/createMindset", data);
};

// Mindset POST
const updateMindset = data => {
  return POST("/feedback/updateMindset", data);
};

// Mindsets GET
const getMindsets = ({ courseType = "", questionType = "" }) =>
  GET(
    `/feedback/getAllMindsets?courseType=${courseType}&questionType=${questionType}`
  );

const mindsetApiMap = {
  MINDSET_ADD: createMindset,
  MINDSET_UPDATE: updateMindset,
  MINDSET_LIST: getMindsets
};

// Feedback POST
const createFeedbackQuestions = ({
  name,
  questionType,
  questionText,
  courseType,
  placeHolderText,
  helperText,
  questionInputType,
  isMandatory
}) => {
  if (courseType === "B2B_CODING") {
    return POST(`/feedback/feedbackQuestion`, {
      name,
      questionType,
      questionText,
      courseType,
      placeHolderText,
      helperText,
      questionInputType,
      isMandatory
    });
  }
  return POST(`/feedback/feedbackQuestion`, {
    name,
    questionType,
    questionText,
    courseType,
    placeHolderText,
    helperText
  });
};
const createFeedbackQuestionOptions = ({
  feedbackQuestionId,
  optionText,
  optionInt,
  optionScore,
  courseType,
  questionType
}) => {
  if (courseType === "B2B_CODING" && questionType === "live_report_card") {
    return POST(`/feedback/feedbackQuestionOption`, {
      feedbackQuestionId,
      optionText,
      optionInt,
      optionScore
    });
  }
  return POST(`/feedback/feedbackQuestionOption`, {
    feedbackQuestionId,
    optionText,
    optionInt
  });
};
const createFeedbackTrigger = ({
  feedbackQuestionId,
  entityType,
  entityId,
  questionSequenceNo,
  courseType
}) => {
  if (courseType === "B2B_CODING") {
    return POST(`/feedback/feedbackTrigger`, {
      feedbackQuestionId,
      entityType,
      questionSequenceNo,
      courseType
    });
  }
  return POST(`/feedback/feedbackTrigger`, {
    feedbackQuestionId,
    entityType,
    entityId,
    questionSequenceNo
  });
};

const getCommunityEvents = () => GET(`/community/event`);
const getEventContest = events => {
  return GET(`/community/event/${events.id}/contests`);
};
const getDailyContest = id => {
  return GET(`/community/contest/${id}/dailyContests`);
};
const createDailyContest = data => POST(`/community/dailyContest`, data);
const updateDailyContest = data => PUT(`/community/dailyContest`, data);
const createEvents = data => POST(`/community/event`, data);
const updateEvents = data => PUT(`/community/event`, data);
const createContest = data => POST(`/community/contest`, data);
const updateContest = data => PUT(`/community/contest`, data);
const getCommunityChallenges = () =>
  GET(`community/challenge?pageNo=1&pageSize=1000`);
const createChallenges = data => POST(`community/challenge`, data);
const updateChallenges = data => PUT(`community/challenge`, data);
const addChallenges = data => PUT(`community/dailyContest/challenges`, data);
const getUnmarkedSubmission = ({ contestId, id }) => {
  return GET(
    `community/userChallengeSubmissionLog/unmarked?contestId=${contestId}&challengeId=${id}`
  );
};
const getAllSubmission = ({ contestId, id }) =>
  GET(
    `community/userChallengeSubmissionLog?contestId=${contestId}&challengeId=${id}`
  );
const markSubmission = data =>
  POST(`community/userChallengeSubmissionLog/mark`, data);
// Feedback PUT
const updateFeedbackQuestions = ({
  id,
  name,
  questionType,
  courseType,
  placeHolderText,
  helperText,
  questionText,
  recordStatus,
  questionInputType,
  isMandatory
}) => {
  if (courseType === "B2B_CODING") {
    return PUT(`/feedback/feedbackQuestion`, {
      id,
      name,
      questionType,
      courseType,
      placeHolderText,
      helperText,
      questionText,
      recordStatus,
      questionInputType,
      isMandatory
    });
  }
  return PUT(`/feedback/feedbackQuestion`, {
    id,
    name,
    questionType,
    courseType,
    placeHolderText,
    helperText,
    questionText,
    recordStatus
  });
};

const updateFeedbackQuestionOptions = ({
  id,
  feedbackQuestionId,
  optionText,
  optionInt,
  recordStatus,
  optionScore,
  courseType,
  questionType
}) => {
  if (courseType === "B2B_CODING" && questionType === "live_report_card") {
    return PUT(`/feedback/feedbackQuestionOption`, {
      id,
      feedbackQuestionId,
      optionText,
      optionInt,
      recordStatus,
      optionScore
    });
  }
  return PUT(`/feedback/feedbackQuestionOption`, {
    id,
    feedbackQuestionId,
    optionText,
    optionInt,
    recordStatus
  });
};
const updateFeedbackTrigger = ({
  id,
  feedbackQuestionId,
  entityType,
  entityId,
  questionSequenceNo,
  recordStatus,
  courseType
}) => {
  if (courseType === "B2B_CODING") {
    return PUT(`/feedback/feedbackTrigger`, {
      id,
      feedbackQuestionId,
      entityType,
      courseType,
      questionSequenceNo,
      recordStatus
    });
  }
  return PUT(`/feedback/feedbackTrigger`, {
    id,
    feedbackQuestionId,
    entityType,
    entityId,
    questionSequenceNo,
    recordStatus
  });
};
const getEmiCalculator = ({ preferredGateway, amount }) =>
  GET(`/orders/emiCalculator/${preferredGateway}`, {
    amount
  });
const getLeadForRm = () => GET(`/teachers/getLeads`);
const teacherSlotSync = ({ startTime, endTime, teacherId }) =>
  POST(
    `/slots/teachers/${teacherId}/syncSlot?startTime=${startTime}&endTime=${endTime}`
  );

const bookBatch = data =>
  POST(`/batch/bookBatchFromOps?courseType=${data.courseType}`, data);
const getAllBatch = data => GET(`/batch/getAllBatch`, data);
const getStudentWithNoBatch = data => GET(`/students/paid/noBatch`, data);
const editBatch = data => POST(`/batch/editBatch`, data);
const dstFixForBatch = data =>
  POST(`/batch/fixDSTTimeForBatch?classBatchId=${data.classBatchId}`);
const getActiveTeacherListForBatch = ({ courseItemId, languageId }) =>
  GET(
    `/batch/getTeacherListHavingBatch?courseItemId=${courseItemId}&languageId=${languageId}`
  );
const getRecommendedBatchListForBatch = data =>
  POST(`/batch/getRecommendedBatches`, data);
const getAllEligibleBatchTeachers = (
  courseItemId,
  countryCode,
  courseVersionId
) =>
  GET(
    `/batch/getAllEligibleBatchTeachers?courseItemId=${courseItemId}&countryCode=${countryCode}&courseVersionId=${courseVersionId}`
  );
const getAffiliateByChannel = data =>
  POST(`/third_party_affiliate/getAllByParams`, data);
const getActiveTeacherListForStudent = data =>
  GET(
    `/batch/getAllEligibleBatchTeachers?studentId=${data.studentId}&courseType=${data.courseType}&batchScheduleType=${data.classPerWeek}`
  );
const getAllBatchForStudent = data => POST(`/batch/getBatchSlotsForOps`, data);

const getRecommendedBatchForStudent = data =>
  POST(`/batch/getStudentRecommendedBatches`, data);

const cancelBatchForStudent = ({
  studentId,
  classBatchId,
  reasonDesc,
  reasonCode
}) =>
  POST(`/batch/cancelBatchForStudent`, {
    studentId,
    classBatchId,
    reasonDesc,
    reasonCode
  });
const getStudentCurrentBatch = ({ studentId, adminIncludeTeacher }) =>
  GET(`/batch/getOpsStudentCurrentBatch?studentId=${studentId}`, {
    adminIncludeTeacher
  });

const getB2BStudentCurrentBatch = ({ studentId, adminIncludeTeacher }) =>
  GET(`/b2b/batch/getOpsStudentCurrentBatch?studentId=${studentId}`, {
    adminIncludeTeacher
  });

const getTeacherAllBatch = ({ teacherId }) =>
  GET(`/batch/getAllActiveTeacherBatch?teacherId=${teacherId}`);
const getCourseClasses = ({ courseItemId }) =>
  GET(`/courseVersion/getLatestClasses/${courseItemId}`);
export const sitelLeadPush = data =>
  POST(`/sql-job-entity/createSitelLead`, data);
export const slotBookingLeadPush = data =>
  POST(`/sql-job-entity/generateSlotBookingLeads`, data);
export const slotBookingLeadBulkUpload = formData =>
  POST(`/proactiveCall/slotBooking/uploadBulkSlotBooking`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
export const slotBookingLeadRedshift = (
  data // In use for Slot Booking Music, Music For All, Math, Art
) =>
  POST(`/proactiveCall/slotBooking/generateSlotBookingLeadsByLeadType`, data);
// export const slotBookingLeadPushByType = data =>
//   POST(`/sql-job-entity/generateSlotBookingLeadsByLeadType`, data);
// export const slotBookingLeadPushMusic = data =>
//   POST(`/sql-job-entity/generateSlotBookingForMusic`, data);
// export const slotBookingLeadPushMusicForAll = data =>
//   POST(`/sql-job-entity/generateSlotBookingForMusicForAll`, data);
// export const slotBookingLeadPushArt = data =>
//   POST(`/sql-job-entity/generateSlotBookingForArt`, data);
export const slotBookingLeadPushBFS = data =>
  POST(`/sql-job-entity/generateSlotBookingLeadsBFS`, data);
export const slotBookingLeadPushNoLaptop = data =>
  POST(`/sql-job-entity/generateSlotBookingLeadsNoLaptop`, data);
export const slotBookingNRLeadPush = data =>
  POST(`/sql-job-entity/generateNRSlotBookingLeads`, data);
export const slotBookingReChurnLeadPush = data =>
  POST(`/sql-job-entity/generateSlotBookingLeadsOfDisposedTasks`, data);
export const bulkReassignTask = data =>
  POST(`/task/reAssignUndisposedTasks`, data);
export const addTeacherResign = ({
  teacherId,
  lastDate,
  separationType,
  sperationReason,
  sperationSubReason
}) =>
  POST(`/teachers/${teacherId}/updateLastDateOfTeacher`, {
    lastDate,
    separationType,
    sperationReason,
    sperationSubReason
  });
export const revokeTeacherResign = ({ teacherId }) =>
  POST(`/teachers/${teacherId}/revokeTeacherResign`, {});

export const getBookingsForCoverUp = ({ studentId, bookingId }) =>
  GET(`/bookings/students/${studentId}/coverup`, { bookingId });

export const coverUpClassBooking = data =>
  POST("/bookings/addCoverUpBooking", data);

export const getReccuringSlotSchedule = ({ studentId, payload }) =>
  GET(`/bookings/students/${studentId}/getRecurringSchedule`, payload);

export const getRecurringSlotsForOps = ({ studentId, payload }) =>
  GET(`/slots/students/${studentId}/getAllPossibleSlotsForOps`, payload);

export const getRecurringSlotTime = ({ studentId, payload }) =>
  GET(`/slots/students/${studentId}/getRecurringSlotTime`, payload);

export const getRecommendedRecurringFreeSlot = ({ studentId, payload }) =>
  POST(
    `/slots/students/${studentId}/getRecommendedRecurringFreeSlots`,
    payload
  );
export const addRecurringSchedules = ({ studentId, payload }) =>
  POST(`/bookings/students/${studentId}/addRecurringSchedules`, payload);

export const getRecurringAuditForOps = ({ courseId }) =>
  GET(`/audit/recurringSchedule/${courseId}`);

export const fetchRecurringSchedule = ({ studentId, payload }) =>
  GET(`/bookings/students/${studentId}/getBookingScheduleConfig`, payload);

export const fetchInstantTrial = ({
  studentId,
  studentGrade,
  studentCountryCode,
  payload
}) =>
  GET(
    `/trial/slots/public/getConnectNowInfo?courseSubType=BMC_AC&grade=${studentGrade}&countryCode=${studentCountryCode}&studentId=${studentId}`,
    payload
  );

export const fetchTodIdsInfo = ({ studentId, payload }) =>
  GET(`/doubt/student/${studentId}/getConfig?courseType=MATH`, payload);

export const postTodIdsInfo = ({ studentId, payload }) =>
  POST(`/doubt/student/${studentId}/updateConfig?courseType=MATH`, payload);

export const getAvailableTeacherList = ({ studentId, payload }) =>
  GET(
    `/students/${studentId}/getSubstituteTeacherForOneTimeScheduler`,
    payload
  );

export const getEntityAudit = ({ entityId, entityName }) =>
  GET(`/audit/${entityName}/${entityId}`);

const createWebinar = data => POST(`/webinar/createWebinar`, data);
const updateWebinar = data => POST(`/webinar/updateWebinar`, data);
const getWebinars = () => GET(`/webinar/getAllWebinar`);
const getWebinarById = id => GET(`/webinar/getWebinarById`, { id });
const deleteWebinar = data => POST(`/webinar/removeWebinar`, data);
const createWebinarSchedule = data =>
  POST(`/webinar/createWebinarSchedule`, data);
const removeWebinarSchedule = data =>
  POST(`/webinar/removeWebinarSchedule`, data);
const createWebinarTeacher = data =>
  POST(`/webinar/createWebinarTeacher`, data);
const removeWebinarTeacher = data =>
  POST(`/webinar/removeWebinarTeacher`, data);
const getByBookingsForWebinar = ({ id }) =>
  GET(`/webinar/getWebinarBookingsById`, { id });
const scheduleFutureWebinar = data => POST(`/webinar/scheduleWebinar`, data);
const specialClassForBatch = data =>
  POST(`/bookings/students/addSpecialClass`, data);
const specialClassForB2BBatch = data =>
  POST(`/b2b/batch/students/addSpecialClass`, data);

const webinarApiMap = {
  COURSE_CLASS_LIST: getCourseClasses,
  WEBINAR_ADD: createWebinar,
  WEBINAR_UPDATE: updateWebinar,
  WEBINAR_ITEM_LIST: getWebinarById,
  WEBINAR_SCHEDULE_ADD: createWebinarSchedule,
  WEBINAR_SCHEDULE_DELETE: removeWebinarSchedule,
  WEBINAR_TEACHER_ADD: createWebinarTeacher,
  WEBINAR_TEACHER_DELETE: removeWebinarTeacher,
  WEBINAR_LIST: getWebinars,
  WEBINAR_DELETE: deleteWebinar,
  WEBINAR_FUTURE_SCHEDULE_ADD: scheduleFutureWebinar,
  WEBINAR_BOOKING_LIST: getByBookingsForWebinar
};
const recurringBatchBookings = data =>
  POST(`batch/addRecurringSlotForExistingBatch`, data);
const batchBookingAddClass = ({
  studentIds,
  teacherId,
  classBatchId,
  courseItemId,
  startTime
}) =>
  POST(`/bookings/batch/addBooking`, {
    studentIds,
    teacherId,
    classBatchId,
    courseItemId,
    startTime
  });
const batchB2BBookingAddClass = ({
  studentIds,
  teacherId,
  classBatchId,
  courseItemId,
  startTime,
  endTime
}) =>
  POST(`/b2b/batch/addBooking`, {
    studentIds,
    teacherId,
    classBatchId,
    courseItemId,
    startTime,
    endTime
  });
const getTeacherRoles = ({ teacherId }) =>
  GET(`/mentorship/program/getTeacherOrgRoles/${teacherId}`);
const addTeacherToRole = data =>
  POST(`/mentorship/program/addTeacherToRole`, data);
const removeTeacherFromRole = data =>
  POST(`/mentorship/program/removeTeacherFromRole`, data);
const generateReferral = data =>
  POST(`/referral/admin/referralCodeGeneration`, data);

export const fetchTeacherLeave = data =>
  POST("whjrCare/emergencyLeave/searchTeachersOnEmergencyLeave", data);

export const getStudentUnifiedExp = data =>
  GET(`/unified_view/getUnifiedStudentExperienceData/${data.studentId}`);

export const getNpsSurveyFeedback = data =>
  GET(`/micro/metrics/nps/surveyFeedback/${data.studentId}`);

export const getUnifiedZendeskTask = data =>
  GET(`/unified_view/getPastZendeskTickets`, data);

export const getSVCZendeskTickets = data =>
  GET(`/call_log/management/getPastZendeskTickets`, data);

export const createBatchForAffiliate = data => POST(`/batch/createBatch`, data);
export const getNewBatchForAffilifate = data =>
  POST(`/batch/getNewBatchForAffiliate`, data);
export const getAllEligibleBatchTeacher = data =>
  GET(`/batch/getAllEligibleBatchTeachers`, data);
export const getAllBatchForAffiliate = data =>
  GET(`/batch/getAllBatchOfAffiliate`, data);

export const getAllBatchForB2BAffiliate = data =>
  GET(`/b2b/batch/getAllBatchOfAffiliate`, data);

export const bulkUploadBatchForAffiliate = formData =>
  POST(`/b2b/bulkCreateBatch`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
export const createAdditionalContent = data =>
  POST(`courses/createAdditionalContent`, data);

export const getAdditionalContentList = () =>
  GET(`courses/getAdditionalContentList`);

export const getAllAdditionalContent = ({
  courseId,
  courseItemId,
  courseClassId,
  activityType
}) =>
  GET(`courses/getAdditionalContentsForClass`, {
    courseId,
    courseClassId,
    courseItemId,
    activityType
  });

export const editAdditionalContent = ({
  id,
  name,
  description,
  courseClassId,
  contentLinkType,
  contentLink,
  imageLink,
  isActive,
  recordStatus
}) =>
  PUT(`courses/editAdditionalContent`, {
    id,
    name,
    description,
    courseClassId,
    contentLinkType,
    contentLink,
    imageLink,
    isActive,
    recordStatus
  });
export const getTrialBookedCountWithLanguage = ({
  startTime,
  studentId,
  courseId,
  countryCode,
  languageId,
  courseType
}) =>
  GET(`/trial/slots/getTrialBookedCountWithLanguage`, {
    startTime,
    courseId,
    countryCode,
    languageId,
    studentId,
    courseType
  });

export const createConceptGroup = data => {
  return POST(`concept/createConceptGroup`, data);
};

export const getAllConceptGroup = courseType => {
  return GET(
    `concept/getAllConceptGroups?subject=${(typeof courseType !== "object" &&
      courseType) ||
      ""}`
  );
};

export const getAllConcepts = id => {
  return GET(`concept/getChildConcepts/${id}`);
};

export const createConcept = data => {
  return POST(`concept/createConcept`, data);
};

export const activateDeactivateConcept = ({ id, status }) => {
  return POST(`concept/activateDeactivateConcept/${id}?isActive=${status}`);
};

export const updateConceptGroup = data => {
  return POST(`concept/updateConceptGroup/${data.id}`, data);
};

export const updateConcept = data => {
  return POST(`concept/updateConcept/${data.id}`, data);
};

export const searchConceptGroups = data => {
  return POST(`concept/searchConceptGroups`, data);
};

export const searchConcepts = data => {
  return GET(`concept/searchConcepts`, data);
};
export const dndSearch = data => {
  return POST(`communication/suppressionList/search`, data);
};
export const dndAdd = data => {
  return POST(`/communication/suppressionList`, data);
};
export const dndUpdate = data => {
  return PUT(`communication/suppressionList/${data.id}`, data);
};
export const deleteUpdate = data => {
  return POST(`/communication/suppressionList/${data.id}`, data);
};
export const getCallLog = ({ id, page = 0, payload = {} }) =>
  GET(`/call_log/${id}?page=${page}&pageSize=50`, payload);
export const addCallLog = data => POST(`/call_log`, data);
export const updateCallLog = data =>
  PUT(`/call_log/${data.callIntentId}/dispose`, data.callIntentUpdates);
export const getProfileNotes = entityId =>
  GET(`/call_log/profileNotes?entityId=${entityId}`);
export const createProfileNote = data => POST(`/call_log/profileNotes`, data);
export const addNewProfileNote = data =>
  PUT(`/call_log/profileNotes/${data._id}`, data.payload);
export const addNewCallNote = data =>
  PUT(`call_log/${data.id}/callNote`, data.payload);
export const copyQuiz = data => {
  return POST(`/quiz/copyQuiz`, data);
};
export const copyActivity = data => {
  return POST(`/courses/copyActivityListFromOneClassToAnother`, data);
};
export const addShowAndTellActivity = data => {
  return POST(`showTell/showAndTell`, data);
};

export const updateShowAndTellActivity = data => {
  return PUT(`showTell/showAndTell`, data);
};
export const checkExistingUser = data => {
  return POST(`userDetail/existByEmailOrMobile`, { ...data });
};

const b2bBulkUpload = formData => {
  let affiliateId = formData.get("AFFILIATE_ID");
  return POST(`/b2b/bulk_upload_student`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    params: {
      affiliateId
    }
  });
};

export const addAfStudent = function({ affiliateId, data }) {
  return POST(`/b2b/registerStudent`, data, { params: affiliateId });
};

export const searchB2BTeachers = function(data) {
  return GET(`/b2b/searchB2BTeachers`, data);
};

export const getAllTeachersForAffiliateB2B = affiliateId =>
  GET(`/b2b/batch/getAllEligibleAffiliateTeachers?affiliateId=${affiliateId}`);

export const getB2BTeachersByFilter = data =>
  GET(`/b2b/batch/getAllAffiliateTeachersBySkills`, data);

export const associateAffiliateTeacher = function({ affiliateId, teacherId }) {
  return POST("/b2b/associateTeacher", {
    affiliateId,
    teacherId
  });
};

export const updateStudentExtraData = function({
  studentCourse,
  studentPreference
}) {
  return PUT(`/students/updateStudentCoursePreference`, {
    data: {
      studentPreference,
      studentCourse
    }
  });
};

export const associateAffiliateTeacherDelete = function({
  affiliateId,
  teacherId
}) {
  return DELETE(`/b2b/${affiliateId}/teachers/${teacherId}`);
};

export const b2BBatchForAffiliate = data => POST(`b2b/batch/createBatch`, data);

export const b2bBatchTimeChange = data =>
  POST(`b2b/batch/changeBatchTime`, data);

export const b2bTeacherReassignment = data =>
  POST(`b2b/batch/batchReassignement`, data);

export const getAllBatchForAffiliateB2BTeacher = (teacherId, affiliateId) =>
  GET(`/b2b/batch/getAllActiveTeacherBatch`, teacherId, affiliateId);

export const createB2bBulkEnrollByGrades = ({ classBatchId, data }) =>
  POST(`/b2b/batch/bulkEnrollByGrade`, data, { params: { classBatchId } });

// Class summary apis
export const getClassSummary = ({ course_id, class_id, langCode }) =>
  GET(`notification-class-summary/getAllClassSummary`, {
    course_id,
    class_id,
    langCode
  });

export const getClassSummaryTestMail = data => {
  return POST(`notification-class-summary/testClassSummary`, data);
};

export const firebaseAuthentication = uid => {
  return POST(`firebaseAuth/firebase-token`, { uid });
};

export const addClassSummary = ({
  course_id,
  class_id,
  template_type,
  langCode,
  subject_cs,
  image_cs,
  topic_cs,
  learning_cs,
  outcome_cs,
  nextclass_cs
}) =>
  POST(`notification-class-summary/createClassSummary`, {
    course_id,
    class_id,
    template_type,
    langCode,
    subject_cs,
    image_cs,
    topic_cs,
    learning_cs,
    outcome_cs,
    nextclass_cs
  });

export const updateClassSummary = ({
  id,
  course_id,
  class_id,
  template_type,
  langCode,
  subject_cs,
  topic_cs,
  learning_cs,
  outcome_cs,
  nextclass_cs,
  image_cs
}) =>
  PUT(`notification-class-summary/updateClassSummary`, {
    id,
    course_id,
    class_id,
    template_type,
    langCode,
    subject_cs,
    topic_cs,
    learning_cs,
    outcome_cs,
    nextclass_cs,
    image_cs
  });
export const deleteClassSummary = ({ id }) =>
  DELETE(`notification-class-summary/${id}`);

export const getAllBatchTasksForB2BTracker = data =>
  GET(`/b2b/tasks/getAllBatchTasks`, data);

export const restartTaskForB2BTracker = data =>
  POST(`/b2b/tasks/${data.id}/restart`, data);

export const addTaskForB2BTracker = data => POST(`/b2b/tasks/create`, data);

export const getAllBatchSubtasksForB2BTracker = data =>
  GET(`/b2b/subtasks/getAllBatchSubtasks`, data);

export const restartSubtaskForB2BTracker = data =>
  POST(`/b2b/subtasks/${data.id}/restart`, data);

// export const addSubtaskForB2BTracker = data => POST(`/b2b/tasks/create`, data);
export const getAllTaskDefSearchParams = data =>
  GET(`/b2b/taskDef/getAllTaskDefSearchParams`, data);

export const getShowAndTellActivities = ({
  courseId,
  courseItemId,
  courseClassId,
  activityType
}) =>
  GET(`showTell/showAndTell`, {
    courseId,
    courseClassId,
    courseItemId,
    activityType
  });

export const getAllShowAndTellActivities = () => GET(`showTell/showAndTell`);

export const deleteShowAndTellActivity = id =>
  DELETE(`showTell/showAndTell/${id}`);

export const bulkValidateStudentForDuplicateRecords = formData => {
  let affiliateId = formData.get("AFFILIATE_ID");
  return POST(`/b2b/bulkValidateStudentForDuplicateRecords`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    params: {
      affiliateId
    }
  });
};

export const getTaskWiseErrorData = data =>
  GET(`/b2b/subtasks/errorDataForTask`, data);

export const generateReportForTask = data =>
  GET(`/b2b/subtasks/generateReportForTask`, data);

export const getB2BChainTasksList = id =>
  GET(`b2b/tasks/getChainedTask?taskId=${id}`);

export const updateDeliveryChannel = data =>
  POST(`/bookings/students/${data.studentId}/changeDeliveryChannel`, data);

export const getAllAB_ab = (data = "") =>
  APICALL("GET")(
    `abTest/config${data && typeof data === "string" ? "/" + data : ""}`,
    {}
  );
export const updateTraffic_ab = ({
  abID = "",
  type = "traffic",
  abData = {}
}) =>
  APICALL("PUT")(
    `abTest/${
      type === "traffic" ? "updateTrafficPercentage" : "addVariants"
    }/${abID}`,
    abData
  );
export const stopResume_ab = ({ abID = "", type = "resume", abData = {} }) =>
  APICALL("POST")(`abTest/${abID}/${type}`, abData);
export const createNew_ab = (data = {}) =>
  APICALL("POST")(`abTest/config`, data);

export const getStudentCourseModule = ({ id, data }) =>
  GET(`/student_course_module/getInfo/${id}`, data);

export const createStudentCourseModule = data =>
  POST(`/student_course_module/create}`, data);

export const updateStudentCourseModule = ({ id, data }) =>
  POST(`/student_course_module/updateStudentCourseModule/${id}`, data);

export const getCourseModuleClassMappings = data =>
  GET(`/course_module/getCourseModuleClassMappings`, data);

export const getCourseModule = data => GET(`/course_module/getModule`, data);

export const createModuleCourseMapping = data =>
  POST(`/course_module/createModuleCourseMapping`, data);

export const deleteModule = data =>
  PUT(`/course_module/deleteModule?id=${data}`);

export const activateModule = data =>
  PUT(`/course_module/activateModule?id=${data}`);

export const updateModule = ({ id, data }) =>
  PUT(`/course_module/updateModule?id=${id}`, data);

export const createModuleClassMapping = data =>
  POST(`/course_module/createModuleClassMapping`, data);

export const updateModuleClassMapping = ({ id, data }) =>
  PUT(`/course_module/updateModuleClassMapping?id=${id}`, data);

export const deleteModuleClassMapping = id =>
  DELETE(`/course_module/moduleClassMapping/${id}`);

export const getModuleAllClassMappings = data =>
  GET(`/course_module/getAllClassMapping`, data);

export const createLearningJourney = data =>
  POST(`/learning_journey/create`, data);

export const updateLearningJourney = ({ id, data }) =>
  POST(`/learning_journey/updateLearningJourney/${id}`, data);

export const getLearningJourney = id => GET(`/learning_journey/getInfo/${id}`);

export const getAllLearningJourney = id =>
  GET(`/learning_journey/getAll/${id}`);

export const getLearningJourneySequence = data =>
  GET(`/learning_journey/getModuleInfo`, data);
export const addLearningJourneySequence = data =>
  POST(`/learning_journey/learningJourneySequence/create`, data);

export const updateLearningJourneySequence = ({ id, data }) =>
  POST(`/learning_journey/updateLearningJourneySequence/${id}`, data);

export const updateLearningJourneySequenceBulk = data =>
  POST(`/learning_journey/updateLearningJourneySequenceBulk`, data);

export const updateStudentModuleSequenceBulk = data =>
  POST(`/students/updateStudentCourseModuleBulk`, data);

export const deleteLearningJourneySequence = id =>
  POST(`/learning_journey/deleteLearningJourneySequence/${id}`);

export const getAllStudentModuleDetails = id =>
  GET(`/students/${id}/getAllModuleDetails`);

export const getClassCountPerModule = (learningJourneyId, sequenceNo = 2) =>
  GET(`learning_journey/getClassCountPerModule/${learningJourneyId}`, {
    sequenceNo
  });

export const activateStudentLearningJourney = data =>
  PUT(`/admin/studentJourneyActivate`, data);
export const deactivateStudentLearningJourney = data =>
  PUT(`/admin/studentJourneyDeActivate`, data);

export const updateStudentJourneyModule = data =>
  POST(`/students/${data.studentCourseModuleId}/changeModuleCourse`, data);

export const getAllStudentModuleClasses = data =>
  GET(`/students/getAllFilterClasses`, data);

export const deleteStudentModule = id =>
  DELETE(`/students/studentCourseModule/${id}`);

export const addStudentModule = data => POST(`/students/create`, data);

export const refreshCourseVersion = data =>
  POST("courseVersion/refreshClassNumber", data);

export const auditLogForStudentModule = studentId =>
  GET(`students/${studentId}/auditLogForStudentModule`);

export const auditLogForModuleClassMapping = moduleId =>
  GET(`course_module/${moduleId}/auditLogForModuleClassMapping`);

export const rescheduleClassBooking = data =>
  POST(`bookings/students/${data.studentId}/rescheduleSlot`, data);
const studentLearningJourney = {
  GET_STUDENT_COURSE_MODULE_LIST: getStudentCourseModule,
  CREATE_STUDENT_COURSE_MODULE_CREATE: createStudentCourseModule,
  UPDATE_STUDENT_COURSE_MODULE_UPDATE: updateStudentCourseModule,
  COURSE_MODULE_MAPPING_LIST: getCourseModuleClassMappings,
  COURSE_MODULE_MAPPING_POPUP_LIST: getCourseModuleClassMappings,
  GET_MODULE_LIST: getCourseModule,
  COURSE_MODULE_MAPPING_ADD: createModuleCourseMapping,
  DELETE_MODULE_DELETE: deleteModule,
  ACTIVATE_MODULE_UPDATE: activateModule,
  UPDATE_MODULE_UPDATE: updateModule,
  MODULE_CLASS_MAPPING_ADD: createModuleClassMapping,
  MODULE_CLASS_MAPPING_UPDATE: updateModuleClassMapping,
  MODULE_CLASS_MAPPING_DELETE: deleteModuleClassMapping,
  CREATE_LEARNING_JOURNEY_ADD: createLearningJourney,
  MODULE_CLASS_MAPPING_LIST: getModuleAllClassMappings,
  GET_LEARNING_JOURNEY_LIST: getLearningJourney,
  GET_ALL_LEARNING_JOURNEY_LIST: getAllLearningJourney,
  GET_ALL_LEARNING_JOURNEY_POPUP_LIST: getAllLearningJourney,
  UPDATE_LEARNING_JOURNEY_UPDATE: updateLearningJourney,
  LEARNING_JOURNEY_SEQUENCE_LIST: getLearningJourneySequence,
  LEARNING_JOURNEY_SEQUENCE_ADD: addLearningJourneySequence,
  LEARNING_JOURNEY_SEQUENCE_DELETE: deleteLearningJourneySequence,
  LEARNING_JOURNEY_SEQUENCE_UPDATE: updateLearningJourneySequence,
  LEARNING_JOURNEY_SEQUENCE_BULK_UPDATE: updateLearningJourneySequenceBulk,
  STUDENT_MODULE_SEQUENCE_BULK_UPDATE: updateStudentModuleSequenceBulk,
  STUDENT_MODULE_LIST: getAllStudentModuleDetails,
  NO_OF_CLASSES_IN_LEARNING_JOURNEY_LIST: getClassCountPerModule,
  STUDENT_LEARNING_JOURNEY_ADD: activateStudentLearningJourney,
  STUDENT_LEARNING_JOURNEY_DELETE: deactivateStudentLearningJourney,
  STUDENT_MODULE_UPDATE: updateStudentJourneyModule,
  MODULE_VERSION_CLASS_LIST: getAllStudentModuleClasses,
  MODULE_VERSION_CLASS_PREVIEW_LIST: getAllStudentModuleClasses,
  MODULE_CLASS_PREVIEW_LIST: getAllStudentModuleClasses,
  STUDENT_MODULE_DELETE: deleteStudentModule,
  STUDENT_MODULE_ADD: addStudentModule,
  REFRESH_COURSE_VERSION_LIST: refreshCourseVersion,
  AUDIT_LOG_STUDENT_MODULE_LIST: auditLogForStudentModule,
  AUDIT_LOG_MODULE_CLASS_LIST: auditLogForModuleClassMapping,
  STUDENT_SLOT_RESCHEDULE_UPDATE: rescheduleClassBooking
};

const taskTrackerApiMap = {
  SEARCH_B2BTASKS_LIST: getAllBatchTasksForB2BTracker,
  SEARCH_B2BTASKS_UPDATE: restartTaskForB2BTracker,
  SEARCH_B2BTASKS_ADD: addTaskForB2BTracker,
  SEARCH_B2BSUBTASKS_LIST: getAllBatchSubtasksForB2BTracker,
  SEARCH_B2BSUBTASKS_UPDATE: restartSubtaskForB2BTracker,
  B2BTASKDEF_LIST: getAllTaskDefSearchParams,
  B2B_SUBTASKS_ERROR_DATA_LIST: getTaskWiseErrorData,
  B2B_GENERATE_TASK_REPORT_LIST: generateReportForTask,
  B2B_CHAIN_TASKS_LIST: getB2BChainTasksList
};

const dndSuppressionApiMap = {
  SUPPRESSION_ADD: dndAdd,
  SUPPRESSION_UPDATE: dndUpdate,
  SUPPRESSION_LIST: dndSearch,
  SUPPRESSION_DELETE: deleteUpdate
};
const extraLearningContentApiMap = {
  ADDITIONAL_CONTENT_ADD: createAdditionalContent,
  ADDITIONAL_CONTENT_LIST: getAllAdditionalContent,
  ADDITIONAL_CONTENT_UPDATE: editAdditionalContent
};

const conceptApiMap = {
  CONCEPT_GROUP_ADD: createConceptGroup,
  ALL_CONCEPT_GROUPS_LIST: getAllConceptGroup,
  ALL_CONCEPTS_LIST: getAllConcepts,
  CONCEPT_ADD: createConcept,
  CONCEPT_ACTIVATE_DEACTIVATE_UPDATE: activateDeactivateConcept,
  CONCEPT_GROUP_UPDATE: updateConceptGroup,
  CONCEPT_UPDATE: updateConcept,
  ALL_CONCEPT_GROUP_LIST: searchConceptGroups,
  ALL_CONCEPT_LIST: searchConcepts
};

const teacherRoleApiMap = {
  TEACHER_ROLE_LIST: getTeacherRoles,
  TEACHER_ROLE_ADD: addTeacherToRole,
  TEACHER_ROLE_DELETE: removeTeacherFromRole
};

const feedbackApiMap = {
  FEEDBACK_QUESTIONS_LIST: getFeedbackQuestions,
  FEEDBACK_QUESTION_DETAILS_LIST: getFeedbackQuestionDetailsById,
  FEEDBACK_QUESTION_OPTIONS_LIST: getFeedbackQuestionOptions,
  FEEDBACK_TRIGGER_LIST: getFeedbackTrigger,
  FEEDBACK_QUESTIONS_ADD: createFeedbackQuestions,
  FEEDBACK_QUESTION_OPTIONS_ADD: createFeedbackQuestionOptions,
  FEEDBACK_TRIGGER_ADD: createFeedbackTrigger,
  FEEDBACK_QUESTIONS_UPDATE: updateFeedbackQuestions,
  FEEDBACK_QUESTION_OPTIONS_UPDATE: updateFeedbackQuestionOptions,
  FEEDBACK_TRIGGER_UPDATE: updateFeedbackTrigger
};

const emiCalulatorApi = {
  EMI_CAL_LIST: getEmiCalculator
};

const callApiMap = {
  CALL_LIST: callConnect
};

const teacherBookingInfoApiMap = {
  TEACHER_BOOKING_INFO_LIST: getTeacherAllBookingInfo
};

const dispositionApiMap = {
  SUB_TASK_TYPE_LIST: getAllSubTaskType,
  TASK_LIST: getAllTasks,
  TASK_ROSTER_LIST: getAllTaskRoster,
  TASK_ROSTER_ADD: taskRosterCreate,
  TASK_ROSTER_UPDATE: taskRosterUpdate,
  TASK_ROSTER_DELETE: taskRosterDelete,
  TASK_AGENT_UPDATE: taskAgentUpdate,
  TASK_TYPE_LIST: getAllTasksType,
  RESOLUTION_LIST: getAllResolution,
  DISPOSITION_LIST: getAllDisposition,
  DISPOSITION_WITH_CALLBACK_LIST: getAllDispositionWithCallType,
  FILTERED_RESOLUTION_LIST: getFilteredResolution,
  SUBDISPOSITION_LIST: getAllSubDisposition,
  PAYMENTS_PAYU_LIST: getAllPayments,
  PAYMENTS_STRIPE_LIST: getAllPayments,
  PAYMENTS_RAZORPAY_LIST: getAllPayments
};

const callFrameworkAPIMap = {
  CALL_CAMPAIGN_LIST: getCallCampaignList,
  CALL_CAMPAIGN_UPDATE: updateCampaign,
  CALL_INTENT_LIST: getCallIntentList,
  CALL_INTENT_ADD: createCallIntent,
  CALL_INTENT_UPDATE: updateCallIntent,
  CALL_INTENT_DELETE: deleteCallIntent,
  CALL_PLATFORM_LIST: getCallPlatformList,
  CALL_PLATFORM_UPDATE: updatePlatform,
  CALL_DISPOSITION_EFFECT_LIST: getDispositionEffectList,
  CALL_DISPOSITION_EFFECT_UPDATE: updateDispositionEffect,
  DISPOSITIONCF_LIST: getAllDispositionCF,
  DISPOSITIONCF_ADD: createDispositionCF,
  DISPOSITIONCF_UPDATE: updateDispositionCF,
  DISPOSITIONCF_DELETE: deleteDispositionCF,
  SUBDISPOSITIONCF_LIST: getAllSubDispositionCF,
  SUBDISPOSITIONCF_ADD: createSubDispositionCF,
  SUBDISPOSITIONCF_UPDATE: updateSubDispositionCF,
  SUBDISPOSITIONCF_DELETE: deleteSubDispositionCF,
  DISPOSITION_MAPPING_LIST: getDispositionMapping,
  DISPOSITION_MAPPING_ADD: createDispositionMapping,
  DISPOSITION_MAPPING_UPDATE: updateDispositionMapping,
  DISPOSITION_MAPPING_DELETE: deleteDispositionMapping,
  DISPOSITION_GROUP_LIST: getDispositionGroupList,
  CALL_RECOMMENDATION_LIST: getCallRecommendationList
};

const sessionApiMap = {
  CLASS_SESSION_LIST: getSession
};

const unSubscribeApiMap = {
  UNSUBSCRIBE_DETAILS_LIST: findUnsubscribeDetails,
  UNSUBSCRIBE_DETAILS_UPDATE: unsubscribeNotification
};

const taskApiMap = {
  TASK_LIST: getTask,
  TASK_UPDATE: updateTask,
  TASK_PAGINATED_UPDATE: updateTask,
  TASK_BASIS_AGENTID_LIST: updateTaskWithAgentID,
  TASK_STUDENT_UPDATE: updateStudentTask,
  TASK_PAGINATED_LIST: getAllTasksPaginated
};

const configApiMap = {
  CONFIG_SEARCH_LIST: getAllConfigs,
  CONFIG_SEARCH_EVENT_LIST: getAllConfigs,
  CONFIG_COURSE_CHANGE_SEARCH_LIST: getAllConfigs,
  SITEL_CONFIG_SEARCH_LIST: getAllConfigs,
  SPLIT_RULE_CONFIG_LIST: getAllConfigs,
  PAYMENTS_OPS_CONFIGS_LIST: getConfigsOpsCached,
  CONFIG_ADD: submitConfig,
  CONFIG_DELETE: deleteConfig,
  CONFIG_CACHE_DELETE: clearCache,
  CONFIG_NOTIFICATION_LIST: getNotificationCategories,
  CONFIG_SCHEMA_UPLOAD_LIST: configSchemaUpload,
  OPS_CONFIG_LIST: getConfigs,
  FEEDBACK_TRIGGER_ENTITY_TYPE_LIST: getFeedbackTriggersEntityTypeConfig,
  POST_SUBMISSIONS_CONFIG_TYPE_LIST: getPostSubmissionConfigTypes,
  FEEDBACK_QUESTIONS_TYPE_LIST: getAllFeedbackQuestionTypes,
  DISPOSITION_TYPE_LIST: getDispositionTypes,
  CONFIG_STRIKE_LIST: getAllConfigs,
  STUDENT_TYPE_LIST: getAllConfigs,
  CONFIG_CALL_TASK_MAPPING_LIST: getAllConfigs
};

const featureConfigApiMap = {
  FEATURE_CONFIG_ADD: submitFeatureConfig,
  FEATURE_CONFIG_LIST: getAllFeatureConfigs,
  FEATURE_CONFIG_UPDATE: updateFeatureConfig,
  FEATURE_CONFIG_DELETE: deleteFeatureConfig,
  FEATURE_CONFIG_STATUS_LIST: getFeatureConfigStatus,
  FEATURE_CONFIG_USERS_LIST: getAllFeatureConfigUsers,
  FEATURE_CONFIG_USERS_ADD: mapUserToFeature,
  FEATURE_CONFIG_USERS_DELETE: deleteUserToFeature
};

const messageApiMap = {
  MESSAGES_LIST: getAllMessages,
  MESSAGES_ADD: submitMessage
};

const languageApiMap = {
  LANGUAGE_LIST: getAllLanguages,
  LANGUAGE_ADD: addLanguages,
  LANGUAGE_DELETE: deleteLanguages,
  LANGUAGE_UPDATE: updateLanguages
};
const batchApiMap = {
  BATCH_LIST: getAllBatch,
  BATCH_UPDATE: editBatch,
  BATCH_DST_FIX_UPDATE: dstFixForBatch,
  BATCH_TEACHER_LIST: getActiveTeacherListForBatch,
  BATCH_RECOMMENDED_LIST: getRecommendedBatchListForBatch,
  BATCH_AFFILIATES_LIST: getAffiliateByChannel,
  ELIGIBLE_TEACHER_LIST: getAllEligibleBatchTeachers,
  CREATE_BATCH_AFFILIATE_ADD: createBatchForAffiliate,
  NEW_AFFILIATE_BATCH_LIST: getNewBatchForAffilifate,
  ELIGIBLE_BATCH_TEACHER_LIST: getAllEligibleBatchTeacher,
  GET_ALL_BATCH_FOR_B2B_AFFILIATE_LIST: getAllBatchForB2BAffiliate,
  GET_ALL_BATCH_FOR_AFFILIATE_LIST: getAllBatchForAffiliate,
  GET_ALL_BATCH_FOR_AFFILIATE_UPDATE: editBatch,
  STUDENT_WITH_NO_BATCH_LIST: getStudentWithNoBatch,
  BATCH_FOR_B2B_AFFILIATE_ADD: b2BBatchForAffiliate,
  ALL_BATCH_FOR_B2B_TEACHER_LIST: getAllBatchForAffiliateB2BTeacher,
  BULK_ENROLL_BY_GRADES_FOR_B2B_ADD: createB2bBulkEnrollByGrades,
  BULK_BATCH_UPLOAD_FOR_B2B_ADD: bulkUploadBatchForAffiliate,
  B2B_BATCH_TIME_CHANGE_ADD: b2bBatchTimeChange,
  B2B_TEACHER_REASSIGNMENT_ADD: b2bTeacherReassignment
};
const studentApiMap = {
  STUDENT_PROJECT_LIST: getStudentProjects,
  STUDENT_QUIZZES_LIST: getStudentAllQuizzes,
  ADD_STUDENT_QUIZ_ADD: addQuizToStudent,
  ADD_STUDENT_SONG_CHALLENGE_ADD: addQuizToStudent,
  UPDATE_STUDENT_QUIZ_UPDATE: updateStudentQuiz,
  UPDATE_STUDENT_SONG_CHALLENGE_UPDATE: updateStudentQuiz,
  STUDENT_SONG_CHALLENGES_LIST: getStudentAllSongChallenges,
  REMOVE_STUDENT_PROJECT_DELETE: removeStudentProject,
  CLEAR_STUDENT_BOOKING_UPDATE: clearStudentBooking,
  STUDENT_PROJECT_UPDATE: assignProjectToStudentForClass,
  STUDENT_BOOKING_LIST: getStudentBookings,
  STUDENT_B2B_BOOKING_LIST: getB2BStudentBookings,
  STUDENT_DELETE: deactivateStudent,
  STUDENT_UPDATE: activateStudent,
  STUDENT_BOOKING_UPDATE: refundStudentBooking,
  STUDENT_PACKAGE_LIST: getStudentPackages,
  STUDENT_SUBSCRIPTION_LIST: getStudentSubscriptions,
  CANCEL_STUDENT_SUBSCRIPTION_UPDATE: cancelSubscriptions,
  PAUSE_STUDENT_SUBSCRIPTION_UPDATE: pauseSubscriptions,
  RESUME_STUDENT_SUBSCRIPTION_UPDATE: resumeSubscriptions,
  SINGLE_APPLICABLE_COUPON_LIST: getSingleApplicableCoupon,
  STUDENT_CLASS_BOOKING_DELETE: closeClass,
  STUDENT_CLASS_BOOKING_UPDATE: cancelStudentSlots,
  STUDENT_CLASS_BOOKING_ADD: addStudentClassBooking,
  STUDENT_SEND_TRIAL_LINK_ADD: sendStudentTrialLink,
  STUDENT_CHANGE_TEACHER_ADD: studentChangeTeacher,
  STUDENT_NEW_CHANGE_TEACHER_ADD: studentNewChangeTeacher,
  STUDENT_COURSE_ADD: addStudentCourse,
  STUDENT_COURSE_UPDATE: updateStudentCourse,
  ASSIGN_OFFER_UPDATE: assignVoucherToStudent,
  STUDENT_WEEKLY_SLOTS_ADD: saveWeeklySlots,
  STUDENT_PROFILE_UPDATE: updateUserProfile,
  STUDENT_SESSION_PROFILE_UPDATE: updateUserProfile,
  STUDENT_PROFILE_ADDRESS_UPDATE: updateStudentProfileAddress,
  COURSE_BY_GRADE_LIST: getCourseByGrade,
  STUDENT_LIST: getStudentById,
  SEARCH_STUDENTS_LIST: searchStudents,
  SEARCH_STUDENTS_FOR_SALES_LIST: searchStudentsSales,
  STUDENTS_ADD: addStudent,
  STUDENT_LEVEL_UPDATE: updateStudentLevel,
  STUDENT_COURSE_LEVEL_UPDATE: updateStudentCourseLevel,
  STUDENT_HATS_UPDATE: updateStudentHat,
  STUDENT_GENERATE_CERTIFICATE_UPDATE: generateCertificateLink,
  STUDENT_MOBILEOREMAIL_UPDATE: updateMobileorEmail,
  STUDENT_PASSWORD_UPDATE: studentPasswordChange,
  STUDENT_CHANGE_CLASS_UPDATE: changeClass,
  STUDENT_CHANGE_CLASS_OVERBOOKED_UPDATE: changeClass,
  STUDENT_INVOICE_GENERATE_ADD: studentInvoiceGenerate,
  ORDER_INVOICE_GENERATE_ADD: orderInvoiceGenerate,
  STUDENT_GET_ALL_INVOICE_LIST: studentGetAllInvoice,
  STUDENT_CANCEL_INVOICE_DELETE: studentCancelInvoice,
  STUDENT_GET_LAPTOP_LIST: studentGetLaptop,
  STUDENT_CLEAR_CACHE_UPDATE: clearCacheUser,
  STUDENT_WEBSITE_DELETE: websitedelete,
  STUDENT_FOLLOWUP_LIST: studentFollowupDetail,
  STUDENT_ACTIVE_OR_DEACTIVE_UPDATE: inActiveUserUpdate,
  STUDENT_NOTIFICATION_STATUS_UPDATE: updateNotificationStatus,
  STUDENT_ACTIONS_LOCK_OR_UNLOCK_UPDATE: studentActionsLockUpdate,
  STUDENT_CREATE_TASK_ADD: createTask,
  STUDENT_CERTIFICATE_CREATE_ADD: createCertificateForStudentByAdmin,
  STUDENT_CERTIFICATE_CREATE_LIST: getAllStudentCertificate,
  STUDENT_BATCH_ADD: bookBatch,
  STUDENT_BATCH_DELETE: cancelBatchForStudent,
  STUDENT_ALL_BATCH_LIST: getAllBatchForStudent,
  STUDENT_RECOMMENDED_BATCH_LIST: getRecommendedBatchForStudent,
  STUDENT_BATCH_LIST: getStudentCurrentBatch,
  STUDENT_B2B_BATCH_LIST: getB2BStudentCurrentBatch,
  STUDENT_CONVERSION_UPDATE: updateConversionDetail,
  STUDENT_BATCH_SPECIAL_CLASS_ADD: specialClassForBatch,
  STUDENT_B2B_BATCH_SPECIAL_CLASS_ADD: specialClassForB2BBatch,
  STUDENT_BATCH_TEACHER_LIST: getActiveTeacherListForStudent,
  STUDENT_REFUND_ADD: refundToStudent,
  STUDENT_SUBSTITUTE_TEACHER_LIST: getSubstituteTeacherList,
  STUDENT_REFERRAL_WINNER_ADD: addReferralWinner,
  STUDENT_REFERRAL_WINNER_LIST: getReferralWinner,
  STUDENT_SIBLING_LIST: findDuplicateStudents,
  STUDENT_REFERRAL_ADD: generateReferral,
  STUDENT_BATCH_BOOKING_CLASS_ADD: batchBookingAddClass,
  STUDENT_B2B_BATCH_BOOKING_CLASS_ADD: batchB2BBookingAddClass,
  STUDENT_RECURRING_BATCH_BOOKING_ADD: recurringBatchBookings,
  SEARCH_RENEWAL_STUDENTS_LIST: searchRenewalStudents,
  SEARCH_RENEWAL_STUDENTS_UPDATE: sendRenewalReportMail,
  SEARCH_RENEWAL_STUDENTS_ADD: renewalMarkAsComplete,
  RENEWAL_STUDENT_UPDATE: renewalFormUpdate,
  STUDENT_REGENERATE_UPDATE: regenerateStudentWebsite,
  STUDENT_COMMUNICATION_ADD: addStudentCommunication,
  STUDENT_COMMUNICATION_LIST: getStudentCommunication,
  AUTO_LOGIN_LIST: getAutoLoginLink,
  STUDENT_UNIFIED_LIST: getStudentUnifiedExp,
  NPS_SURVEY_FEEDBACK_LIST: getNpsSurveyFeedback,
  ZENDESK_TASK_LIST: getUnifiedZendeskTask,
  STUDENT_BUDDY_CLASS_CANCELLED_ADD: buddyClassCancelled,
  IS_PENDING_AMOUNT_LIST: isPendingAmount,
  GET_PARTIAL_PAYMENT_LIST: getPartialPayment,
  REFUND_ELIGIBLE_ORDERS_LIST: getRefundEligibleOrders,
  CALLING_HOURS_UPDATE: updateCallingHours,
  CALLING_HOURS_LIST: getCallingHours,
  COVER_UP_CLASS_BOOKING_LIST: getBookingsForCoverUp,
  COVER_UP_CLASS_BOOKING_ADD: coverUpClassBooking,
  RECURRING_SLOT_SCHEDULE_LIST: getReccuringSlotSchedule,
  RECURRING_SLOT_TIME_LIST: getRecurringSlotTime,
  RECOMMENDED_RECURRING_FREE_SLOT_LIST: getRecommendedRecurringFreeSlot,
  RECURRING_SCHEDULES_ADD: addRecurringSchedules,
  STUDENT_PREFERENCE_DATA_UPDATE: updateStudentExtraData,
  RECURRING_SLOTS_FOR_OPS_LIST: getRecurringSlotsForOps,
  FETCH_RECURRING_AUDIT_LIST: getRecurringAuditForOps,
  STUDENT_USER_UPDATE: updateUser,
  FETCH_RECURRING_SCHEDULE_LIST: fetchRecurringSchedule,
  FETCH_INSTANT_TRIAL_LIST: fetchInstantTrial,
  TOD_IDS_DATA_LIST: fetchTodIdsInfo,
  TOD_IDS_DATA_ADD: postTodIdsInfo
};

const teacherApiMap = {
  TEACHER_PENALTY_LIST: getTeacherPenalty,
  TEACHER_PENALTY_DELETE: refundTeacherPenalty,
  TEACHER_WEEKLY_CALENDAR_LIST: getWeeklyCalendarSlots,
  TEACHER_DELETE: deactivateTeacher,
  TEACHER_UPDATE: activateTeacher,
  TEACHER_EARNING_LIST: getTeacherEarning,
  TEACHER_BOOKING_UPDATE: refundTeacherPenalty,
  TEACHER_CONVERSION_LIST: getTeacherConversion,
  TEACHER_STUDENT_CLASS_BOOKING_DELETE: closeClass,
  TEACHER_STUDENT_CLASS_BOOKING_UPDATE: cancelStudentSlots,
  TEACHER_STUDENT_CLASS_BOOKING_ADD: addStudentClassBooking,
  TEACHER_SKILL_ADD: addTeacherSkill,
  TEACHER_SKILL_UPDATE: updateTeacherSkill,
  TEACHER_VC_PROVIDER_UPDATE: updateVCProvider,
  TEACHER_VC_PROVIDER_LIST: getTeacherVcProvider,
  USER_VC_PROVIDER_UPDATE: updateVCProvider,
  USER_VC_PROVIDER_LIST: getUserVcProvider,
  SESSION_VC_PROVIDER_LIST: getSessionVcProvider,
  TEACHER_SKILL_DELETE: deleteTeacherSkill,
  TEACHER_SLOTS_DELETE: cancelTeacherSlot,
  TEACHER_SLOTS_ADD: addTeacherSlot,
  TEACHER_WEEKLY_SLOTS_ADD: saveTeacherWeeklySlots,
  TEACHER_WEEKLY_SLOTS_LIST: getSlotsWithWeeklyBookings,
  TEACHER_BY_SKILL_LIST: getTeachersBySkill,
  TEACHER_SUBSTITUTE_LIST: getSubstituteTeacherForStudent,
  TEACHER_FOR_REASSIGN_LIST: getTeachersForReassignment,
  TEACHER_FOR_NEW_REASSIGN_LIST: getNewTeachersForReassignment,
  TEACHER_PROFILE_UPDATE: updateUserProfile,
  TEACHERS_ADD: addTeacher,
  TEACHER_WS_LIST: getFreeWeeklySlots,
  TEACHER_S_LIST: getFreeSlots,
  TEACHER_S_B2B_LIST: getFreeB2BSlots,
  TEACHER_CALENDAR_LIST: getSlotsWithBookings,
  TEACHER_SLOT_PAYMENT_LIST: getSlotsWithPayment,
  TEACHER_B2B_SLOT_PAYMENT_LIST: getB2BSlotsWithPayment,
  TEACHER_LIST: getTeacherById,
  TEACHER_BULK_SLOT_UPDATE: cancelTeacherBulkSlots,
  TEACHER_REASSIGN_LIST: getTeachersForReassign,
  TEACHER_TRIAL_BOOK_COUNT_LIST: getTrialBookedCountWithLanguage,
  TEACHER_SLOT_COUNT_LIST: getTeacherSlotCount,
  TEACHER_MOBILEOREMAIL_UPDATE: updateMobileorEmail,
  TEACHER_PAYSLIP_LIST: getAllPayslipOfTeacher,
  TEACHER_TIME_BASED_FILTER_LIST: getAllTeacherBasedOnTime,
  TEACHER_SLOT_NOT_OPEN_TIME_BASED_FILTER_LIST: getAllTeachersOfSlotNotOpenedOrFreeBasedOnTime,
  TEACHER_ACTIVE_OR_DEACTIVE_UPDATE: inActiveUserUpdate,
  TEACHER_GENERATE_CERTIFICATE_ADD: createCertificateForTeacherByAdmin,
  TEACHER_GENERATE_CERTIFICATE_LIST: getAllTeacherCertificate,
  TEACHER_RM_LIST: getAllRm,
  TEACHER_LEADS_LIST: getLeadForRm,
  TEACHER_EMAIL_FILTER_LIST: getListOfEmail,
  TEACHER_EMAIL_SEND_ADD: sendEmail,
  TEACHER_ALL_BATCH_LIST: getTeacherAllBatch,
  TEACHER_RESIGN_ADD: addTeacherResign,
  TEACHER_REFERRAL_ADD: generateReferral,
  TEACHER_CLEAR_CACHE_UPDATE: clearCacheUser,
  TEACHER_SLOT_SYNC_ADD: teacherSlotSync,
  TEACHER_LEAVE_INFO_LIST: fetchTeacherLeave,
  TEACHER_BY_MAIL_LIST: searchTeachers,
  TEACHER_REVOKE_ADD: revokeTeacherResign,
  TEACHER_BY_LANGUAGE_LIST: getTeachersByLanguage,
  POST_NOTIFICATION_LIST: getPostNotification,
  GET_ALL_NOTIFICATIONS_LIST: getPostNotification,
  NOTIFICATION_TARGETS_LIST: getNotificationTargets,
  CREATE_NEW_NOTIFICATION_ADD: createNewNotification,
  DELETE_NOTIFICATION_DELETE: deleteNotification,
  GET_ACKNOWLEDGE_COUNT_LIST: getAcknowledgeCount,
  VC_ADAPTER_ROOM_INFO_LIST: getVcAdapterRoomInfo,
  SOCKET_DATA_ROOM_INFO_LIST: getSocketDataRoomInfo,
  SESSION_SYSTEM_INFO_LIST: getSessionSystemInfo,
  GET_TEACHER_BY_AFFILIATE_LIST: getTeacherByAffiliate,
  RECURRING_CLASS_BOOKING_LIST: getHourlyRecurringFreeSlots,
  RECURRING_CLASS_BOOKING_ADD: addRecurringBookings,
  TEACHER_MATRIC_MODIFICATION_LIST: getTeacherMatricCorrection,
  TEACHER_MATRIC_MODIFICATION_UPDATE: updateTeacherMatricCorrection,
  TEACHER_MATRIC_MODIFICATION_AUDIT_LIST: getTeacherMatricCorrectionAudit,
  TEACHER_MATRIC_MODIFICATION_BOOKING_LIST: getTeacherMatricBookingCorrection
};

const ABApiMap = {
  ABMANUEVER_LIST: getAllAB_ab,
  ABMANUEVER_RSST_UPDATE: stopResume_ab,
  ABMANUEVER_ADD: createNew_ab,
  ABMANUEVER_UPDATE: updateTraffic_ab
};

const userApiMap = {
  USER_UPDATE: updateUser,
  USER_DASHBOARD_UPDATE: updateLoggedInUser,
  USER_ADD: createUser,
  USER_DELETE: deleteUser,
  USER_LIST: getAgentUsers
};

const vendorMap = {
  SHIPPING_ADDRESS_LIST: getAllShippingAddress,
  SHIPPING_ADDRESS_UPDATE: updateShippingAddress,
  VENDOR_UPLOAD_LIST: vendorUpload,
  SHIPPING_ADDRESS_STATUS_UPDATE: updateAddressStatus,
  DOWNLOAD_DAILY_SHIPPING_DATA_LIST: getDailyShippingData
};
const orderApiMap = {
  ORDER_ADD: createOrder,
  CONFIRM_PENDING_OFFLINE_ADD: confirmPendingOfflineCapture,
  CAPTURE_PENDING_ADJUSTMENT_ADD: capturePendingAdjustment
};

const liveClassApiMap = {
  SESSION_LIST: getAllSessions,
  REASSIGN_TRIAL_UPDATE: reassignTrial,
  RESCHEDULE_WITH_TEACHER_UPDATE: rescheduleTrial,
  SESSION_STUDENT_CLASS_BOOKING_UPDATE: cancelStudentSlots,
  REASSIGN_VC_URL_UPDATE: reassignVcUrl,
  SESSION_JOINED_FROM_OPS_PANEL_ADD: sessionJoinedFromOpsPanel,
  SESSION_JOINED_SM_BTL_ADD: smJoinClassBtl,
  SESSION_ENDED_SM_BTL_ADD: smEndClassBtl,
  SESSION_TEACHER_SLOTS_DELETE: cancelTeacherSlot,
  SESSION_TEACHER_STUDENT_CLASS_BOOKING_DELETE: closeClass,
  SESSION_B2B: getAllB2BSessions
};

const cronConfigApiMap = {
  CRON_CONFIG_LIST: getAllCronConfigs,
  CRON_CONFIG_ADD: createCronConfig,
  CRON_CONFIG_UPDATE: updateCronConfig,
  CRON_CONFIG_DELETE: deleteCronConfig,
  CRON_CONFIG_UPLOAD_LIST: cronConfigUpload
};

const notificationConfigApiMap = {
  NOTIFICATION_CONFIG_LIST: getAllNotificationConfigs,
  NOTIFICATION_CONFIG_ADD: createNotificationConfig,
  NOTIFICATION_CONFIG_UPDATE: updateNotificationConfig,
  NOTIFICATION_CONFIG_DELETE: deleteNotificationConfig,
  NOTIFICATION_CONFIG_UPLOAD_LIST: notificationConfigUpload,
  REFRESH_NOTIFICATION_CACHE_LIST: refreshNotificationCache,
  REFRESH_ALL_V3_NOTIFICATION_CACHE_ADDLIST: refreshAllV3NotificationCache,
  REFRESH_V3_NOTIFICATION_DATA_ADDLIST: refreshNotificationV3List,
  NOTIFICATION_CONFIG_TEST_ADD: testNotificationConfig,
  NOTIFICATION_CONFIG_V3_ADD: createV3NotificationConfig,
  NOTIFICATION_CONFIG_V3_LIST: getAllNotificationConfigs,
  NOTIFICATION_CONFIG_V3_SPECIFIC_LIST: getV3NotificationConfig,
  NOTIFICATION_CONFIG_V3_SEARCH_LIST: getAllV3NotificationConfigs,
  NOTIFICATION_CONFIG_V3_CONSTANTS_LIST: getAllNotificationMasterConstants,
  NOTIFICATION_CONFIG_V3_UPDATE: updateV3NotificationConfig,
  NOTIFICATION_CONFIG_V3_DELETE: deleteV3NotificationConfig,
  NOTIFICATION_CONFIG_TEST_PREVIEW_LIST: testNotificationConfigPreview,
  NOTIFICATION_CONFIG_TEST_PREVIEW_ADDLIST: testNotificationConfigPreview,
  NOTIFICATION_CONFIG_TEST_FORM_ADD: testNotificationConfigUsingForm,
  NOTIFICATION_CONFIG_TEST_PAYLOAD_ADD: createOrUpdateTestNotificationConfigPayload,
  NOTIFICATION_CONFIG_TEST_PAYLOAD_LIST: getTestNotificationConfigPayload,
  NOTIFICATION_CONFIG_V3_FETCH_ENV_LIST: getFetchEnvName,
  NOTIFICATION_CONFIG_V3_FETCH_ENV_DIFF_LIST: getV3NotificationDiff,
  NOTIFICATION_CONFIG_V3_FETCH_VALIDATE_RULES_ADDLIST: fetchValidateRules,
  NOTIFICATION_CONFIG_V3_FETCH_CREATE_OR_UPDATE_MASTER_AND_RULES_ADDLIST: createOrUpdateMasterAndRules
};

const notificationInsights = {
  EMAIL_NOTIFICATION_INSIGHTS_LIST: getEmailInsight,
  SMS_NOTIFICATION_INSIGHTS_LIST: getSMSInsight,
  WHATSAPP_NOTIFICATION_INSIGHTS_LIST: getWhatsappInsight,
  IVR_NOTIFICATION_INSIGHTS_LIST: getIVRInsight,
  STATUS_LIST_CONSTANT_LIST: getStatusConstant
};

const whatsappProviderNumbersLimit = {
  WHATSAPP_CAPACITY_LIST: getWhatsappProviderNumbersLimits,
  WHATSAPP_PROVIDER_LIMIT_LIST: getWhatsappProviderLimit
};

const notificationReference = {
  NOTIFICATION_REFERENCE_ADDLIST: getNotificationReference,
  NOTIFICATION_REFERENCE_UPLOAD_LIST: saveNotificationReference
};

const bulkTesting = {
  BULK_TEST_CONSTANTS_LIST: getBulkTestingDefaultValue,
  BULK_TEST_LIST: runBulkTest,
  BULK_TEST_ADDITIONAL_RULE_CONSTANTS_LIST: getBulkTestingAdditionalRuleConstants,
  TEST_RESULT_DIFFERENCE_LIST: getDifferenceResult,
  REVERSE_TEMPLATE_TEST_LIST: getReverseTemplateTest,
  TAG_LIST_OF_REFERENCE_LIST: getReferenceTagData
};

const templateApiMap = {
  TEMPLATES_LIST: getAllTemplates,
  NEW_TEMPLATES_LIST: getAllTemplatesNew,
  TEMPLATES_CONSTANTS_LIST: getAllTemplateConstants,
  VALID_USER_TEMPLATE_CONTENT_LIST: getValidUserForContent,
  TEMPLATESRANDOM_ADDLIST: createTemplate,
  SEARCH_DRAFT_CRITERIA_ADDLIST: searchTemplateByCriteria,
  TEMPLATES_UPDATE: updateTemplate,
  TEMPLATES_DELETE: deleteTemplate,
  TEMPLATE_MAPPING_ADDLIST: updateBulkTemplateMapping
};

const draftTemplateApiMap = {
  DRAFT_TEMPLATES_LIST: getAllDraftTemplates,
  // DRAFT_TEMPLATES_ADDLIST: createDraftTemplate,
  DRAFT_TEMPLATES_UPDATE: updateDraftTemplate,
  DRAFT_TEMPLATES_DELETE: deleteDraftTemplate,
  CREATE_DRAFT_TEMPLATES_ADDLIST: createDraftTemplate,
  DRAFT_STATUS_DATA_UPDATE: updateDraftStatus,
  DRAFT_PROVIDER_STATUS_UPDATE: updateProviderDraftStatus,
  TEMPLATE_VERSION_LIST: getTemplateVersions
};

const experimentApiMap = {
  EXPERIMENTS_ADD: createExperiment,
  EXPERIMENTS_UPDATE: updateExperiment,
  EXPERIMENTS_DELETE: deleteExperiment,
  BULK_RULES_EXPERIMENT_MAPPING_ADDLIST: createBulkRulesExperimentMapping,
  EXPERIMENT_RULE_MAPPING_ADD: createRuleExperimentMapping,
  MULTIPLE_RULE_EXPERIMENT_DELETE: deleteMultipleRuleExperiment,
  EXPERIMENT_RULE_MAPPING_UPDATE: updateExperimentRuleMapping,
  EXPERIMENTS_LIST: getAllExperimentList,
  IS_WINNER_EXPERIMENT_UPDATE: updateWinnerExperiment,
  CLEAR_EXPERIMENT_CACHE_UPDATE: clearExperimentCache
};

const notificationRulesApiMap = {
  NOTIFICATION_RULES_LIST: getAllNotifcationRules,
  NOTIFICATION_RULES_CONSTANTS_LIST: getAllNotificationRuleConstants,
  NOTIFICATION_RULES_ADD: createNotificationRule,
  NOTIFICATION_RULES_UPDATE: updateNotificationRule,
  NOTIFICATION_RULES_DELETE: deleteNotificationRule,
  NOTIFICATION_RULES_TEMPLATE_ADD: addTemplateMapping,
  NOTIFICATION_RULES_TEMPLATE_UPDATE: updateTemplateMapping,
  NOTIFICATION_RULES_TEMPLATE_DELETE: deleteTemplateMapping,
  NOTIFICATION_RULES_WIZARD_LIST: createNotificationRuleWizard
};

const eventCommandConfigApiMap = {
  EVENT_COMMAND_CONFIG_LIST: getAllEventCommand,
  EVENT_COMMAND_CONFIG_ADD: createEventCommandConfig,
  EVENT_COMMAND_CONFIG_UPDATE: updateEventCommandConfig,
  EVENT_COMMAND_CONFIG_DELETE: deleteEventCommandConfig,
  EVENT_COMMAND_TEST_ADD: testEvent,
  EVENT_COMMAND_CONFIG_UPLOAD_LIST: eventCommandUpload
};

const sqlJobEntityApiMap = {
  SQL_JOB_ENTITY_LIST: getAllSQLJobEntity,
  SQL_JOB_ENTITY_ADD: createSQLJobEntity,
  SQL_JOB_ENTITY_UPDATE: updateSQLJobEntity,
  SQL_JOB_ENTITY_DELETE: deleteSQLJobEntity,
  SQL_JOB_ENTITY_TEST_LIST: testSQLJobEntity
};

const affiliateApiMap = {
  AFFILIATES_ADD: addAffiliate,
  AFFILIATE_LIST: getAffiliateById,
  SEARCH_AFFILIATES_LIST: searchAffiliates,
  AFFILIATE_PROFILE_UPDATE: updateAffiliateProfile,
  AFFILIATE_STUDENT_LIST: getAffiliateStudents,
  ASSOCIATE_AFFILIATE_STUDENT_ADD: associateAffiliateStudent,
  ASSOCIATE_AFFILIATE_STUDENT_DELETE: associateAffiliateStudentDelete,
  AFFILIATE_ADDRESS_ADD: createUpdateAffiliateAddress,
  AFFILIATE_ADDRESS_UPDATE: createUpdateAffiliateAddress,
  AFILIATE_PROFILE_DETAIL_UPDATE: updateAffiliatesProfileDetail,
  AFFILIATE_PROFILE_PREFERENCE_UPDATE: updateAffiliatesPreference,
  AFFILIATE_CLEAR_CACHE_UPDATE: clearCacheAffiliate,
  AFFILIATE_TEACHER_LIST: searchB2BTeachers,
  ASSOCIATE_AFFILIATE_TEACHER_ADD: associateAffiliateTeacher,
  ASSOCIATE_AFFILIATE_TEACHER_DELETE: associateAffiliateTeacherDelete,
  ALL_TEACHERS_FOR_B2B_AFFILIATE_LIST: getAllTeachersForAffiliateB2B,
  ALL_TEACHERS_BY_FILTER_FOR_B2B_AFFILIATE_LIST: getB2BTeachersByFilter,
  BULK_AF_UPLOAD_LIST: b2bBulkUpload,
  BULK_AF_UPLOAD_VALIDATE_LIST: bulkValidateStudentForDuplicateRecords,
  AF_STUDENTS_ADD: addAfStudent,
  AFFILIATE_MOBILEOREMAIL_UPDATE: updateMobileorEmail,
  AFFILIATE_SCHEDULE_LIST: getAllAffiliateSchedule,
  AFFILIATE_SCHEDULE_ADD: createAffiliateSchedule,
  AFFILIATE_SCHEDULE_DELETE: deactivateAffiliateSchedule
};

const community = {
  COMMUNITY_EVENTS_LIST: getCommunityEvents,
  EVENT_CONTESTS_LIST: getEventContest,
  CREATE_EVENTS_ADD: createEvents,
  EDIT_EVENTS_UPDATE: updateEvents,
  CREATE_CONTEST_ADD: createContest,
  EDIT_CONTEST_UPDATE: updateContest,
  DAILY_CONTEST_LIST: getDailyContest,
  COMMUNITY_CHALLENGES_LIST: getCommunityChallenges,
  CREATE_CHALLENGES_ADD: createChallenges,
  EDIT_CHALLENGES_UPDATE: updateChallenges,
  CREATE_DAILY_CONTEST_ADD: createDailyContest,
  EDIT_DAILY_CONTEST_UPDATE: updateDailyContest,
  UNMARKED_SUBMISSIONS_LIST: getUnmarkedSubmission,
  ALL_SUBMISSIONS_LIST: getAllSubmission,
  DAILY_CONTEST_CHALLENGES_UPDATE: addChallenges,
  AWARD_SCORES_ADD: markSubmission
};
const OTP = {
  OTP_ADD: sendOTP,
  OTP_UPDATE: verifyOTP
};

const zendeskChat = {
  ADD_ISSUE_CATEGORY_LIST: addIssueCategory,
  ADD_ISSUE_SUB_CATEGORY_LIST: addIssueSubCategory,
  ADD_ISSUE_DEPARTMENT_MAPPING_LIST: addIssueDepartmentMapping,
  GET_ISSUE_CATEGORY_LIST: getIssueCategory,
  GET_ISSUE_SUB_CATEGORY_LIST: getIssueSubCategory,
  GET_ALL_DEPARTMENTS_LIST: getAllDepartments,
  GET_ISSUE_DEPARTMENT_MAPPING_LIST: getIssueDepartmentMapping,
  ADD_ZENDESK_DEPARTMENT_LIST: addZendeskDepartment,
  GET_CHAT_MODULE_LIST: getModule,
  ADD_MODULE_LIST: addModule,
  SYNC_ZENDESK_DEPARTMENT_LIST: syncDepartments,
  GET_TAGS_LIST: getTags,
  ADD_TAGS_LIST: addTags
};

const zendeskChatAlert = {
  GET_CHAT_ALERT_LIST: getAllChatAlerts,
  ADD_CHAT_ALERT_LIST: addChatAlert,
  UPDATE_CHAT_ALERT_LIST: updateChatAlert,
  TOGGLE_CHAT_ALERT_LIST: toggleChatAlert,
  DELETE_CHAT_ALERT_LIST: deleteChatAlert,
  GET_CHAT_LOGS_LIST: getAllChatLogs,
  GET_DETAIL_LOGS_LIST: getChatDetailLogs
};

const getAllPermissions = data =>
  GET(`/authorization_permission/getPermission?isAdmin=true`, data);
export const searchCustomPermissionMapping = data =>
  GET(`/authorization_permission/searchPermissionMapping`, data);
export const addPermission = function(data) {
  return POST("/authorization_permission/createPermission", data);
};

export const getPermissionById = ({ id }) =>
  GET(`/authorization_permission/getPermission?isAdmin=true`, { id });

export const updatePermission = data =>
  PUT(`/authorization_permission/updatePermission`, data);

const getAllRoles = data => GET(`/authorization_permission/getRole`, data);

export const addRole = function(data) {
  return POST("/authorization_permission/createRole", data);
};

export const getRoleById = ({ id }) =>
  GET(`/authorization_permission/getRole`, { id });

export const updateRole = data =>
  PUT(`/authorization_permission/updateRole`, data);

const getAllPermissionMappings = data =>
  GET(`/authorization_permission/getPermissionMapping?isAdmin=true`, data);

export const addPermissionMapping = function(data) {
  return POST("/authorization_permission/createPermissionMapping", data);
};

export const getPermissionMappingById = ({ id }) =>
  GET(`/authorization_permission/getRole`, { id });

export const updatePermissionMapping = data =>
  PUT(`/authorization_permission/updatePermissionMapping`, data);
export const searchCustomRole = data =>
  GET(`/authorization_permission/searchRole`, data);
export const searchCustomPermission = data =>
  GET(`/authorization_permission/searchPermission`, data);
const authorizationApiMap = {
  PERMISSIONS_LIST: getAllPermissions,
  PERMISSIONS_ADD: addPermission,
  SEARCH_PERMISSIONS_LIST: getPermissionById,
  PERMISSIONS_UPDATE: updatePermission,
  ROLES_LIST: getAllRoles,
  SEARCH_ROLES_LIST: getRoleById,
  ROLES_ADD: addRole,
  ROLES_UPDATE: updateRole,
  PERMISSION_MAPPING_LIST: getAllPermissionMappings,
  SEARCH_PERMISSION_MAPPING_LIST: getPermissionMappingById,
  PERMISSION_MAPPING_ADD: addPermissionMapping,
  PERMISSION_MAPPING_UPDATE: updatePermissionMapping,
  CUSTOM_SEARCH_PERMISSION_MAPPING_LIST: searchCustomPermissionMapping,
  CUSTOM_SEARCH_ROLE_LIST: searchCustomRole,
  CUSTOM_SEARCH_PERMISSION_LIST: searchCustomPermission
};

export const getAllSarRequest = () => GET(`/sar_request/getAllSarDetails`);
export const createSarRequest = data => POST(`/sar_request/create`, data);
export const updateSarRequest = data =>
  PUT(`/sar_request/${data.id}/update`, data);

const sarRequestMap = {
  SAR_REQUEST_LIST: getAllSarRequest,
  SAR_REQUEST_ADD: createSarRequest,
  SAR_REQUEST_UPDATE: updateSarRequest
};

export const getQuizConfigOld = () => GET(`/quiz/config`);
export const getQuizConfig = () => GET(`/quiz/configValues`);
export const quizCreateOrUpdateService = data =>
  POST(`/quiz/quizCreateOrUpdate`, data);

export const gameCreateOrUpdateService = data =>
  POST("/quiz/createOrUpdateQuizGame", data);

export const getQuizDetails = ({ entityId, entityType, courseId }) =>
  GET(`/quiz/quizDetails`, { entityId, entityType, courseId });

export const checkQuizIfExist = data => POST(`/quiz/checkIfExist`, data);
export const getClassOnQuiz = quizId => GET(`quiz/getClassOnQuiz?id=${quizId}`);

const quizApiMap = {
  QUIZ_CONFIG_LIST: getQuizConfig,
  QUIZ_ADD: quizCreateOrUpdateService,
  QUIZ_LIST: getQuizDetails,
  QUIZ_CHECK_LIST: checkQuizIfExist,
  CLASS_QUIZ_LIST: getClassOnQuiz,
  COPY_QUIZ_ADD: copyQuiz,
  QUIZ_GAME_ADD: gameCreateOrUpdateService
};

export const createOrUpdateModuleClassMappings = data =>
  POST("/module/createOrUpdateModuleClassMappings", data);

export const getAllModuleClassMapping = data =>
  GET(`/module/getAllModuleMappings?courseId=${data.courseId}`);

const moduleClassMap = {
  MODULE_CLASS_MAP_ADD: createOrUpdateModuleClassMappings,
  MODULE_MAPPING_LIST: getAllModuleClassMapping
};

export const getPointUpdationConfig = ({ name }) =>
  GET(`/quiz/getPointUpdationConfig`);
export const getStudentQuizzes = ({ studentId }) =>
  GET(`/quiz/studentQuizzes`, { studentId });
export const getIpInformation = () => GET(`/geo/getIpInfo`);
export const updateQuizEndTime = ({ studentId, quizId, extraTime }) =>
  POST(`/quiz/updateEndTime`, { studentId, quizId, extraTime });
export const updatePointForStudent = ({
  studentId,
  entityId,
  entityType,
  reason,
  points
}) =>
  POST(`/quiz/updatePointForStudent`, {
    studentId,
    entityId,
    entityType,
    reason,
    points
  });

const getWorldStageEvents = ({ courseType }) =>
  GET(`/studentSuccess/worldStageEvents?courseType=${courseType}`);
const getListOfStudentsByCohort = ({
  eventId,
  eventOccurrence,
  eventType,
  courseType
}) =>
  GET(
    `/studentSuccess/eventId/${eventId}/eventOccurrence/${eventOccurrence}/getEligibleStudentsFor${eventType}ByEventIdAndCohort?courseType=${courseType}
`
  );

const updateAnnouncementByCohort = ({
  eventId,
  eventOccurrence,
  data,
  eventType,
  courseType
}) =>
  POST(
    `/studentSuccess/eventId/${eventId}/eventOccurrence/${eventOccurrence}/submit${eventType}Announcement?courseType=${courseType}`,
    {
      EligibleStudents: data
    }
  );

const studentGamificationApiMap = {
  POINT_UPDATION_CONFIG_LIST: getPointUpdationConfig,
  STUDENT_QUIZ_LIST: getStudentQuizzes,
  STUDENT_QUIZ_UPDATE: updateQuizEndTime,
  STUDENT_QUIZ_ADD: updatePointForStudent
};
const eventDataApiMap = {
  EVENT_DATA_ADD: saveEventData
};
const getIPInformationApiMap = {
  IP_INFORMATION_LIST: getIpInformation
};

const laptopApiMap = {
  LAPTOP_ADD: addLaptop,
  LAPTOP_LIST: getLaptops,
  SEARCH_LAPTOP_LIST: getLaptopById,
  LAPTOP_UPDATE: updateLaptopProfile,
  LAPTOP_DELETE: deleteLaptop
};

export const getStudentLaptopOrder = pageSize =>
  GET(`/student_laptop_order/all?pageSize=${pageSize}`);

export const uploadStudentLaptopOrder = data =>
  POST(`/inventory/orders/bulkUpload?seller=${data.id}`, data.data);

const studentLaptopOrderApiMap = {
  STUDENT_LAPTOP_ORDER_LIST: getStudentLaptopOrder,
  STUDENT_LAPTOP_ORDER_ADD: uploadStudentLaptopOrder
};

export const addCampaign = function(data) {
  return POST(`/campaign`, data); // have to update to affiliate api
};

export const getCampaigns = function(data) {
  return GET(`/campaign`, data);
};

export const getCampaignById = ({ id }) => GET(`/campaign`, { id });

export const updateCampaignProfile = function({ id, data }) {
  return PUT(`/campaign/${id}`, data);
};

export const getMusescoreSearch = ({ searchText }) => {
  return GET(`music/score/search?text=${searchText}`);
};

export const updateClassSummaryStatus = data =>
  PUT("notification-class-summary/activeClassSummary", data);

export const getStudentAlternateBookings = userId => {
  return GET(`/app/leadSlots?userId=${userId}`);
};

export const bookClassViaAlternateBooking = data => {
  return POST(`/app/leadSlots/`, data);
};

const campaignApiMap = {
  CAMPAIGN_ADD: addCampaign,
  CAMPAIGN_LIST: getCampaigns,
  SEARCH_CAMPAIGN_LIST: getCampaignById,
  CAMPAIGN_UPDATE: updateCampaignProfile
};

const studentWebinarService = {
  STUDENT_WEBINAR_ADD(data) {
    return POST("trial/webinar", data);
  },
  STUDENT_WEBINAR_UPDATE(data) {
    return PUT(`trial/webinar/${data.id}`, data);
  },
  STUDENT_WEBINAR_DELETE({ id }) {
    return PUT(`trial/webinar/${id}`, { recordStatus: 0 });
  },
  STUDENT_WEBINAR_LIST({ data }) {
    return GET(`trial/webinar`, data);
  },
  STUDENT_WEBINAR_AB_LIST({ data }) {
    return GET(`trial/webinar/getABValue/TRIAL_WEBINAR`, data);
  },
  STUDENT_WEBINAR_AB_UPDATE(data) {
    return PUT(`trial/webinar/modifyABValue/TRIAL_WEBINAR`, data);
  },
  STUDENT_LEVEL_WEBINAR_LIST({ id }) {
    return GET(`trial/webinar/getUserABValue/${id}`);
  },
  STUDENT_WEBINAR_ACCOUNTS_LIST() {
    return GET("trial/zoomAccounts");
  },
  STUDENT_WEBINAR_CSVUPLOAD_LIST(formData) {
    return POST(`trial/webinar/uploadLeads`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  }
};

export const apiMap = {
  ...ABApiMap,
  HMS_TOKEN_LIST: getHmsToken,
  TWILIO_TOKEN_LIST: getTwilioToken,
  TWILIO_CHAT_TOKEN_LIST: getTwilioChatToken,
  ...hackathonApiMap,
  ...dcApiMap,
  ...studentGamificationApiMap,
  ...quizApiMap,
  ...sarRequestMap,
  ...batchApiMap,
  ...payoutApiMap,
  ...webinarApiMap,
  ...mentorApiMap,
  ...courseVersionsApiMap,
  ...feedbackTriggersForCourseApiMap,
  ...postSubmissionForCourseApiMap,
  ...feedbackApiMap,
  ...auditApiMap,
  ...wofApiMap,
  ...callApiMap,
  ...teacherBookingInfoApiMap,
  ...dispositionApiMap,
  ...taskApiMap,
  ...sqlJobEntityApiMap,
  ...eventCommandConfigApiMap,
  ...notificationConfigApiMap,
  ...notificationInsights,
  ...whatsappProviderNumbersLimit,
  ...notificationReference,
  ...bulkTesting,
  ...templateApiMap,
  ...experimentApiMap,
  ...draftTemplateApiMap,
  ...notificationRulesApiMap,
  ...cronConfigApiMap,
  ...liveClassApiMap,
  ...sessionApiMap,
  ...orderApiMap,
  ...userApiMap,
  ...languageApiMap,
  ...studentApiMap,
  ...teacherApiMap,
  ...configApiMap,
  ...featureConfigApiMap,
  ...messageApiMap,
  ...vendorMap,
  ...emiCalulatorApi,
  ...screenShot,
  ...community,
  ...teacherRoleApiMap,
  ...OTP,
  ...zendeskChat,
  ...zendeskChatAlert,
  ...unSubscribeApiMap,
  ...eventDataApiMap,
  ...getIPInformationApiMap,
  ...affiliateApiMap,
  ...teacherLeaderboardApiMap,
  ...laptopApiMap,
  ...studentLaptopOrderApiMap,
  ...campaignApiMap,
  ...authorizationApiMap,
  ...studentWebinarService,
  ...extraLearningContentApiMap,
  ...conceptApiMap,
  ...dndSuppressionApiMap,
  ...moduleClassMap,
  ...callFrameworkAPIMap,
  ...taskTrackerApiMap,
  ...mindsetApiMap,
  ...studentLearningJourney,
  SQLEDITOR_DATA_LIST: getSqlData,
  PROJECT_CLASS_LIST: getClasses,
  SALES_FORCE_ADD: pushToSalesForce,
  OFFLINE_PAYMENT_ADD: captureOfflinePayment,
  ORDER_LINK_LIST: getOrderLink,
  CONFIG_SCHEMA_LIST: getAllConfigSchemas,
  COUPON_CODE_LIST: verifyCouponCode,
  ME_LIST: getMe,
  GET_TRIAL_OTP_LIST: getTrialOTP,
  TRIGGER_CUSTOM_GMAIL_ADD: triggerCustomGmail,
  CUSTOM_PROACTIVE_GMAIL_ADD: saveCustomGmailConfig,
  CUSTOM_PROACTIVE_GMAIL_UPDATE: updateCustomGmailConfig,
  CUSTOM_PROACTIVE_GMAIL_LIST: getCustomGmailConfig,
  CHECK_CUSTOM_PROACTIVE_GMAIL_LIST: checkIfCustomGmailConfig,
  CUSTOM_PROACTIVE_GMAIL_DELETE: deleteCustomGmailConfig,
  CREATE_TASK_FOR_CRM_LIST: createdTaskForCrm,
  CLICK_TO_DISPOSE_CONCENTRIX_LIST: clickToDisposeConcentrix,
  CALL_HISTORY_LIST: getCallHistory,
  VERIFICATION_CODE_LIST: generateVerificationCode,
  TEACHER_TRIAL_SLOT_LIST: getTrialSlots,
  STUDENT_TRIAL_SLOT_ADD: bookTrialSlot,
  COUNTRY_LIST: getCountries,
  COUNTRY_ADD: addCountries,
  COUNTRY_UPDATE: editCountries,
  COUNTRY_DELETE: deleteCountries,
  REGION_LIST: getRegions,
  REGION_ADD: addRegions,
  REGION_DELETE: deleteRegions,
  REGION_UPDATE: editRegions,
  CLASS_LIST: getClasses,
  CLASS_POPUP_LIST: getClasses,
  CLASS_TO_POPUP_LIST: getClasses,
  PROJECT_ADD: addProjects,
  PROJECT_LIST: getProjects,
  PROJECT_UPDATE: editProjects,
  PROJECT_DELETE: deleteProjects,
  COURSE_LIST: getCourses,
  COURSE_ADD: addCourses,
  COURSE_UPDATE: editCourses,
  COURSE_DELETE: deleteCourses,
  ELIGIBLE_COURSES_LIST: getEligiableCourses,
  ACTIVITY_LIST: getActivities,
  ALL_ACTIVITY_LIST: getAllActivities,
  ACTIVITY_ADD: addActivities,
  ACTIVITY_UPDATE: editActivities,
  ACTIVITY_DELETE: deleteActivities,
  COPY_ACTIVITY_ADD: copyActivity,
  CLASS_ADD: addClass,
  CLASS_UPDATE: updateClass,
  CLASS_DELETE: deleteClass,
  FILE_UPLOAD_LIST: fileUpload,
  S3_SIGNED_URL_ADD: getSignedUrlForOps,
  PAYSLIP_UPLOAD_LIST: payslipUpload,
  S3_UPLOAD_LIST: s3upload,
  BULK_USERS_FILE_UPLOAD_LIST: bulkUsersFileUpload,
  BULK_UNSUBSCRIBE_UPLOAD_LIST: bulkUnSubscribeUpload,
  TASK_ROSTER_BULK_UPLOAD_LIST: taskRosterBulkUpload,
  COURSE_ITEM_LIST: getCourseItem,
  COURSE_ITEM_ADD: addCourseItem,
  COURSE_ITEM_UPDATE: updateCourseItem,
  COURSE_ITEM_DELETE: updateCourseItem,
  SEARCH_TEACHERS_LIST: searchTeachers,
  SEARCH_DECISION_TREE_NODES_LIST: searchDecisionTreeNodes,
  GET_TEACHER_COMMS_TEMPLATES_LIST: getTeacherCommsTemplates,
  GET_LINKED_FAQS_LIST: getLinkedFAQs,
  GET_FAQ_BY_ID_LIST: getFaqById,
  SUBNODE_ADD: addSubNodes,
  SUBNODE_ORDER_ADD: orderSubNodes,
  SUBNODE_UPDATE: editSubNodes,
  SUBNODE_DELETE: deleteSubNodes,
  SEARCH_FAQ_TREE_NODES_LIST: searchFAQTreeNodes,
  FAQ_NODE_DELETE: deleteFAQNode,
  CREATE_FAQ_TREE_NODE_UPDATE: createUpdateFAQ,
  LINKFAQS_UPDATE: updateLinkedFaqs,
  TCTEMPLATE_ADD: addTCTemplates,
  TCTEMPLATE_UPDATE: editTCTemplates,
  TCTEMPLATE_DELETE: deleteTCTemplates,
  GET_TEACHER_STRIKES_LIST: getTeacherStrikes,
  GET_TEACHER_STRIKES_AUDITS_LIST: getTeacherStrikesAuditData,
  GET_TEACHER_QUALITIES_LIST: getTeacherQualities,
  TEACHERSTRIKE_ADD: addTeacherStrike,
  TEACHERSTRIKE_UPDATE: editTeacherStrike,
  PAYMENT_PACKAGES_ADD: addCoursePrice,
  PAYMENT_PACKAGES_LIST: getCoursePrice,
  PAYMENT_PACKAGES_DELETE: deleteCoursePrice,
  PAYMENT_PACKAGES_UPDATE: updateCoursePrice,
  PAYMENT_PACKAGES_OLD_LIST: getCoursePriceOld,
  GET_REFERRAL_DATA_LIST: getReferralData,
  STATE_LIST: getState,
  COUNTRY_STATE_LIST: getStateByCountry,
  LEAD_ADD: addLead,
  GET_LEAD_LIST: getLead,
  LEADS_ANALYTICS_LIST: getLeadsAnalytics,
  SITEL_LEAD_LIST: sitelLeadPush,
  SLOT_BOOKING_LEAD_LIST: slotBookingLeadPush,
  SLOT_BOOKING_LEAD_BULK_UPLOAD_LIST: slotBookingLeadBulkUpload,
  SLOT_BOOKING_LEAD_REDSHIFT_LIST: slotBookingLeadRedshift,
  SLOT_BOOKING_NO_LAPTOP_LEAD_LIST: slotBookingLeadPushNoLaptop,
  SLOT_BOOKING_NR_LEAD_LIST: slotBookingNRLeadPush,
  SLOT_BOOKING_RE_CHURN_LEAD_LIST: slotBookingReChurnLeadPush,
  // SLOT_BOOKING_LEAD_BY_TYPE_LIST: slotBookingLeadPushByType,
  // SLOT_BOOKING_LEAD_MUSIC_LIST: slotBookingLeadPushMusic,
  // SLOT_BOOKING_LEAD_MUSIC_FOR_ALL_LIST: slotBookingLeadPushMusicForAll,
  // SLOT_BOOKING_LEAD_ART_LIST: slotBookingLeadPushArt,
  SLOT_BOOKING_LEAD_BFS_LIST: slotBookingLeadPushBFS,
  BULK_REASSIGN_UNDISPOSED_TASK_UPDATE: bulkReassignTask,
  PROJECT_DUE_DATE_UPDATE: updateDueDateForProjects,
  UPDATE_CLASSJOIN_TIME_ADD: createUpdateClassJoinTime,
  REMOVE_CLASS_FROM_WEEKLY_TARGET_ADD: removeClassFromWeeklyTarget,
  BADGE_STREAK_RESYNC_ADD: BadgeStreakReSync,
  ADD_STUDENT_AS_WEEKLY_WINNER_ADD: setStudentAsWeeklyWinnerByWeek,
  ADDITIONAL_ADD: addAdditionalTask,
  ADDITIONAL_TASK_LIST: getAdditionalTask,
  COMMS_LIST: getComms,
  AFFILIATE_BY_CHANNEL_LIST: getAllAffiliateByChannel,
  PACKAGE_SCOPE_LIST: getPackageScopes,
  GET_LEAD_SCORE_LIST: getLeadScore,
  DISPOSE_SLASH_RTC_UPDATE: disposeSlashRTC,
  GET_CALL_LOG_LIST: getCallLog,
  ADD_CALL_LOG_LIST: addCallLog,
  TRIGGER_SALESKEN_CALL_LIST: triggerSaleskenCall,
  GET_CALL_PROVIDER_LIST: getCallProvider,
  GET_PROFILE_NOTES_LIST: getProfileNotes,
  CREATE_PROFILE_NOTES_LIST: createProfileNote,
  ADD_PROFILE_NOTES_LIST: addNewProfileNote,
  ADD_CALL_NOTES_LIST: addNewCallNote,
  ADD_DISPOSITION_TO_CALL_LOG_LIST: updateCallLog,
  SVC_ZENDESK_TASK_LIST: getSVCZendeskTickets,
  DISPOSE_SYKES_UPDATE: disposeSykes,
  SHOW_AND_TELL_ACTIVITY_LIST: getShowAndTellActivities,
  ALL_SHOW_AND_TELL_ACTIVITY_LIST: getAllShowAndTellActivities,
  SHOW_AND_TELL_ACTIVITY_ADD: addShowAndTellActivity,
  SHOW_AND_TELL_ACTIVITY_UPDATE: updateShowAndTellActivity,
  SHOW_AND_TELL_ACTIVITY_DELETE: deleteShowAndTellActivity,
  CLASS_SUMMARY_LIST: getClassSummary,
  CLASS_SUMMARY_ADD: addClassSummary,
  CLASS_SUMMARY_UPDATE: updateClassSummary,
  CLASS_SUMMARY_DELETE: deleteClassSummary,
  TEST_MAIL_CLASS_SUMMARY_UPDATE: getClassSummaryTestMail,
  CHANGE_DELIVERY_CHANNEL_UPDATE: updateDeliveryChannel,
  GET_WORLD_STAGE_EVENTS_LIST: getWorldStageEvents,
  GET_LIST_OF_ELIGIBLE_STUDENTS_BY_COHORT_LIST: getListOfStudentsByCohort,
  SEND_STUDENTS_BY_COHORT_ADD: updateAnnouncementByCohort,
  GET_MUSESCORE_LIST: getMusescoreSearch,
  ZENDESK_EMAIL_LIST: zendeskEmailList,
  AB_TEST_LIST: getAllABTest,
  AB_TEST_VARIANT_LIST: getABTestById,
  AB_TEST_VARIANT_ADD: putAddCountryVariant,
  AB_TEST_VARIANT_UPDATE: putUpdateTrafficPercent,
  AB_TEST_ADD: postNewABTest,
  CLASS_SUMMARY_STATUS_UPDATE: updateClassSummaryStatus,
  INVENTORY_ORDER_LIST: getAllInventoryOrders,
  INVENTORY_ORDER_ADD: addInventoryOrder,
  INVENTORY_ORDER_UPDATE: updateInventoryOrder,
  INVENTORY_FLOW_LIST: getInventoryFlow,
  ORDER_LINE_ITEM_LIST: getAllOrderLineItems,
  ORDER_LINE_ITEM_ADD: addOrderLineItem,
  STUDENT_VENDORS_LIST: getAllVendors,
  DELIVERY_STATUS_LIST: getDeliveryStatus,
  ADDRESS_MASTER_LIST: getAddressMaster,
  ADDRESS_MASTER_ADD: addAddressMaster,
  PRODUCT_ITEM_LIST: getAllProductItems,
  PRODUCT_ITEM_ADD: addProductItem,
  PRODUCT_ITEM_UPDATE: updateProductItem,
  PRODUCT_SKUS_LIST: getAllProductSkus,
  PRODUCT_SKUS_ADD: addProductSku,
  PRODUCT_SKUS_UPDATE: updateProductSku,
  DELIVERY_STATUS_ADD: addDeliveryStatus,
  VENDOR_STATUS_LIST: getAllVendorStatus,
  STUDENT_VENDORS_ADD: addVendor,
  VENDOR_STATUS_ADD: addVendorStatus,
  INVENTORY_FLOW_ADD: addInventoryFlow,
  PENDING_SHIPING_ADDRESS_LIST: getAllPendingShippingOrders,
  ADDRESS_MASTER_PENDING_ORDER_ADD: addAddressMasterToPendingOrder,
  ENTITY_AUDIT_LIST: getEntityAudit
};
// selectCourse

// selectClass
// class Description
// Project Name
// Project Type
// Project Order
// Project status
// Project description
// project document

// export const getCountries = () => GET(`countries`);
// export const addCountries = ({name, code, regionId}) => POST(`countries`, {name, code, regionId});
// export const editCountries = ({name, code, regionId}) => PUT(`countries/${regionId}`, {name, code, regionId});
// export const deleteCountries = ({recordStatus, regionId}) => PUT(`countries/${regionId}`, {recordStatus});

// country-region-teacher

// export const getCoursesAndClasses = data =>
// GET(`userDetail/authenticatePassword/`, data);
// export const getCoursesAndClasses = data =>
// GET(`userDetail/authenticatePassword/`, data);
// export const getCoursesAndClasses = data =>
// GET(`userDetail/authenticatePassword/`, data);
// export const getCoursesAndClasses = data =>
// GET(`userDetail/authenticatePassword/`, data);

// eslint-disable-next-line no-unused-vars
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const postEndClass = ({ sessionId }) => {
  return POST(`classSession/${sessionId}/smEndSession`, {});
};

export const getStudentAdditionalData = studentId =>
  GET(`/students/${studentId}/additionalData`);

export const getStudentCouponStatus = ({ studentId }) =>
  GET(`/partners-reward-coupon/student/${studentId}`);

export const cancelCoupon = ({ couponId, description }) =>
  POST(`/partners-reward-coupon/${couponId}/cancel`, { description });

export const reassignCoupon = ({ couponId, email }) =>
  POST(`/partners-reward-coupon/${couponId}/resend`, { email });

export const api__getAmplifyToken = () => {
  return GET("appSyncAuthorize/getTokenLambda?clientId=whjr");
};

export const getCourseVersionInfo = ({ courseName }) =>
  GET(`/courseVersion/getCourseInfo/${courseName}`);
