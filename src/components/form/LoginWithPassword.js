import React, { Fragment, useState, useEffect, lazy, Suspense } from "react";
import FormTextField from "./FormTextField";
import { withStyles } from "@material-ui/core/styles";
import { getErrorMessage, getIsSubmitting } from "../../reducers";
import connect from "react-redux/es/connect/connect";
import Button from "@material-ui/core/Button";
import ReCaptcha from "../ReCaptcha";
import _get from "lodash/get";
import { config } from "../../config";
import Loader from "../common/Loader";

const GoogleLoginForm = lazy(() => import("./GoogleLoginForm"));

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
  backDrop: {
    backgroundColor: "rgba(0, 0, 0, 0.85)"
  }
});
const emailValidation = email => {
  let flag = false;
  if (email.indexOf("@") === -1) {
    flag = true;
  }
  return flag;
};
const LoginWithPassword = props => {
  const {
    values,
    errors,
    touched,
    classes,
    handleSubmit,
    handleChange,
    setFieldTouched,
    reduxIsSubmitting,
    submitCount,
    setLoginType,
    isValid,
    loginErrorDetails,
    onCaptchaTokenChange,
    captchaToken
  } = props;

  const change = (name, flgBlur, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  const [showCaptcha, setShowCaptcha] = useState(false);
  const [refreshCaptcha, setRefreshCaptcha] = useState(false);

  const RATE_LIMIT_ERR_CODE = "RATELIMIT_ERROR";
  const CAPTCHA_INVALID_ERR_CODE = "CAPTCHA_INVALID_ERROR";

  useEffect(() => {
    if (loginErrorDetails.code === RATE_LIMIT_ERR_CODE) {
      setShowCaptcha(true);
    }
    if (
      loginErrorDetails.code === CAPTCHA_INVALID_ERR_CODE ||
      (captchaToken && loginErrorDetails.code === 400)
    ) {
      setRefreshCaptcha(true);
    }
  }, [loginErrorDetails, !showCaptcha]);

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit}
        noValidate="novalidate"
        className={classes.container}
      >
        <FormTextField
          label="Email"
          id="userIdentifier"
          onChange={change}
          errors={errors}
          touched={touched}
          submitCount={submitCount}
          values={values.emailOrMobile}
        />
        <FormTextField
          type="password"
          label="Password"
          id="passcode"
          onChange={change}
          errors={errors}
          touched={touched}
          submitCount={submitCount}
          values={values.password}
        />
        {showCaptcha && (
          <div className="pos_rel d-flex justify-content-center mt-1 mb-0">
            <ReCaptcha
              getCaptchaToken={token => {
                onCaptchaTokenChange(token);
                setRefreshCaptcha(false);
              }}
              captchaRefresh={refreshCaptcha}
            />
          </div>
        )}
        <div className="text-center mt-1 mb-0">
          <Button
            // disabled={
            //   emailValidation(values.emailOrMobile) ||
            //   reduxIsSubmitting ||
            //   !isValid ||
            //   (showCaptcha && !captchaToken)
            // }
            className={classes.submit}
            type={"submit"}
          >
            Login
          </Button>
        </div>
      </form>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    isSubmitting: getIsSubmitting(state, true),
    errorMessage: getErrorMessage(state, true),
    loginErrorDetails: state.authUser.errorDetails
  };
};

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(LoginWithPassword));
