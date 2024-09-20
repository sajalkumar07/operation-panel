import React, { Component } from "react";
import ADMIN from "../../constants/buttonPermissions/ADMIN";
import PROACTIVE_AGENT from "../../constants/buttonPermissions/PROACTIVE_AGENT";
import REACTIVE_AGENT from "../../constants/buttonPermissions/REACTIVE_AGENT";
import SLOT_BOOKING from "../../constants/buttonPermissions/SLOT_BOOKING";
import STUDENT_OPS from "../../constants/buttonPermissions/STUDENT_OPS";
import TEACHER_OPS from "../../constants/buttonPermissions/TEACHER_OPS";
import TEACHER_RECRUITMENT_AGENT from "../../constants/buttonPermissions/TEACHER_RECRUITMENT_AGENT";
import VENDOR_AGENT from "../../constants/buttonPermissions/VENDOR_AGENT";
import SALES from "../../constants/buttonPermissions/SALES";
import CURRICULUM_ADMIN from "../../constants/buttonPermissions/CURRICULUM_ADMIN";
import { connect } from "react-redux";
import CRM_PROACTIVE_AGENT from "../../constants/buttonPermissions/CRM_PROACTIVE_AGENT";
import CRM_REACTIVE_AGENT from "../../constants/buttonPermissions/CRM_REACTIVE_AGENT";
import BRAZIL_TRIAL_PROACTIVE from "../../constants/buttonPermissions/BRAZIL_TRIAL_PROACTIVE";
import BRAZIL_TRIAL_REACTIVE from "../../constants/buttonPermissions/BRAZIL_TRIAL_REACTIVE";
import SUPER_ADMIN from "../../constants/buttonPermissions/SUPER_ADMIN";
import FINANCE_ADMIN from "../../constants/buttonPermissions/FINANCE_ADMIN";
import BTL_SM from "../../constants/buttonPermissions/BTL_SM";
import { reduce, path } from "ramda";

const PERMISSION_MAP = {
  ADMIN,
  SUPER_ADMIN,
  FINANCE_ADMIN,
  CURRICULUM_ADMIN,
  PROACTIVE_AGENT,
  REACTIVE_AGENT,
  SLOT_BOOKING,
  STUDENT_OPS,
  TEACHER_OPS,
  VENDOR_AGENT,
  SALES,
  TEACHER_RECRUITMENT_AGENT,
  CRM_PROACTIVE_AGENT,
  CRM_REACTIVE_AGENT,
  BRAZIL_TRIAL_PROACTIVE,
  BRAZIL_TRIAL_REACTIVE,
  BTL_SM
};

let getActionsForPermissions = reduce(
  (acc, p) => [...acc, ...(PERMISSION_MAP[p] || [])],
  []
);
class PermissionProvider extends Component {
  checkDisplay(name) {
    const userRoles = path(["userRoles"], this.props.me) || [];
    const userActions = getActionsForPermissions(userRoles);
    return userActions.indexOf(name) > -1;
  }
  render() {
    // console.log('props',this.props)
    let component = "";
    if (this.props && this.props.me && this.props.name) {
      if (this.checkDisplay(this.props.name)) {
        component = this.props.children;
      }
    }

    return <>{component}</>;
  }
}

const mapStateToProps = state => {
  return {
    me: state.entityData.ME
  };
};
export default connect(mapStateToProps)(PermissionProvider);
