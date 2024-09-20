import { bookings } from "../actions";
import { compose, composeK, curry, path } from "ramda";
import { Link } from "react-router-dom";

import React, { useEffect, useState } from "react";
import * as _ from "lodash";
import moment from "moment";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import JsonBeautifier from "../components/JsonBeautifier";
import { useSnackbar } from "notistack";
import { getCookie } from "./cookie";
import { get as _get, isNil as _isNil } from "lodash";
import {
  INDIA_CALL_PROVIDER,
  INDIA_DIAL_NO,
  NON_INDIA_CALL_PROVIDER,
  INDIA_CALL_PROVIDER_SALESKEN,
} from "../constants/commonConstants";
import { values } from "lodash-es";
import _orderBy from "lodash/orderBy";

const DATE_OPTIONS = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};

export const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", DATE_OPTIONS);
export const detectMobile = () => {
  if (window.innerWidth <= 800 && window.innerHeight <= 600) {
    return true;
  } else {
    return false;
  }
};
export const getAvatar = (name) => {
  let words = name.split(" ");
  return words.map((word) => word.substring(0, 1).toUpperCase()).join();
};

export const getClassStatus = (status) => {
  switch (status) {
    case "not_started":
      return "Upcoming Class";
    case "completed":
      return "Completed";
    case "not_completed":
      return "Not Completed";
    default:
      return "Awaiting";
  }
};

export const isEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

/* Alex */

export const compareBy = curry(function(l, a, b) {
  let fn = compose(...l);
  return fn(b) - fn(a);
});

export const compareByDate = (a, b) => {
  let a_1 = moment(a.startTime).format("HH:mm");
  let b_1 = moment(b.startTime).format("HH:mm");
  let result = a_1 === b_1 ? 0 : a_1 < b_1 ? -1 : 1;
  return result;
};

export const NA = "Not Available";
export const valOrDef = curry((d, v) => (v ? v : d));
export const pathOrNA = (p, v) => compose(valOrDef(NA), path(p))(v);

export const trimOrNA = (p, v) => {
  let data = pathOrNA([v], p);
  // To handle val = null, undefined
  if (data) {
    // To handle cases like "   John   "
    let trimData = data.trim();
    // To handle cases like "     "
    return trimData === "" ? NA : trimData;
  } else {
    return NA;
  }
};

export const matTableColumnOptions = (columns) => {
  return columns.map((column, i) => ({
    ...column,
    headerStyle: {
      ...column.headerStyle,
      whiteSpace: "nowrap",
      textAlign: i === columns.length - 1 ? "right" : "left",
    },
    cellStyle: {
      ...column.cellStyle,
      whiteSpace: "nowrap",
      textAlign: i === columns.length - 1 ? "right" : "left",
    },
  }));
};

export const getTeacherStatus = (cp) => {
  if (cp === 0) {
    return "Not booked";
  } else if (cp > 0) {
    return "Trial booked";
  } else {
    return "";
  }
};

export const downloadExcel = (JSONData, ReportTitle, ShowLabel) => {
  var arrData = typeof JSONData != "object" ? JSON.parse(JSONData) : JSONData;

  var CSV = "";
  //Set Report title in first row or line
  //This condition will generate the Label/Header
  if (ShowLabel) {
    var row = "";

    //This loop will extract the label from 1st index of on array
    for (var index in arrData[0]) {
      //Now convert each value to string and comma-seprated
      row += index + ",";
    }

    row = row.slice(0, -1);

    //append Label row with line break
    CSV += row + "\r\n";
  }

  //1st loop is to extract each row
  for (var i = 0; i < arrData.length; i++) {
    var row = "";

    //2nd loop will extract each column and convert it in string comma-seprated
    for (var index in arrData[i]) {
      row += '"' + arrData[i][index] + '",';
    }

    row.slice(0, row.length - 1);

    //add a line break after each row
    CSV += row + "\r\n";
  }

  if (CSV == "") {
    alert("Invalid data");
    return;
  }

  //Generate a file name
  var fileName = "excel_";
  //this will remove the blank-spaces from the title and replace it with an underscore
  fileName += ReportTitle.replace(/ /g, "_");

  //Initialize file format you want csv or xls
  var uri = "data:text/csv;charset=utf-8," + escape(CSV);

  // Now the little tricky part.
  // you can use either>> window.open(uri);
  // but this will not work in some browsers
  // or you will not get the correct file extension

  //this trick will generate a temp <a /> tag
  var link = document.createElement("a");
  link.href = uri;

  //set the visibility hidden so it will not effect on your web-layout
  link.style = "visibility:hidden";
  link.download = fileName + ".csv";

  //this part will append the anchor tag and remove it after automatic click
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
export const validateNumber = (value) => {
  const regex = "^[0-9]*$";
  if (!value.match(regex)) {
    return false;
  }
  return value;
};
const CUSTOM_TRIGGER_PARAMS = ["US", "+1_US", "+1"];
export const formatCountryMobile = (mob, code = "") => {
  if (!mob.trim().length) return mob.trim();
  let phone = formatMobileNumber(mob);
  if (CUSTOM_TRIGGER_PARAMS.includes(code) && phone.length > 3) {
    const match = phone.match(/^(\d{1,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      phone = `(${match[1]})${match[2] ? " " : ""}${match[2]}${
        match[3] ? "-" : ""
      }${match[3]}`;
    }
  }
  return phone.trim();
};
export const formatMobileNumber = (val) => {
  return val ? val.toString().replace(/[^\d]/g, "") : val;
};
export const getDialAndCountryCode = (val) => {
  val = val.split("_");
  const dialCode = val.length ? val[0] : "";
  const countryCode = val.length > 1 ? val[1] : "";
  return { dialCode, countryCode };
};
export const validateNullInput = (...args) => {
  return (
    args.filter((val) => {
      return val && val.trim().length;
    }).length === args.length
  );
};
export const validateInputNumber = (dialCode, mobile) => {
  if (dialCode === "" || mobile.trim() === "") {
    return false; // returns if it is null
  }

  const numberRegex = new RegExp(/^\d+$/);
  if (
    numberRegex.test(mobile) &&
    dialCode &&
    dialCode.split("+")[1] === "91" &&
    mobile.length === 10
  ) {
    // only supported for india
    return true;
  }
  return false;
};
export const checkIsCustom = (values, p1 = "dialCode", p2 = "mobile") => {
  let isCustom = false;
  if (values[p1] && values[p2] && CUSTOM_TRIGGER_PARAMS.includes(values[p1])) {
    isCustom = true;
  }
  return isCustom;
};
export const getCurrentTabInfo = (tab) => {
  switch (tab) {
    case "pending":
      return "Eligible";
    case "completed":
      return "Completed";
    case "updated":
      return "Updated";
    case "verified":
      return "Verified";
    case "in_transit":
      return "In Transit";
    case "in_printing":
      return "In Printing";
    case "rejected":
      return "Not Deliverable";
    default:
      return " ";
  }
};
const getStudentName = (data) => {
  let studentName = [];
  if (data && data.student_bookings && data.student_bookings.length > 0) {
    data.student_bookings.map((i) => {
      const name = path(["student", "name"], i);
      studentName.push(name);
    });
    return studentName;
  }
};
export const getStudentNameFromBatch = (data) => {
  let studentName = [];
  if (
    data &&
    data.class_batch_students &&
    data.class_batch_students.length > 0
  ) {
    data.class_batch_students.map((i) => {
      if (i.status === "confirmed" && studentName.length < 2) {
        const name = path(["student", "name"], i);
        studentName.push(name);
      }
    });
    return studentName.toString();
  }
};
export const isValidCourseRegistration = (student, course) => {
  if (
    course.isTrial === false &&
    course.credits > 0 &&
    (!course.course_item ||
      course.course_item.classType === "ONE_TO_TWO" ||
      course.course_item.classType === "ONE_TO_MANY") &&
    student.recordStatus === 1
  ) {
    return true;
  }
  return false;
};
export const getStudentIdFromBatch = (data) => {
  let studentId = [];
  if (
    data &&
    data.class_batch_students &&
    data.class_batch_students.length > 0
  ) {
    data.class_batch_students.map((i) => {
      if (i.status === "confirmed") {
        const name = path(["student", "id"], i);
        studentId.push(name);
      }
    });
    return studentId;
  }
};
export const studentDataForExcel = (data) => {
  let bookingData = path(["booking"], data);
  if (
    !bookingData ||
    !bookingData.student_bookings ||
    (bookingData &&
      bookingData.student_bookings &&
      bookingData.student_bookings.length > 0 &&
      !bookingData.student_bookings[0].student)
  ) {
    return "Not Allocated";
  } else {
    let studentDetails = getStudentName(data.booking);
    return `${studentDetails.toString()}`;
  }
};
export const maskMobileNumber = (mobileNumber) => {
  if (mobileNumber) {
    let vis = mobileNumber.slice(-4),
      countNum = "";

    for (var i = mobileNumber.length - 4; i > 0; i--) {
      countNum += "*";
    }

    return countNum + vis;
  }
  return "";
};

export const getCurrentCourseIndexFromCourseItemId = (
  studentCourses,
  courseItemId
) => {
  let idx = 0; // by default return 0 index
  if (!studentCourses) return idx;
  for (let i = 0; i < studentCourses.length; i++) {
    if (studentCourses[i].courseItemId === courseItemId) {
      idx = i;
      break;
    }
  }
  return idx;
};

export const getCurrentCourseIndexFromStudentCourses = (
  studentCourses,
  courseType
) => {
  let idx = 0;
  if (!studentCourses) return idx;
  for (let i = 0; i < studentCourses.length; i++) {
    let course = studentCourses[i];
    let currentCourseType = course ? course.courseType : null;
    if (currentCourseType === courseType) {
      idx = i;
      break;
    }
  }
  return idx;
};
export const genericMaskingData = (data, flag = true) => {
  let countNum = "***********";
  if (flag === false) {
    countNum = data;
  }
  return countNum;
};

export const genericMaskingDataEmail = (data, flag = true) => {
  if (data) {
    const index = data.indexOf("@");
    let vis = data.slice(index),
      countNum = "";

    for (var i = data.length - index; i > 0; i--) {
      countNum += "*";
    }

    return countNum + vis;
  }
  return "";
};

export const syncMobileWithDialCode = (dialCode, mobileNumber) => {
  if (dialCode && mobileNumber) {
    return dialCode + mobileNumber;
  }
};
export const Pagination = (
  currentPage,
  handlePageChange,
  limit,
  data = [{}],
  firstPage = 0
) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        flexDirection: "row",
        padding: 20,
        alignItems: "center",
      }}
    >
      <button
        className={`${currentPage === firstPage &&
          "text-muted"} mr-3 cursor_pointer btn btn-dark btn-sm`}
        disabled={currentPage === firstPage ? true : false}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </button>
      <div>{currentPage}</div>
      <button
        className={`${data && data.length < limit && "text-muted"}
              ml-3 cursor_pointer btn btn-dark btn-sm`}
        disabled={data && data.length < limit ? true : false}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const trialClassDateTime = (timeObj) => {
  const { startTime, timezone } = timeObj;
  let trialClassDate = moment(startTime)
      .tz(timezone)
      .format("Do MMM"),
    trialClassTime = moment(startTime)
      .tz(timezone)
      .format("LT");
  return `${trialClassDate} ${trialClassTime}`;
};

const mapMIMEtoExt = {
  json: "text/json",
  txt: "text/json",
  // pdf: "application/pdf"
};

const createUrlObj = (urlData, ext) =>
  `${mapMIMEtoExt[ext]};charset=utf-8,` +
  encodeURIComponent(JSON.stringify(urlData));

//  ? Method for downloading json, txt, or pdf file
export const exportFile = ({
  urlData,
  fileName = "FileName",
  ext = "json",
}) => {
  if (urlData && urlData.length) {
    try {
      const file = fileName + "." + ext;
      let urlHref;
      switch (ext) {
        case "json":
          urlHref = `data:${createUrlObj(urlData, ext)}`;
          break;
        case "txt":
          urlHref = `data:${createUrlObj(urlData, ext)}`;
          break;
        default:
          urlHref = window.URL.createObjectURL(new Blob([urlData]));
      }

      const link = document.createElement("a");
      link.href = urlHref;
      link.setAttribute("download", file);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (e) {
      window.console(`An Error : ${e} occured while exporting`);
    }
  }
};

//  *? Helps to Set File Upload Entity, in the generic fileUpload compo
export const custEntityFn = (defaulty) => {
  let entityName = defaulty;
  const getE = () => entityName;
  const setE = (prop) => (entityName = prop || defaulty);
  return { getE, setE };
};

//  *? Method to check Allowed File Types, Utilised in fileUpload Compo
export const checkFile = (sender, validExts) => {
  if (!validExts.length) return true;
  let fileExt = sender.substring(sender.lastIndexOf(".")).slice(1);
  if (validExts.indexOf(fileExt) < 0) {
    alert(
      "Invalid file selected, valid files are of " +
        validExts.join(" | ") +
        " types."
    );
    return false;
  } else return true;
};

// *? Handle debounced JSON changes via jsonEditor `mode:code`
export const handleJsonChanges = (fn, json, fieldKey = "config") => {
  const debounced = _.debounce((json) => {
    fn(fieldKey, checkIfString(json) ? JSON.parse(json) : json);
  }, 500);
  debounced(json);
};

export const handleJsonChangesForABTests = (fn, json) => {
  const debounced = _.debounce((json) => {
    fn(checkIfString(json) ? JSON.parse(json) : json);
  }, 500);
  debounced(json);
};

// *? JSON feeder into jsonEditor
export const feedJson = (valy) => {
  if (!valy) return {};
  return checkIfString(valy) ? valy : JSON.stringify(valy);
};

// *? Generic EnqueueSnackbar (via Provider-Context API)
export const useContextSnackbar = () => {
  const [toastData, setToastData] = useState({
    type: "",
    message: "Processing request...!",
  });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  let refToSnack = null;
  useEffect(() => {
    if (path(["type"], toastData))
      refToSnack = enqueueSnackbar(toastData.message, {
        variant: toastData.type,
        autoHideDuration: 4000,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
  }, [toastData]);
  return { setToastData, refToSnack, closeSnackbar };
};

// *? Helps to restrict TableCell width upto 400px (default)
export const columnStyle = (width) => ({
  maxWidth: `${width || 400}px`,
  width: `${width || 400}px`,
  wordBreak: "inherit",
  overflowWrap: "break-word",
  whiteSpace: "normal",
  overflowX: "auto",
});

export const checkPermission = (me, permissionToCheck) => {
  if (
    me &&
    me.permission &&
    me.permission.length > 0 &&
    me.permission.includes(permissionToCheck)
  ) {
    return true;
  }
  return false;
};

export const checkRole = (me) => {
  let roles = me.userRoles;
  for (let i in roles) {
    if (
      roles[i].toLowerCase() === "super_admin" ||
      roles[i].toLowerCase() === "admin" ||
      roles[i].toLowerCase() === "mexico_trial_proactive" ||
      roles[i].toLowerCase() === "mexico_trial_reactive" ||
      roles[i].toLowerCase() === "brazil_trial_proactive" ||
      roles[i].toLowerCase() === "brazil_trial_reactive"
    ) {
      return true;
    }
  }
  return false;
};
export const checkRoleForConcern = (me) => {
  let roles = me.userRoles;
  for (let i in roles) {
    if (
      roles[i].toLowerCase() === "super_admin" ||
      roles[i].toLowerCase() === "admin" ||
      roles[i].toLowerCase() === "crm_proactive_agent" ||
      roles[i].toLowerCase() === "crm_reactive_agent" ||
      roles[i].toLowerCase() === "reactive_agent" ||
      roles[i].toLowerCase() === "proactive_agent" ||
      roles[i].toLowerCase() === "sales" ||
      roles[i].toLowerCase() === "slot_booking" ||
      roles[i].toLowerCase() === "student_ops" ||
      roles[i].toLowerCase() === "finance_admin"
    ) {
      return true;
    }
  }
  return false;
};
export const checkIfString = (val) => {
  return typeof val === "string" || val instanceof String;
};
export const checkIfObject = (val) => {
  return typeof val === "object" || val instanceof Object;
};

export const checkIfProperJSON = (val) => {
  let value;
  try {
    value = checkIfString(val) ? JSON.parse(val) : val;
  } catch (e) {
    value = val;
  }
  return checkIfObject(value);
};

export const parseJSON = (val) =>
  checkIfProperJSON(val) ? JSON.parse(val) : null;

export const checkRoleSuperAdmin = (me) => {
  let roles = me.userRoles;
  for (let i in roles) {
    if (roles[i].toLowerCase() === "super_admin") {
      return true;
    }
  }
  return false;
};

export const checkRoleSales = (me) => {
  let roles = me.userRoles;
  for (let i in roles) {
    if (roles[i].toLowerCase() === "sales") {
      return true;
    }
  }
  return false;
};

export const checkRoleSuperAdminOrFinanceAdmin = (me) => {
  let roles = me.userRoles;
  for (let i in roles) {
    if (
      roles[i].toLowerCase() === "super_admin" ||
      roles[i].toLowerCase() === "finance_admin"
    ) {
      return true;
    }
  }
  return false;
};

export const copyText = (link) => {
  if (link) {
    const el = document.createElement("textarea");
    el.value = link;
    el.setAttribute("readonly", link);
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }
};

export const isPDFFile = (file = "") => {
  if (file && file.length) {
    let filExtension = file.split(".").pop();
    return filExtension === "pdf";
  }
  return false;
};

export const isInvoiceCheck = (student) => {
  let flag = false;
  if (
    student &&
    student.student_courses &&
    student.student_courses.length > 0
  ) {
    for (let i in student.student_courses) {
      if (
        student.student_courses[i].isTrial === false &&
        student.student_courses[i].credits > 0
      ) {
        flag = true;
      }
    }
  }
  return flag;
};
export const isCheckCourseTabDisplay = (student, len) => {
  let flag = false;
  if (!student) return flag;
  if (
    student &&
    student.student_courses &&
    student.student_courses.length > len
  ) {
    flag = true;
  }
  return flag;
};

export const createLiveClassURL = (sessionData = {}, vcProvider = null) => {
  const scope =
    sessionData.booking && typeof sessionData.booking === "object"
      ? sessionData.booking
      : sessionData;

  const course_class_id = scope.course_class_id;
  const course_item_id = scope.course_item_id;
  const bookingIdInt = scope.bookingIdInt;
  const bookingId = scope.id;
  // This is actually not a number, but string identifier of class
  // e.g. PRO-T
  const classNumber = scope.course_class && scope.course_class.classNumber;
  const vcMeetingId =
    _get(scope, "class_session.vcMeetingId", null) ||
    _get(scope, "session.vcMeetingId", null);

  if (vcProvider === null) {
    vcProvider = _get(sessionData, "class_session.vcProvider", null);
  }

  const url = [
    `/live-class?bookingId=${bookingId}`,
    `sessionId=${sessionData.sessionId}`,
    `bookingIdInt=${bookingIdInt}`,
    `classNumber=${classNumber}`,
    `course_class_id=${course_class_id}`,
    `course_item_id=${course_item_id}`,
    `vcProvider=${vcProvider}`,
    `vcMeetingId=${vcMeetingId}`,
  ].join("&");

  return url;
};

export const createSMLiveClassURL = (sessionData = {}) => {
  const scope =
    sessionData.booking && typeof sessionData.booking === "object"
      ? sessionData.booking
      : sessionData;

  const course_class_id = scope.course_class_id;
  const course_item_id = scope.course_item_id;
  const bookingIdInt = scope.bookingIdInt;
  const bookingId = scope.id;
  // This is actually not a number, but string identifier of class
  // e.g. PRO-T
  const classNumber = scope.course_class && scope.course_class.classNumber;
  const vcMeetingId =
    _get(scope, "class_session.vcMeetingId", null) ||
    _get(scope, "session.vcMeetingId", null);
  let vcProvider = null;
  if (vcProvider === null) {
    vcProvider = _get(sessionData, "class_session.vcProvider", null);
  }
  const url = [
    `/btl-sm-live-class?bookingId=${bookingId}`,
    `sessionId=${sessionData.sessionId}`,
    `bookingIdInt=${bookingIdInt}`,
    `classNumber=${classNumber}`,
    `course_class_id=${course_class_id}`,
    `course_item_id=${course_item_id}`,
    `vcProvider=${vcProvider}`,
    `vcMeetingId=${vcMeetingId}`,
  ].join("&");

  return url;
};

export const getTwilioParticipantInformation = (
  sessionData,
  participantIdentity
) => {
  const { teacher = {}, student_bookings } = sessionData;
  let participant = { identity: participantIdentity };
  const students = (student_bookings || []).map((booking) => booking.student);

  if (teacher.userId === participant.identity) {
    participant = Object.assign(
      { isTeacher: true },
      participant,
      _.pick(teacher, "name", "email", "userId", "countryCode", "timezone")
    );
    return participant;
  }

  const student = students.find(
    (student) => student.userId === participant.identity
  );

  if (student) {
    participant = Object.assign(
      { isStudent: true },
      participant,
      _.pick(student, "name", "email", "userId", "countryCode", "timezone")
    );
  }

  return participant;
};

export const LEAD_NOT_QUALIFIED = "lead not qualified";
export const leadingZero = (val) => {
  val = parseInt(val);
  return val < 10 ? `0${val}` : val;
};

export const getCourseTypeBatchList = (batchList, courseType) => {
  let value;
  batchList.forEach((batch) => {
    if (batch.courseType === courseType) value = batch;
  });
  return value;
};

export const checkContainsWebsiteLink = (text) => {
  const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  const regex = new RegExp(expression);
  return !!text.match(regex);
};

export const parseJsonConfig = (values, path) => {
  let config = _.get(values, path);
  return {
    ...values,
    config: checkIfString(config) ? JSON.parse(config) : config,
  };
};

export const compareDescending = (a, b) => {
  if (moment(a.endTime).isBefore(moment(b.endTime))) {
    return 1;
  }
  if (moment(a.endTime).isAfter(moment(b.endTime))) {
    return -1;
  }
  return 0;
};

export const compareAscending = (a, b) => {
  if (moment(a.endTime).isAfter(moment(b.endTime))) {
    return 1;
  }
  if (moment(a.endTime).isBefore(moment(b.endTime))) {
    return -1;
  }
  return 0;
};

export const checkLanguage = () => {
  let flag = false;
  const langCode = getCookie("langCode");
  if (langCode === "en_US") {
    flag = true;
  } else {
    flag = false;
  }
  return flag;
};
export const getClassTypeForPayments = (isTrial) => {
  let classTypes = ["ONE_TO_ONE", "ONE_TO_TWO", "ONE_TO_MANY"];
  if (isTrial) {
    classTypes = ["ONE_TO_ONE", "ONE_TO_MANY"];
  }
  return classTypes;
};

export const autoLoginUrls = {
  CODING: "code",
  MATH: "math",
  MUSIC: "music",
  B2B_CODING: "b2b",
  MUSIC_FOR_ALL: "musicplus",
  ART: "art",
  ENGLISH: "english",
  SPARK: "spark",
};

export const courseNotAllowedForMobileTrial = [];
export const checkButtonAllowedOrNot = (student) => {
  let flag = true;
  if (
    student &&
    student.student_courses &&
    student.student_courses.length > 0
  ) {
    let currentCourse = student.student_courses.filter(
      (i) => i.courseType === "CODING"
    );
    if (currentCourse && currentCourse.length > 0) {
      let courseShortName = _get(
        currentCourse[0],
        "course_item.course.courseShortName",
        null
      );
      if (
        courseNotAllowedForMobileTrial.includes(courseShortName) &&
        student.isLaptop === false
      ) {
        flag = false;
      }
    }
  }
  return flag;
};
export const extractClassNumberOnlyNumber = (
  course_class,
  course_version_class
) => {
  let classShortname = _get(course_class, "course.courseShortName");
  const sequenceNo = _get(course_version_class, "sequenceNo");
  if (!classShortname || !sequenceNo)
    return ` (${_get(course_class, "classNumber", "")})`;
  if (_get(course_class, "isTrial", false)) classShortname += "-T";
  else classShortname += "-C" + sequenceNo;
  return ` (${classShortname})`;
};
export const extractClassNumber = (course_class, course_version_class) => {
  let name = _get(course_class, "name");
  let versionName = _get(course_version_class, "course_version.versionName");
  if (course_class && !_isNil(_get(course_version_class, "classNumber"))) {
    return `${name} 
    (${_get(course_version_class, "classNumber")})
       (${_get(course_version_class, "course_version.versionName")})`;
  } else {
    let classShortname = _get(course_class, "course.courseShortName");
    const sequenceNo = _get(course_version_class, "sequenceNo");
    if ((!classShortname || !sequenceNo) && !_isNil(name))
      return `${name} (${_get(
        course_class,
        "classNumber",
        ""
      )}) (${versionName})`;
    if (_get(course_class, "isTrial", false)) classShortname += "-T";
    else classShortname += "-C" + sequenceNo;
    if (!_isNil(name)) {
      return `${name} (${classShortname}) (${versionName})`;
    } else {
      return "";
    }
  }
};

export const formatToUpperCase = (val = "") => (val ? val.toUpperCase() : "");
export const trimInputs = (val = "") => (val ? val.trim() : "");
export const trimFormInputs = (values) =>
  Object.keys(values).reduce((res, key) => {
    res[key] = values[key].trim();
    return res;
  }, {});

export const isTrialStudent = (student) => {
  const courses = _get(student, "student_courses", []);
  return courses.some((course) => course.isTrial);
};

export const fileSizeCheck = (fileSize = "0", sizeLimit = 100) =>
  parseInt(fileSize) / 1024 / 1024 > sizeLimit;

export const validateSVCCallingCondition = (callProvider, dialCode) => {
  if (
    [INDIA_CALL_PROVIDER].includes(callProvider) &&
    [INDIA_DIAL_NO].includes(dialCode)
  ) {
    return {
      enabled: true,
      callProvider,
    };
  } else if (
    [INDIA_CALL_PROVIDER_SALESKEN].includes(callProvider) &&
    [INDIA_DIAL_NO].includes(dialCode)
  ) {
    return {
      enabled: true,
      callProvider,
    };
  }
  return {
    enabled:
      [NON_INDIA_CALL_PROVIDER].includes(callProvider) &&
      ![INDIA_DIAL_NO].includes(dialCode),
    callProvider,
  };
};

//get class student/teacher joined status
export const getClassJoinStatus = (class_session, entity_type = "student") => {
  let sessionEvents = _get(class_session, "session_events", []);
  if (sessionEvents && sessionEvents.length > 0) {
    if (entity_type === "student") {
      return class_session.session_events.some(
        (item) =>
          item.entityType === "student" && item.eventName === "StudentJoined"
      );
    } else if (entity_type === "teacher") {
      return class_session.session_events.some(
        (item) =>
          item.entityType === "teacher" && item.eventName === "TeacherJoined"
      );
    }
    return false;
  }
  return false;
};

//check custom permission exists on the me permission
export const checkMePermission = (permissionList = [], actionList = []) => {
  if (
    permissionList &&
    permissionList.permission &&
    permissionList.permission.length > 0
  ) {
    return permissionList.permission.some((val) => actionList.includes(val));
  }
  return false;
};

export const syntheticClassNumber = (data) => {
  const classNumber = path(["course_class", "classNumber"], data);
  const sequenceNumber = path(["sequenceNo"], data);
  if (_.isNil(classNumber)) {
    return "";
  }
  if (_.isNil(sequenceNumber)) {
    return classNumber;
  }
  let courseShortName = "";
  let nextClass = "";
  if (classNumber) courseShortName = classNumber.split("-")[0];
  if (sequenceNumber === 0) nextClass = courseShortName + "-T";
  else nextClass = `${courseShortName}-C${sequenceNumber}`;
  return nextClass;
};

// export const getClassNumber = (course_class, course_version_class)=>{
//   // course_class ? className = _get(course_class, "classNumber"):"";
//   if(course_class && course_version_class)
//   {
//     return `${_get(course_class,"name")}
//     (${_get(course_version_class,"classNumber")})
//        (${_get(course_version_class,"course_version.versionName")})`;

//   }
//   else if(course_version_class)
//   return `(${_get(course_version_class,"classNumber")})
//        (${_get(course_version_class,"course_version.versionName")})`
//   else{
//     return "";
//   }
// }
//get student joined status
export const studentJoinedValueFilter = (class_session, eventName) => {
  let studentJoinedValue;
  let studentJoined =
    class_session &&
    class_session.session_events &&
    class_session.session_events.filter(
      (item) => item.entityType === "student" && item.eventName === eventName
    );
  if (studentJoined && studentJoined.length > 0) {
    studentJoinedValue = `Student${
      eventName === "StudentClassStarted"
        ? " - StudentClassStarted"
        : " - Joined"
    }@ ${moment
      .tz(studentJoined[0].created_at, moment.tz.guess())
      .format("DD MMM hh:mm a")}`;
  } else {
    if (eventName === "StudentClassStarted") {
      studentJoinedValue = `Student@ NotStudentClassStarted`;
    } else {
      studentJoinedValue = `Student@ NotJoined`;
    }
  }
  return studentJoinedValue;
};

//get teacher joined status
export const teacherJoinedValueFilter = (class_session) => {
  let teacherJoinedValue;
  let teacherJoined =
    class_session &&
    class_session.session_events &&
    class_session.session_events.filter(
      (item) =>
        item.entityType === "teacher" && item.eventName === "TeacherJoined"
    );
  if (teacherJoined && teacherJoined.length > 0) {
    teacherJoinedValue = `Teacher - Joined@ ${moment
      .tz(teacherJoined[0].created_at, moment.tz.guess())
      .format("DD MMM hh:mm a")}`;
  } else {
    teacherJoinedValue = `Teacher@ NotJoined`;
  }
  return teacherJoinedValue;
};

// get teacher late join status
export const teacherLateJoinValueFilter = (otherAttributes, startTime) => {
  let teacherLateJoinValue = "";
  if (otherAttributes && otherAttributes.teacherLateBySeconds) {
    teacherLateJoinValue = `Teacher will join @ ${moment
      .tz(startTime, moment.tz.guess())
      .add(otherAttributes.teacherLateBySeconds, "seconds")
      .format("hh:mm a")}`;
  }
  return teacherLateJoinValue;
};

export const isValidUrl = (value) => {
  return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i.test(
    value
  );
};

export const getAllClassListForCourseId = (classList, val) =>
  classList.find(({ id }) => id === val);
export const getClassListForclassVersionCourseId = (classVersions, val) =>
  classVersions.find(({ courseClassId }) => courseClassId === val);
export const getCourseVersionForCourseVersionId = (courseVersions, val) =>
  courseVersions.find(({ id }) => id === val);

export const checkClassType = (data, element, active) => {
  let colorClass = "btn-danger";
  data &&
    data.length &&
    data.map((item) => {
      if (
        item.course_class.course &&
        item.course_class.course.courseType === element &&
        item.isTrial &&
        (item.status.toLowerCase() === "confirmed" ||
          (item.isTrial && item.status.toLowerCase() === "started"))
      ) {
        colorClass = "btn-warning";
      } else if (
        item.course_class.course &&
        item.course_class.course.courseType === element &&
        item.isTrial &&
        item.status.toLowerCase() === "completed"
      ) {
        colorClass = "btn-success";
      }
    });
  (element === "ALL" || element === "PAST") && (colorClass = "btn-dark");
  return active === element ? `active ${colorClass}` : colorClass;
};

export const checkHours = (date) => {
  var currentTime = moment();
  var timeStore = moment(date);
  return currentTime.diff(timeStore, "h") < 24 ? true : false;
};
export const h__formatFileSize = (size) => {
  if (size >= 1) {
    return `${size} MB`;
  }
  return `${size * 1024} KB`;
};

export const h__trimLeft = (string) =>
  string ? string.replace(/^\s+/, "") : string;

export const dateSort = (a, b, field) => {
  let a1 = a && new Date(a[field]).getTime();
  var b1 = b && new Date(b[field]).getTime();
  if (a1 < b1) return 1;
  else if (a1 > b1) return -1;
  else return 0;
};

export const alphSort = (a, b, order) => {
  a && (a = a.toLowerCase());
  b && (b = b.toLowerCase());
  if (
    (a !== null || a !== undefined) &&
    (b !== null || b !== undefined) &&
    a === b
  ) {
    return 0;
  }
  // nulls sort after anything else
  else if (a === null || a === undefined) {
    return order ? -1 : 1;
  } else if (b === null || b === undefined) {
    return order ? 1 : -1;
  }
  // otherwise, if we're ascending, lowest sorts first
  else if (!order) {
    return a < b ? -1 : 1;
  }
  // if descending, highest sorts first
  else {
    return a > b ? 1 : -1;
  }
};

export const boolSort = (a, b, field) => {
  return a && a[field] === b && b[field] ? 0 : a && a[field] ? -1 : 1;
};

export const getTime = (value, hours, check) => {
  let return_val = value
    ? value
    : moment()
        .add(check, "hours")
        .startOf("hour")
        .utc()
        .toISOString();

  return moment(return_val)
    .set({ hours: hours })
    .utc()
    .toISOString();
};
export const arraySort = (arr, field) => {
  return arr.sort((a, b) =>
    a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0
  );
};

export const getOrderedCourseItems = (courseItems) => {
  return _orderBy(
    courseItems,
    ["course.courseType", "course.fromGrade", "classType"],
    ["asc", "asc", "desc"]
  );
};

export const checkTrueOrFalse = (value) => {
  return value.startsWith("y")
    ? "true"
    : value.startsWith("n")
    ? "false"
    : null;
};

export const checkStudentisTrial = (data, course) => {
  const selectedCourseData =
    data &&
    data.length > 0 &&
    data.filter(
      (item) =>
        _get(item, "course_class.course.courseType", null) === course &&
        _get(item, "isTrial", null) &&
        _get(item, "status", null) === "completed"
    );

  let latestTrial = {};

  if (selectedCourseData && selectedCourseData.length > 0) {
    latestTrial = selectedCourseData[0];
  }

  selectedCourseData &&
    selectedCourseData.map((item) => {
      latestTrial = moment(item.endTime).isSameOrAfter(latestTrial.endTime)
        ? item
        : latestTrial;
    });
  return { data: latestTrial, isTrial: latestTrial && latestTrial.isTrial };
};

export const capitalizeName = (name) =>
  name ? name.charAt(0).toUpperCase() + name.slice(1) : null;

export const calculateOneMonth = (fromDate, endTime) => {
  let afterOneMonthDate = moment(endTime).isSameOrBefore(
    moment(fromDate)
      .add(1, "month")
      .utc()
      .toISOString()
  )
    ? endTime
    : moment(fromDate)
        .add(1, "month")
        .utc()
        .toISOString();
  return afterOneMonthDate;
};

export const getMultipleRegionName = (regions = ["Global"]) => {
  return regions.join(",");
};

export const removeValueFromObject = (itemArray = {}, keys = []) => {
  keys.map((key) => {
    itemArray[key] && delete itemArray[key];
  });
  return itemArray;
};

export const isValidOneToOne = (student, course) => {
  if (
    course.isTrial === false &&
    course.credits > 0 &&
    (!course.course_item || course.course_item.classType === "ONE_TO_ONE") &&
    student.recordStatus === 1
  ) {
    return true;
  }
  return false;
};

export const checkRoleSuperAdminOrTechAdmin = (me) => {
  let roles = me.userRoles;
  for (let i in roles) {
    if (
      roles[i].toLowerCase() === "super_admin" ||
      roles[i].toLowerCase() === "tech_admin"
    ) {
      return true;
    }
  }
  return false;
};

export const temporaryToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIyLCJyb2xlcyI6W3siaWQiOjEsInJlY29yZFN0YXR1cyI6MSwiY3JlYXRlZEF0IjpudWxsLCJ1cGRhdGVkQXQiOm51bGwsInVzZXJJZCI6MjIsInJvbGVJZCI6MX0seyJpZCI6MjQsInJlY29yZFN0YXR1cyI6MSwiY3JlYXRlZEF0IjoiMjAyNC0wOC0yOVQxMDowOTo0My43OTFaIiwidXBkYXRlZEF0IjoiMjAyNC0wOC0yOVQxMDowOTo0My43OTFaIiwidXNlcklkIjoyMiwicm9sZUlkIjoyfSx7ImlkIjo2MSwicmVjb3JkU3RhdHVzIjoxLCJjcmVhdGVkQXQiOiIyMDI0LTA5LTAyVDE0OjExOjEwLjIyMVoiLCJ1cGRhdGVkQXQiOiIyMDI0LTA5LTAyVDE0OjExOjEwLjIyMVoiLCJ1c2VySWQiOjIyLCJyb2xlSWQiOjN9XSwiaWF0IjoxNzI1ODczMDgwLCJleHAiOjE3MjU4NzY2ODB9.VD1tIZHyUV_BwVSYh7-5qXN5unxItNMQ9tVhOZm09KU";
