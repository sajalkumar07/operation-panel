import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logout } from "./../actions";

let Logout = function({ history, doLogout }) {
  useEffect(function() {
    doLogout();
  }, []);
  return <></>;
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    doLogout: data => {
      dispatch(logout.request(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Logout));
