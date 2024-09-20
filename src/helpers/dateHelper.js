import moment from "moment-timezone/builds/moment-timezone-with-data";
import { compose, curry } from "ramda";
import { object } from "prop-types";
import _ from "lodash";
const WeekDays = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thrusday",
  5: "Friday",
  6: "Saturday",
  7: "Sunday"
};
let timeZone = moment.tz.guess();

export const getSortedbyDayofWeek = object => {
  return _.sortBy(object, o => o.dayOfWeek)[0];
};

export const getRecurringDays = (dayOfWeek = 1, weeks = 3) => {
  let str = "";
  if (moment().isoWeekday() <= dayOfWeek) {
    str =
      str +
      moment()
        .isoWeekday(dayOfWeek)
        .format("Do MMM");
  }
  for (let i = 1; i <= weeks; i++) {
    str =
      str +
      ", " +
      moment()
        .add(i, "weeks")
        .isoWeekday(dayOfWeek)
        .format("Do MMM");
  }
  return str + "...";
};

export const setTimeZone = userTimeZone => {
  timeZone = userTimeZone;
};

export const getTimeZone = () => {
  return timeZone;
};

const getTZDate = date => {
  return moment(date).tz(timeZone);
};
/**
 * Convert the date to format string
 * @param {date} date
 */
export const format = date => getTZDate(date).format("YYYY-MM-DD");

/**
 * Get Start date of week for the date i.e. Monday
 * @param {Date} date
 */
export const startOfWeek = date => getTZDate(date).startOf("isoWeek");

/**
 * Get End date of week for the date i.e. Sunday
 * @param {Date} date
 */
export const endOfWeek = date => getTZDate(date).endOf("isoWeek");

/**
 * Get Monday of week w.r.t to date
 * @param {Date} date
 * @param {Number of weeks} weeks
 */
export const nextWeekMonday = (date, weeks) =>
  getTZDate(date).isoWeekday(7 * weeks + 1);

/**
 * Gets Start and End date of the week
 * @param {Any Date of the week} date
 */
export const weeklyDateRange = date => {
  return {
    startDate: compose(format, startOfWeek)(date),
    endDate: compose(format, endOfWeek)(date)
  };
};

/**
 * Get Date Range of next number of week w.r.t to date
 * @param {date w.r.t which weeks date is required} date
 * @param {count of weeks} weeks
 */
export const nextWeekDates = compose(weeklyDateRange, nextWeekMonday);

/**
 * Differnce in days
 * @param {Base date} date
 * @param {Relative Date} relDate
 */
export const dateDiff = (date, relDate) =>
  getTZDate(date).diff(getTZDate(relDate), "days");

/**
 * Returns Greater of both dates
 * @param {base Date} date
 * @param {Date to compare with} relDate
 */
export const getGreaterDate = (date, relDate) =>
  dateDiff(date, relDate) < 0 ? relDate : date;

/**
 * Returns Smaller of both dates
 * @param {base Date} date
 * @param {Date to compare with} relDate
 */
export const getSmallerDate = (date, relDate) =>
  dateDiff(date, relDate) < 0 ? date : relDate;

/**
 * Get Difference in Weeks
 * @param {Start Date} startDate
 * @param {End Date} endDate
 */
export const diffWeeks = (startDate, endDate, flgAbsolute = false) =>
  moment(compose(format, endOfWeek)(endDate)).diff(
    compose(format, startOfWeek)(startDate),
    "weeks",
    flgAbsolute
  );

/**
 * Get all the start and End Date of weeks between date range
 * @param {start Date} startDate
 * @param {end Date} endDate
 */
export const allWeeksBetweenDates = (startDate, endDate) => {
  const weeks = [...Array(Math.ceil(diffWeeks(startDate, endDate, true)))];
  const curriedNextWeekDates = curry(nextWeekDates)(startDate);
  const curriedGetGreaterDate = curry(getGreaterDate)(startDate);
  const curriedGetSmallerDate = curry(getSmallerDate)(endDate);

  return weeks.map((val, index) => {
    const dateRange = curriedNextWeekDates(index);
    return {
      startDate: curriedGetGreaterDate(dateRange.startDate),
      endDate: curriedGetSmallerDate(dateRange.endDate)
    };
  });
};

/**
 * Compare the time in HH:mm format
 * @param {base time} time
 * @param {relative time against which needs to compare} relTime
 */
export const compareTimeHours = (date, relDate) =>
  getTZDate(date).diff(getTZDate(relDate), "hours") < 0;

export const diffTimeMinutes = (time, relTime) =>
  moment(time, "HH:mm").diff(moment(relTime, "HH:mm"), "minutes");

/**
 * Return the formatted time
 * @param {time} time
 * @param {Format to which needs to be formatted} format
 */
export const byFormat = (date, format) => getTZDate(date).format(format);

/**
 * check if date in between 2 dates
 * @param {base date} date
 * @param {start date to compare} startDate
 * @param {end date to compare } endDate
 */
export const isBetweenDates = (date, startDate, endDate) => {
  return (
    moment(format(date)).diff(moment(format(startDate)), "days") >= 0 &&
    moment(format(date)).diff(moment(format(endDate)), "days") <= 0
  );
};

/**
 * check if date in between 2 dates
 * @param {base date} date
 * @param {start date to compare} startDate
 * @param {end date to compare } endDate
 */
export const isSameDay = (date, startDate) => {
  return format(date) === format(startDate);
};

/**
 * Return the formatted date
 * @param {time} time
 * @param {Format to which needs to be formatted} format
 */
export const today = () =>
  moment()
    .tz(timeZone)
    .format("YYYY-MM-DD");

/**
 * Return the formatted date
 * @param {time} time
 * @param {Format to which needs to be formatted} format
 */
export const currentTime = () =>
  moment()
    .tz(timeZone)
    .format("HH:mm");

/**
 * Diff in days with current date
 * @param {Base Date} date
 */
export const compareWithCurrent = date => dateDiff(getTZDate(date), today());

export const uiFirendlyFormat = (date, format) =>
  getTZDate(date).format(format);

export const currentDateTime = () =>
  moment()
    .tz(timeZone)
    .format("YYYY-MM-DDTHH:mm");

export const getDayOfWeek = date => WeekDays[getTZDate(date).isoWeekday()];

export const addDays = (date, days) => getTZDate(date).add(days, "days");
