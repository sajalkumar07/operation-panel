import React, { Fragment, useState } from "react";

import { withStyles } from "@material-ui/core/styles";
import { sendOTP, verifyOTPAction, loginWithGoogle } from "../../actions";
import { getErrorMessage, getIsSubmitting } from "../../reducers";
import connect from "react-redux/es/connect/connect";
import { dispatchWithRequest } from "../../actions";
import GoogleLogin from "react-google-login";
import { config } from "../../config";
import Alert from "../common/Alert";
const googleClientId = config.google_client_id;
const styles = theme => ({
  googleLoginBtn: {
    width: "100%",
    backgroundColor: "#ff6400 !important",
    padding: "2px 12px !important",
    border: "1px solid #ff6400 !important",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.27) !important",
    color: "#fff !important",
    borderRadius: "35px !important",
    outline: "none!important !important",
    fontSize: "14px !important",
    display: "flex",
    justifyContent: "center"
  }
});

const GoogleLoginForm = props => {
  const { classes, onLoginWithGoogle } = props;
  const [googleError, setGoogleError] = useState(false);

  const errorGoogle = response => {
    if (response) {
      setGoogleError(true);
    }
  };
  const responseGoogle = response => {
    if (response && response.accessToken) {
      onLoginWithGoogle({
        token: response.accessToken
      });
    }
  };

  return (
    <Fragment>
      <section>
        <div className="text-center p-2 mt-2">
          <GoogleLogin
            className={`${classes.googleLoginBtn}`}
            clientId={googleClientId}
            buttonText="LOGIN WITH GOOGLE "
            onSuccess={responseGoogle}
            onFailure={errorGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </section>
      {googleError ? (
        <Alert
          open={googleError}
          handleClose={() => setGoogleError(false)}
          alertMessage={"Unable to login.Try again"}
          alertTitle="Error"
          buttonText="OK"
        />
      ) : (
        ""
      )}
    </Fragment>
  );
};
const mapDispatchToProps = dispatchWithRequest((dispatch, req) => {
  return {
    onLoginWithGoogle: token => {
      dispatch(loginWithGoogle.request({ token }));
    }
  };
});

const mapStateToProps = state => {
  return {
    isSubmitting: getIsSubmitting(state, true),
    errorMessage: getErrorMessage(state, true)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(GoogleLoginForm));
