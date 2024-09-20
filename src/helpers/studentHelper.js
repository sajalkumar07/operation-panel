import React from "react";
import { path } from "ramda";
import { Link } from "react-router-dom";
import MobileAction from "../components/MobileAction/MobileAction";
import moment from "moment";

import MaterialTable from "material-table";
import { matTableColumnOptions } from "../helpers/utils";
import { get as _get } from "lodash";
import { DEFAULT_STUDENT_CALL_LOG_PARAM } from "../constants/commonConstants";
export const PROJECT_STATUS = {
  ASSIGNED: "assigned",
  PENDING_TEACHER: "pending_teacher",
  PENDING_STUDENT: "pending_student",
  COMPLETED: "completed",
  SUBMITTED: "submission_success",
  SUBMISSION_FAILED: "submission_failed"
};

export const PROJECT_STATUS_OPTIONS = [
  { label: "ALL", value: "" },
  { label: "ASSIGNED", value: "assigned" },
  { label: "PENDING (with Student)", value: "pending_student" },
  { label: "PENDING (With Teacher)", value: "pending_teacher" },
  { label: "COMPLETED", value: "completed" }
];

export const formatProjectStatus = status => {
  switch (status) {
    case PROJECT_STATUS["ASSIGNED"]: {
      return "Assigned";
    }
    case PROJECT_STATUS["PENDING_STUDENT"]:
    case PROJECT_STATUS["SUBMISSION_FAILED"]: {
      return "Pending (with Student)";
    }
    case PROJECT_STATUS["PENDING_TEACHER"]:
    case PROJECT_STATUS["SUBMITTED"]: {
      return "Pending (With Teacher)";
    }
    case PROJECT_STATUS["COMPLETED"]: {
      return "Completed";
    }
    default:
      return status;
  }
};

const maxStudentLength = 2;

const getStudentItem = (
  data,
  studentBooking,
  confirmCall,
  masking = true,
  sourceView = ""
) => {
  const name = path(["student", "name"], studentBooking);
  const mobile = path(["student", "mobile"], studentBooking);
  const email = path(["student", "email"], studentBooking);
  const timezone = path(["student", "timezone"], studentBooking);
  const dialCode = path(["student", "dialCode"], studentBooking);
  const countryCode = path(["student", "countryCode"], studentBooking);
  const status = path(["status"], studentBooking);
  const sId = path(["student", "id"], studentBooking);
  let callProvider = dialCode === "+91" ? "EXOTEL" : "PLIVO";
  return (
    <div
      className={`d-flex flex-column mb-2 ${
        status === "cancelled" && data.student_bookings.length > 1
          ? "text-decoration-line-through"
          : ""
      }`}
      key={sId}
    >
      <Link to={`/students/${sId}`}>{name}</Link>
      <span>{countryCode}</span>
      <Link
        target={"_blank"}
        to={`/student/call-logs/${sId}?sourceView=${sourceView}&${DEFAULT_STUDENT_CALL_LOG_PARAM}&callProvider=${callProvider}&checked=true`}
      >
        <MobileAction mobile={mobile} masking={masking} />
      </Link>

      {/*{confirmCall ? (*/}
      {/*  <span*/}
      {/*    onClick={() => {*/}
      {/*      confirmCall(*/}
      {/*        { to: email, timezone, dialCode },*/}
      {/*        "Do you want to call student?"*/}
      {/*      );*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <MobileAction mobile={mobile} masking={masking} />*/}
      {/*  </span>*/}
      {/*) : (*/}
      {/*  <span>*/}
      {/*    {dialCode}*/}
      {/*    {mobile}*/}
      {/*  </span>*/}
      {/*)}*/}
      <span>{email}</span>
    </div>
  );
};

export const getStudentBookingsTable = (
  studentsData,
  confirmCall,
  masking = true
) => {
  const studentTable = {
    title: "Student Bookings",
    columns: [
      {
        title: "Name",
        field: "student.name"
      },
      {
        title: "Phone Number",
        field: "student",
        render: ({ student }) => {
          let dialCode = _get(student, "dialCode", "");
          let callProvider = dialCode === "+91" ? "EXOTEL" : "PLIVO";
          return (
            <Link
              target={"_blank"}
              to={`/student/call-logs/${student.id}?${DEFAULT_STUDENT_CALL_LOG_PARAM}&callProvider=${callProvider}`}
            >
              <MobileAction mobile={student.mobile} masking={true} />
            </Link>
          );
          // if (confirmCall) {
          //   return (
          //     <span
          //       onClick={() => {
          //         confirmCall(
          //           {
          //             to: student.email,
          //             timezone: student.timezone,
          //             dialCode: student.dialCode
          //           },
          //           "Do you want to call student?"
          //         );
          //       }}
          //     >
          //       <MobileAction mobile={student.mobile} masking={true} />
          //     </span>
          //   );
          // } else
          //   return (
          //     <span>
          //       {student.dialCode}
          //       {student.mobile}
          //     </span>
          //   );
        }
      },
      {
        title: "Email",
        field: "student.email"
      },
      {
        title: "Country Code",
        field: "student.country_code"
      },
      {
        title: "Credits",
        render: ({ student }) => _get(student, "student_courses.0.credits", "")
      },
      {
        title: "Action",
        field: "student",
        render: ({ student }) => {
          return <Link to={`/students/${student.id}`}>Details</Link>;
        }
      }
    ],
    data: studentsData
  };
  return (
    <MaterialTable
      title={""}
      columns={matTableColumnOptions(studentTable.columns)}
      data={studentTable.data}
      options={{
        search: false,
        toolbar: false
      }}
    />
  );
};

export let getStudentDetailsDisplay = ({
  data,
  confirmCall,
  masking = true,
  showMoreCb,
  sourceView = ""
}) => {
  const showMoreStyle = {
    color: "#037bfe",
    "text-decoration": "underline",
    cursor: "pointer"
  };
  const studentBookingsLength =
    data && data.student_bookings && data.student_bookings.length
      ? data.student_bookings.length
      : 0;

  if (studentBookingsLength) {
    return !showMoreCb ? (
      data.student_bookings.map(i => {
        return getStudentItem(data, i, confirmCall, masking, sourceView);
      })
    ) : (
      <div>
        {data.student_bookings.slice(0, maxStudentLength).map(i => {
          return getStudentItem(data, i, confirmCall, masking, sourceView);
        })}
        {studentBookingsLength > maxStudentLength && (
          <div style={showMoreStyle} onClick={() => showMoreCb(data)}>
            +{studentBookingsLength - maxStudentLength}
          </div>
        )}
      </div>
    );
  }
};

export const formatProjectStatusWithIcon = status => {
  switch (status) {
    // assigned/ pending_teacher/pending_student/completed  --new
    // assigned, submitted, resubmission_required, query_pending, completed  ---old
    case PROJECT_STATUS["ASSIGNED"]: {
      return (
        <div className="">
          <span>Assigned</span>
        </div>
      );
    }
    case PROJECT_STATUS["PENDING_TEACHER"]: {
      return (
        <div className="text_orange">
          <span className="icon-filled-warning mr-2"></span>
          <span>Pending (with Teacher)</span>
        </div>
      );
    }
    case PROJECT_STATUS["PENDING_STUDENT"]: {
      return (
        <div className="text_orange">
          <span className="icon-filled-warning mr-2"></span>
          <span>Pending (with Student)</span>
        </div>
      );
    }

    case PROJECT_STATUS["SUBMITTED"]: {
      return "Project Submitted";
    }

    case PROJECT_STATUS["COMPLETED"]: {
      return (
        <div className="d-flex align-items-center">
          <div className="check_mark_box bg_blue mr-1">
            <span className="icon-check-mark-black-outline text-white heading6_reg"></span>
          </div>
          <div>Completed</div>
          <div className="icon-share text_blue ml-auto mr-3 font24"></div>
        </div>
      );
    }

    default:
      return status;
  }
};

export const checkSearchFields = (
  email,
  mobile,
  studentName,
  parentName,
  leadsFromDate,
  leadsToDate,
  formsFromDate,
  formsToDate
) => {
  return !!(
    email === "" &&
    mobile === "" &&
    ((studentName && studentName.length < 3 && !parentName) ||
      (parentName && parentName.length < 3 && !studentName) ||
      (studentName &&
        studentName.length < 3 &&
        parentName &&
        parentName.length < 3) ||
      (leadsFromDate &&
        leadsToDate &&
        Math.abs(moment(leadsFromDate).diff(moment(leadsToDate), "months")) >
          0) ||
      (formsToDate &&
        formsToDate &&
        Math.abs(moment(formsFromDate).diff(moment(formsToDate), "months")) >
          0))
  );
};
export const getStudentAddress = student => {
  let result =
    "Please update the shipping address before generating the payment link";
  if (student && student.userAddresses.length) {
    let userAddress = student.userAddresses.filter(
      ({ addressType }) => addressType === "shipping"
    );
    if (userAddress && userAddress.length) {
      const addressLine1 = path(["addressLine1"], userAddress[0]);
      const addressLine2 = path(["addressLine2"], userAddress[0]);
      const city = path(["city"], userAddress[0]);
      const country = path(["country"], userAddress[0]);
      const landmark = path(["landmark"], userAddress[0]);
      const state = path(["state"], userAddress[0]);
      const zipCode = path(["zipCode"], userAddress[0]);
      result = (
        addressLine1 +
        " " +
        addressLine2 +
        " " +
        landmark +
        " " +
        city +
        " " +
        state +
        " " +
        country +
        " " +
        zipCode +
        " "
      ).toString();
    }
  }
  return result;
};

export const getAutoGenerateEmail = ({ mobile = "" }) => {
  if (mobile && mobile.length) {
    return `customer+${mobile}@whitehatjrstudents.com`;
  }
};

export const getCRMUTMParams = (email, courseType) => {
  return {
    courseType,
    utm_source: "crm_user",
    utm_campaign: "crm_user",
    utm_content: email
  };
};
export const sendEvents = ({
  userId,
  eventName,
  eventSource,
  s3 = null,
  s4 = null,
  s5 = null,
  tc = null,
  b1 = null,
  b2 = null,
  n1 = null,
  n2 = null,
  s3SchemaName,
  s4SchemaName,
  s5SchemaName
}) => {
  let eventDetails = {
    eventName: eventName,
    eventSource: eventSource,
    data: { userId, s3, s4, s5, tc, b1, b2, n1, n2 },
    schema: {
      //don't use s1, its reserved for userId
      //don't use s2, its reserved ofr eventSource
      userId: "s1",
      eventSource: "s2",
      [s3SchemaName || "s3"]: "s3",
      [s4SchemaName || "s4"]: "s4",
      [s5SchemaName || "s5"]: "s5",
      s3: "s3",
      s4: "s4",
      s5: "s5",
      tc: "tc",
      b1: "b1",
      b2: "b2",
      n1: "n1",
      n2: "n2"
    }
  };
  return eventDetails;
};

export const checkAutoGenerateEmail = (mobile = "", validateMobile = false) => {
  return validateMobile
    ? mobile && mobile.length === 10
    : mobile && mobile.length;
};
