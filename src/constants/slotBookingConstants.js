import moment from "moment-timezone";

export const START_TIME = moment()
  .startOf("day")
  .utc()
  .toISOString();

export const END_TIME = moment()
  .endOf("day")
  .utc()
  .toISOString();

export const FROMDATE_LIMIT = moment()
  .subtract(42, "month")
  .utc()
  .toISOString();
