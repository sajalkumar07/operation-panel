import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { dispatchWithRequest } from "../../actions";
import { pathOrNA } from "../../helpers/utils";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import BaseDialog from "../../components/dialogs/BaseDialog";
import { getCustomLogger } from "../../helpers/logger";

const agentLogger = getCustomLogger("AgentLogger");

const Dashboard = function({
  history,
  me,
  updateUser,
  requestSuccess,
  loggedInUser
}) {
  const [user, setUser] = useState({
    open: false,
    data: {}
  });
  useEffect(() => {
    if (requestSuccess) {
      setUser({ open: false, data: {} });
    }
  }, [requestSuccess]);
  let userRoles = "admin";
  if (me) {
    userRoles =
      me.userRoles && me.userRoles.length > 0 ? me.userRoles[0] : "admin";
  }

  const [passwordPopup, setPasswordPopup] = useState(false);

  useEffect(() => {
    const showPopup = localStorage.getItem("showPopup");
    if (loggedInUser && loggedInUser.passwordStrength && !showPopup) {
      setPasswordPopup(true);
      localStorage.setItem("showPopup", "true");
    }

    if (agentLogger) {
      agentLogger.debug(`Agent Login Ops-UI`, loggedInUser);
    }
  }, [loggedInUser]);

  const teacherPanel = (
    <div className="col-md-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Teachers</h5>
          <p className="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <button
            onClick={() => {
              history.push("/teachers");
            }}
            className="btn btn-primary"
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );

  const studentPanel = (
    <div className="col-md-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Students</h5>
          <p className="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <button
            onClick={() => {
              history.push("/students");
            }}
            className="btn btn-primary"
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );

  const masterData = (
    <div className="col-md-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Master Data</h5>
          <p className="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <button
            onClick={() => {
              history.push("/config-data");
            }}
            className="btn btn-primary"
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
  let submitUser = function(values, { setSubmitting }) {
    if (!values.password) {
      delete values.password;
    }
    setSubmitting(false);
    let submit = values.id ? updateUser : "";
    if (!values.dialCode) {
      values.dialCode = "+91";
    }
    let obj = {
      id: values.id,
      mobile: values.mobile,
      dialCode: values.dialCode
    };
    if (values.password) {
      obj.password = values.password;
    }
    submit(obj);
  };
  return (
    <>
      <div className="p-4">
        <div className="mb-4">
          <Card className={`mb-4`}>
            <CardContent className="p-4">
              <div className="d-flex mb-4">
                <div className="heading3_r mr-auto">Logged In User Profile</div>
                <button
                  className="btn btn-secondary mr-2"
                  onClick={() => {
                    setUser({ open: true, data: me });
                  }}
                >
                  Update Profile
                </button>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="row mb-2">
                    <div className="col-md-6 heading5_b">Email:</div>
                    <div className="col-md-6 heading5_r">
                      {pathOrNA(["email"], me)}
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-md-6 heading5_b">Dial Code:</div>
                    <div className="col-md-6 heading5_r">
                      {pathOrNA(["dialCode"], me)}
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-md-6 heading5_b">Mobile:</div>
                    <div className="col-md-6 heading5_r">
                      {pathOrNA(["mobile"], me)}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row mb-2">
                    <div className="col-md-6 heading5_b">User Role:</div>
                    <div className="col-md-6 heading5_r">
                      {pathOrNA(["userRoles"], me).join()}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="row mb-4">

        </div>
      </div>

      <BaseDialog
        open={passwordPopup}
        onClose={() => setPasswordPopup(false)}
        maxWidth="xs"
      >
        <div className="heading4_b mt-3 mb-4 text-center">Change Password</div>
        <div className="mb-4 text-center">
          Your password is not strong. Please change it.
        </div>
        <button
          className="btn btn-primary mb-3"
          onClick={() => {
            setPasswordPopup(false);
            setUser({ open: true, data: me });
          }}
        >
          Change
        </button>
      </BaseDialog>
    </>
  );
};

Dashboard.propTypes = {};

const mapStateToProps = state => {
  return {
    me: state.entityData.ME,
    loggedInUser: state.authUser.loggedInUser
  };
};

const mapDispatchToProps = dispatchWithRequest((dispatch, req) => {
  return {
    updateUser: req({ entityName: "USER_DASHBOARD", action: "UPDATE" }),
    test: req({
      entityName: "STUDENT_PREFERENCE_DATA",
      action: "UPDATE"
    })
  };
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Dashboard));
