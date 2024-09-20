// Global
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getIsAuthenticated,
  getUserRole,
  authInProgress,
  isAuthenticationNeeded
} from "../../reducers";

import { authentication } from "../../actions";

class Auth extends Component {
  componentDidMount() {
    this.props.isAuthenticated || this.props.onAuthenticationFailed();
  }

  render() {
    const {
      isAuthenticated,
      isAuthenticationNeeded,
      authInProgress,
      onAuthenticationFailed
    } = this.props;
    if (isAuthenticated && !isAuthenticationNeeded) {
      return this.props.children;
    } else {
      !(isAuthenticationNeeded && !authInProgress) || onAuthenticationFailed();
      return <React.Fragment />;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: getIsAuthenticated(state),
    userRole: getUserRole(state),
    authInProgress: authInProgress(state),
    isAuthenticationNeeded: isAuthenticationNeeded(state)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onAuthenticationFailed: () => {
      const from = ownProps.path;
      dispatch(authentication.request({ from }));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Auth));
