import React, { Fragment, useEffect, useState } from "react";

import { withStyles } from "@material-ui/core/styles";
import { loginWithOneLogin } from "../../actions";
import { getErrorMessage, getIsSubmitting } from "../../reducers";
import connect from "react-redux/es/connect/connect";
import { dispatchWithRequest } from "../../actions";
import { config } from "../../config";
import { parse } from "query-string";
import Alert from "../common/Alert";
import { stringify } from "query-string";
const { v4: uuidv4 } = require("uuid");
const styles = theme => ({
  oneLoginBtn: {
    backgroundColor: "#ff6400 !important",
    padding: "5px 32px !important",
    border: "1px solid #ff6400 !important",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.27) !important",
    color: "#fff !important",
    borderRadius: "35px !important",
    outline: "none!important !important",
    fontSize: "14px !important"
  }
});

const OneLoginForm = props => {
  const { classes, onLoginWithOneLogin } = props;
  const [oneLoginError, setOneLoginError] = useState(false);
  const [oneLoginOTPError, setoneLoginOTPError] = useState(false);

  const errorGoogle = response => {
    if (response) {
      setOneLoginError(true);
    }
  };
  const errorOTP = () => {
    setoneLoginOTPError(true);
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const data = parse(hash);
      if (data && data.access_token) {
        if (localStorage.getItem("stateValue") === data.state) {
          onLoginWithOneLogin({
            token: data.access_token
          });
          localStorage.removeItem("stateValue");
        } else {
          errorOTP();
        }
        if (window.history.pushState) {
          window.history.pushState("", "/", window.location.pathname);
        } else {
          window.location.hash = "";
        }
      }
    }
  }, [window.location && window.location.hash]);
  const beginAuth = () => {
    const authority = config.authority;
    const client_id = config.client_id;
    const redirect_uri = config.redirect_uri;
    const response_type = "id_token token";
    const scope = "openid profile";
    let nonce = uuidv4();
    let state = uuidv4();
    localStorage.setItem("stateValue", state);
    const params = stringify({
      client_id,
      redirect_uri,
      response_type,
      scope,
      nonce,
      state
    });
    const authUrl = `${authority}/auth?${params}`;
    window.location.assign(authUrl);
  };

  return (
    <Fragment>
      <section>
        <div className="text-center p-2 mt-2">
          <button
            className={`${classes.oneLoginBtn}`}
            onClick={() => beginAuth()}
          >
            LOGIN WITH ONE LOGIN (Only Whitehat Employees)
          </button>
        </div>
      </section>
      {oneLoginError === true ? (
        <Alert
          open={oneLoginError}
          handleClose={() => setOneLoginError(false)}
          alertMessage={"Unable to login.Try again"}
          alertTitle="Error"
          buttonText="OK"
        />
      ) : (
        ""
      )}
      <Alert
        open={oneLoginOTPError}
        handleClose={() => setoneLoginOTPError(false)}
        alertMessage={"Authentication Failed. Please try again"}
        alertTitle="Error"
        buttonText="OK"
      />
    </Fragment>
  );
};
const mapDispatchToProps = dispatchWithRequest((dispatch, req) => {
  return {
    onLoginWithOneLogin: token => {
      dispatch(loginWithOneLogin.request({ token }));
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
)(withStyles(styles)(OneLoginForm));
