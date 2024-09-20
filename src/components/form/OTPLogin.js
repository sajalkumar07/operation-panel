import React, { Fragment, useState, useEffect, lazy, Suspense } from "react";
import FormTextField from "./FormTextField";
import { withStyles } from "@material-ui/core/styles";
import { sendOTP, resendOTP, verifyOTPAction } from "../../actions";
import { getErrorMessage, getIsSubmitting } from "../../reducers";
import connect from "react-redux/es/connect/connect";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import find from "ramda/src/find";
import countryCodes from "../../constants/CountryCode";
import MenuItem from "@material-ui/core/MenuItem";
import { dispatchWithRequest } from "../../actions";
import {
  validateNullInput,
  getDialAndCountryCode,
  formatCountryMobile,
  validateInputNumber
} from "../../helpers/utils";
import Timer from "../Timer";
import ReCaptcha from "../ReCaptcha";
import SnackBarCustom from "../../components/snackbar/snackbar";
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
    padding: "8px 35px !important",
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
  },
  googleLoginBtn: {
    backgroundColor: "#ff6400 !important",
    padding: "2px 12px !important",
    border: "1px solid #ff6400 !important",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.27) !important",
    color: "#fff !important",
    borderRadius: "35px !important",
    outline: "none!important !important",
    fontSize: "12px !important"
  }
});

const OTPLogin = props => {
  const {
    values,
    errors,
    touched,
    classes,
    handleSubmit,
    handleChange,
    submitCount,
    getOTP,
    resendOTP,
    getVerifyOTP,
    setLoginType,
    onCaptchaTokenChange,
    captchaToken,
    errorMessage,
    errorDetails,
    otp
  } = props;
  const [OTPTimeOutTime, setOTPTimeOutTime] = useState(50);
  const [state, setState] = useState({
    mobile: "",
    dialCode: "+91",
    inputOTP: "",
    isOtpSentReq: false,
    showOtpValidationScreen: false
  });

  const [snackBar, setSnackBar] = useState({
    open: false,
    message: ""
  });

  const [showCaptcha, setShowCaptcha] = useState(false);
  const [refreshCaptcha, setRefreshCaptcha] = useState(false);
  const [challenge, setChallenge] = useState("");
  const RATE_LIMIT_ERR_CODE = "RATELIMIT_ERROR";
  const CAPTCHA_INVALID_ERR_CODE = "CAPTCHA_INVALID_ERROR";

  useEffect(() => {
    setChallenge(otp.challenge);
    setState({ ...state, showOtpValidationScreen: otp.showValidation });
  }, [otp]);

  useEffect(() => {
    setShowCaptcha(false);
  }, [otp.showCaptcha]);

  useEffect(() => {
    if (errorDetails.code === RATE_LIMIT_ERR_CODE) {
      setShowCaptcha(true);
    }
    if (
      errorDetails.code === CAPTCHA_INVALID_ERR_CODE ||
      (captchaToken && errorDetails.code === 400)
    ) {
      setRefreshCaptcha(true);
    }
  }, [errorDetails]);

  const change = (name, flgBlur, e) => {
    handleChange(e);
  };
  const sendOtp = ({ mobile, dialCode, captchaToken }) => {
    setOTPTimeOutTime(50);
    setState({
      mobile: mobile,
      dialCode: dialCode,
      isOtpSentReq: true
    });
    setShowCaptcha(false);
    getOTP({
      dialCode: dialCode,
      emailOrMobile: mobile,
      captchaToken: captchaToken
    });
  };

  const resendOtp = challenge => {
    resendOTP({
      dialCode: state.dialCode,
      emailOrMobile: state.mobile,
      challenge: challenge
    });
  };
  const changeOtp = val => {
    setState({ ...state, inputOTP: val });
  };
  const submitOtp = () => {
    setShowCaptcha(false);
    getVerifyOTP({
      emailOrMobile: state.mobile,
      token: state.inputOTP,
      challenge: challenge
    });
  };
  const changeNumber = () => {
    setState({ ...state, isOtpSentReq: false, showOtpValidationScreen: false });
  };
  if (!values.dialCode) values.dialCode = "+91";
  return (
    <Fragment>
      <form
        onSubmit={handleSubmit}
        noValidate="novalidate"
        className={classes.container}
      >
        {state.showOtpValidationScreen ? (
          <Fragment>
            {validateNullInput(state.dialCode, state.mobile) && (
              <div className={classes.otpBorderBox}>
                <div className={"text_gray"}>We have sent you a PIN on</div>
                <div
                  className={
                    "d-flex align-items-center justify-content-between"
                  }
                >
                  <span className={"text_gray"}>
                    {" "}
                    {` ${
                      state.dialCode
                        ? getDialAndCountryCode(state.dialCode).dialCode
                        : ""
                    } - ${formatCountryMobile(state.mobile, state.dialCode)}`}
                  </span>
                  <span
                    className={"text_gray font12 cursor_pointer"}
                    onClick={() => changeNumber()}
                  >
                    Change number
                  </span>
                </div>
              </div>
            )}
            <div className="pos_rel">
              <TextField
                fullWidth={true}
                label={"Enter PIN"}
                name={"inputOTP"}
                value={values.inputOTP}
                onChange={e => {
                  changeOtp(e.target.value);
                }}
                margin="dense"
              />
              <div style={{ position: "absolute", right: 0, top: 25 }}>
                <Timer
                  startTimeInSeconds={OTPTimeOutTime}
                  showResendButton={true}
                  onResendClick={() => resendOtp(challenge)}
                />
              </div>
            </div>
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
            <Button className={classes.submit} onClick={() => submitOtp()}>
              Login
            </Button>
          </Fragment>
        ) : (
          <div>
            <div className="d-flex">
              <TextField
                label="Dial Code"
                name="dialCode"
                className="mr-2"
                select
                fullWidth
                onChange={e => {
                  handleChange(e);
                  let { countryIsoCode } = find(
                    ({ dial_code }) => dial_code === e.target.value,
                    countryCodes
                  );
                }}
                value={values.dialCode || ""}
                margin="normal"
              >
                <MenuItem key="" value="" disabled>
                  --- Select Dial Code ---
                </MenuItem>
                {countryCodes
                  .slice(1)
                  .map(({ countryIsoCode, dial_code, name }) => (
                    <MenuItem key={countryIsoCode} value={dial_code}>
                      {`${name} ${dial_code}`}
                    </MenuItem>
                  ))}
              </TextField>
              <FormTextField
                label="Mobile Number"
                id="mobile"
                name="mobile"
                onChange={change}
                errors={errors}
                touched={touched}
                submitCount={submitCount}
                values={values.mobile}
              />
            </div>
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
            <div className="text-center mt-4 mb-2">
              <Button
                className={`${classes.submit} bg_blue w-100`}
                type={"submit"}
                disabled={
                  !validateInputNumber(values.dialCode, values.mobile) ||
                  (showCaptcha && !captchaToken)
                }
                title={"Enter Mobile Number and Country Code"}
                onClick={() =>
                  sendOtp({
                    mobile: values.mobile,
                    dialCode: values.dialCode,
                    captchaToken: captchaToken
                  })
                }
              >
                {!validateInputNumber(values.dialCode, values.mobile)
                  ? "Login"
                  : "Send OTP"}
              </Button>
            </div>
          </div>
        )}
      </form>
      <section>
        <div className={"d-flex align-items-center justify-content-center m-3"}>
          <span className={`${classes.horizontalLine} d-inline `} />
          <span className={"p-2 text_gray_light font14"}>Or</span>
          <span className={`${classes.horizontalLine}`} />
        </div>

        <div className="text-center  p-2">
          <div
            className={`${classes.submit} bg_orange font14`}
            onClick={() => {
              setLoginType("password");
            }}
          >
            LOGIN WITH PASSWORD (External Domain)
          </div>
        </div>

        {_get(config, "allowGmailLogin") ? (
          <>
            <div
              className={"d-flex align-items-center justify-content-center m-3"}
            >
              <span className={`${classes.horizontalLine} d-inline `} />
              <span className={"p-2 text_gray_light font14"}>Or</span>
              <span className={`${classes.horizontalLine}`} />
            </div>
            <Suspense fallback={<Loader />}>
              <GoogleLoginForm />
            </Suspense>
          </>
        ) : null}
      </section>
      <SnackBarCustom
        snackObj={snackBar}
        onClose={() => setSnackBar({ ...snackBar, open: false, message: "" })}
      />
    </Fragment>
  );
};
const mapDispatchToProps = dispatchWithRequest((dispatch, req) => {
  return {
    getOTP: data => {
      dispatch(sendOTP.request(data));
    },
    getVerifyOTP: data => {
      dispatch(verifyOTPAction.request(data));
    },
    resendOTP: data => {
      dispatch(resendOTP.request(data));
    }
  };
});

const mapStateToProps = state => {
  return {
    isSubmitting: getIsSubmitting(state, true),
    errorMessage: getErrorMessage(state, true),
    errorDetails: state.authUser.errorDetails,
    otp: state.authUser.otpData
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(OTPLogin));
