import * as moment from "moment";

let getBookingStatus = function({
  trialSlot,
  status,
  cp,
  studentId,
  isTrial,
  ncReasonCode
}) {
  if (
    (trialSlot && status === "expired" && cp === 0) ||
    (studentId && status === "cancelled")
  ) {
    return "Not booked";
  } else if (trialSlot && status === "expired" && cp > 0) {
    return "NSA";
  } else if (trialSlot && cp === 0) {
    return "Booking expected";
  } else if (trialSlot && cp > 0) {
    return "Trial booked";
  } else if (isTrial && status === "completed") {
    return "Trial completed";
  } else if (status === "completed") {
    return "Paid completed";
  } else if (isTrial && status === "not_completed") {
    return "Trial " + ncReasonCode;
  } else if (status === "not_completed") {
    return "Paid " + ncReasonCode;
  } else if (isTrial && status === "started") {
    return "Trial booking started";
  } else if (isTrial) {
    return "Trial booked";
  } else {
    return "Paid booked";
  }
};

export let getPenalty = ({ payments }) => {
  if (payments) {
    return payments.credit;
  }
  return 0;
};

export let getNcReasonCode = ({ status, ncReasonCode }) => {
  if (ncReasonCode && ncReasonCode != null && status != "confirmed") {
    return ncReasonCode;
  }
  return "";
};
export let getNcReasonDesc = ({ status, ncReasonDesc }) => {
  if (ncReasonDesc && ncReasonDesc != null && status != "confirmed") {
    return ncReasonDesc;
  }
  return "";
};
export let getRemark = ({ status, remark }) => {
  if (remark && remark != null && status != "confirmed") {
    return remark;
  }
  return "";
};

export let getCapacity = ({ cp, booking }) => {
  if (booking && booking.cp >= 0) {
    return booking.cp;
  }
  return cp >= 0 ? cp : "-";
};

const NC_REASON_CODE_MAP = {
  TEACHER_ABSENT: "TNSA",
  STUDENT_ABSENT: "NSA",
  STUDENT_TECH_ISSUE: "NST",
  TEACHER_TECH_ISSUE: "TNST"
};

export let getSlotStatus = ({ status, booking }) => {
  if (
    booking &&
    booking.status !== "cancelled" &&
    booking.status !== "not_completed"
  ) {
    return getBookingStatus(booking);
  } else {
    if (
      status === "cancelled" &&
      booking &&
      booking.ncReasonCode &&
      ["cancelled", "not_completed"].includes(booking.status) &&
      moment.utc(booking.startTime).isBefore(moment.utc())
    ) {
      return NC_REASON_CODE_MAP[booking.ncReasonCode];
    } else {
      switch (status) {
        case "expired":
          return "Not booked";
        case "cancelled":
          return "Slot cancelled";
        default:
          return "Open";
      }
    }
  }
};
