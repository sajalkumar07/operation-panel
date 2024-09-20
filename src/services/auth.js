import { addAuthToken } from "./index";
import moment from "moment";
const tokenKey = "tk";
const localStorage = window.localStorage;

// eslint-disable-line

export const SET_AUTH = data => {
  const { token, userRoles, email } = data;
  localStorage.setItem(tokenKey, JSON.stringify({ token: token }));
  localStorage.setItem("roles", JSON.stringify(userRoles[0]));
  localStorage.setItem("name", JSON.stringify(email));
  localStorage.setItem("loggedIn", JSON.stringify(true));
  localStorage.setItem(
    "systemTime",
    JSON.stringify(Math.floor(new Date() / 1000))
  );
  addAuthToken();
};

export const REMOVE_AUTH = () => {
  localStorage.removeItem("concentrixGETurl");
  localStorage.removeItem(tokenKey);
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("roles");
  localStorage.removeItem("name");
  localStorage.removeItem("showPopup");
  localStorage.removeItem("systemTime");
  localStorage.removeItem("lastLoginPopupDate");
  addAuthToken();
};

export const GET_AUTH = () => {
  try {
    let flag = null;
    const cachedHits = localStorage.getItem(tokenKey);
    let systemTime = localStorage.getItem("systemTime");
    if (cachedHits) {
      let tokenData = JSON.parse(cachedHits);
      if (systemTime) {
        let systemIdealTime = new Date(systemTime * 1000);
        let currentTime = new Date();
        var ms = moment(currentTime, "DD/MM/YYYY HH:mm:ss").diff(
          moment(systemIdealTime, "DD/MM/YYYY HH:mm:ss")
        );
        if (ms > 2400000) {
          REMOVE_AUTH();
        } else {
          localStorage.setItem(
            "systemTime",
            JSON.stringify(Math.floor(new Date() / 1000))
          );
          flag = tokenData.token;
        }
      } else {
        REMOVE_AUTH();
      }
    }
    return flag;
  } catch (e) {
    return null;
  }
};

export const isAuthenticated = () => {
  if (GET_AUTH()) {
    return true;
  }
  return false;
};
