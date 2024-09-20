// Global
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// Components
import Alert from "../components/common/Alert";
import LoginForm from "../components/form/LoginForm";
import styled from "styled-components";
// Schema
import { initValues, validationSchema } from "../schemas/login";
// Reducers
import { login } from "../actions";
import { getIsSubmitting, getErrorMessage } from "../reducers";
import { WHITE_COMPANY_LOGO } from "../helpers/ImagePath";

const LoginContainer = styled.div`
  background-color: #ffefe5;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  .wrapper {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    .form-container {
      background: #fff;
      border-radius: 15px;
      box-shadow: 2px 2px 7px 2px rgba(200, 200, 200, 0.63);
      padding: 30px 5%;
      max-width: 650px;
      min-width: 360px;
      .googleImg {
        img {
          width: 32px;
        }
      }
      h6 {
        text-align: center;
        img {
          max-width: 100%;
        }
      }
    }
    .desc-container {
      .rows {
        redisplay: flex;
        align-items: center;
        margin: 2em 0;
        div {
          width: 65%;
          display: flex;
          flex-direction: column;
          .header {
            font-family: "Muli-Bold", sans-serif;
            font-size: 1.5em;
            margin-bottom: 10px;
          }
          .desc {
            font-family: "Muli-Regular", sans-serif;
            font-size: 1.125em;
          }
        }
        img {
          margin-right: 5%;
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    .wrapper {
      width: 100%;
      padding: 20px;
      .form-container {
        width: 100%;
        h6 {
          img {
            width: 50%;
          }
        }
      }
      .desc-container {
        .rows {
          flex-direction: column;
          text-align: center;
          div {
            width: 100%;
          }
          img {
            margin: 0;
          }
        }
      }
    }
  }
`;

const Login = props => {
  const { onSubmit, onErrorClose, isSubmitting, errorMessage } = props;
  const trimInputs = values =>
    Object.keys(values).reduce((res, key) => {
      res[key] = values[key].trim();
      return res;
    }, {});

  const handleSubmit = (values, { setSubmitting, setValues }) => {
    setSubmitting(true);
    if (captchaToken) {
      values.token = captchaToken;
    }
    const finValues = trimInputs(values);
    setValues(finValues, false);
    onSubmit(finValues);
  };

  const onAlertClose = () => {
    onErrorClose(false);
  };

  const [captchaToken, setCaptchaToken] = useState("");

  const onCaptchaTokenChange = token => {
    setCaptchaToken(token);
  };

  return (
    <>
      <LoginContainer>
        <div className={"wrapper"}>
          <div className={"form-container"}>
            <h6>
              <img alt={"Company Logo"} />
            </h6>
            <Formik
              render={props => {
                return (
                  <LoginForm
                    {...props}
                    reduxIsSubmitting={isSubmitting}
                    onCaptchaTokenChange={onCaptchaTokenChange}
                    captchaToken={captchaToken}
                  />
                ); // TO DO : Find Better Solution
              }}
              initialValues={initValues}
              // validationSchema={validationSchema}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </LoginContainer>
      {errorMessage !== "" && (
        <Alert
          open={!!errorMessage}
          handleClose={onAlertClose}
          alertMessage={errorMessage}
          alertTitle="Error"
          buttonText="OK"
        />
      )}
    </>
  );
};

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onErrorClose: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  return {
    isSubmitting: getIsSubmitting(state, true),
    errorMessage: getErrorMessage(state, true)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: data => {
      dispatch(login.request(data));
    },
    onErrorClose: flg => {
      dispatch(login.errorClose(flg));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
