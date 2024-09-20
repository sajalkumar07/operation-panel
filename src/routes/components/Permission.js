// Global
import React from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { getIsAuthenticated, getUserRole } from "../../reducers";

const Permission = props => {
  const { isAuthenticated, userRole, authRoles } = props;

  if (isAuthenticated && authRoles.indexOf(userRole) !== -1) {
    return props.children;
  } else {
    return <React.Fragment />;
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: getIsAuthenticated(state),
    userRole: getUserRole(state)
  };
};

export default connect(mapStateToProps)(withRouter(Permission));
