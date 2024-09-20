import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { getErrorMessage, getIsSubmitting } from "../../reducers";
import connect from "react-redux/es/connect/connect";
import LoginWithPassword from "./LoginWithPassword";
import { config } from "../../config";
import _get from "lodash/get";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    width: "100%"
  },
  dense: {
    marginTop: 19
  },
  otpBorderBox: {
    borderRadius: 4,
    border: "solid 1px #eeee",
    backgroundColor: " #fdfafa",
    padding: "5px 10px",
    fontSize: 13
  },
  horizontalLine: {
    width: "90px",
    height: "1px",
    border: "solid 1px #e3e3e3"
  },
  requestLink: {
    cursor: "pointer"
  },
  requestLinkContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    fontFamily: "Muli-Bold",
    fontSize: "0.875em"
  },
  signUp: {
    cursor: "pointer",
    fontFamily: "Muli-Bold",
    fontSize: "0.875em",
    margin: "1em 0 0"
  },
  submit: {
    marginTop: theme.spacing(3),
    padding: "8px 50px",
    border: "1px solid #ff6400",
    backgroundColor: "#ff6400",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.27)",
    color: "#fff",
    borderRadius: "35px",
    outline: "none!important",
    "&:hover": {
      backgroundColor: "#ff6400"
    },
    "&:disabled": {
      backgroundColor: "#ff6400",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.27)",
      cursor: "not-allowed"
    }
  },
  modalPopUp: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
    margin: "0 auto",
    width: "350px"
  },
  backDrop: {
    backgroundColor: "rgba(0, 0, 0, 0.85)"
  }
});

const RegisterForm = props => {
  const [loginType, setLoginType] = useState("otp");
  const otherLogin = _get(config, "otherLogin", false);
  return (
    <>
      <LoginWithPassword {...props} setLoginType={setLoginType} />
    </>
  );
};

const mapStateToProps = state => {
  return {
    isSubmitting: getIsSubmitting(state, true),
    errorMessage: getErrorMessage(state, true)
  };
};

export default connect(mapStateToProps, null)(withStyles(styles)(RegisterForm));
