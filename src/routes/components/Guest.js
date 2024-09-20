// Global
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { push } from "connected-react-router";

import {
  getIsAuthenticated,
  getUserRole,
  authInProgress,
  isAuthenticationNeeded
} from "../../reducers";

import { authentication } from "../../actions";

class Guest extends Component {
  // componentDidMount() {
  //     this.props.isAuthenticated || this.props.onAuthenticationFailed();
  // }

  render() {
    const { isAuthenticated, push } = this.props;
    if (!isAuthenticated) {
      // const redirectToURL=`/${userRole[0].toLowerCase()}/dashboard`;
      //             // return  <Redirect to={redirectToURL}/>;
      return this.props.children;
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

export default connect(
  mapStateToProps,
  { push }
)(withRouter(Guest));
