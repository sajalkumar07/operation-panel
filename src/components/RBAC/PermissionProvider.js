import React, { Component } from "react";
import ADMIN from "../../constants/buttonPermissions/ADMIN";
import PROACTIVE_AGENT from "../../constants/buttonPermissions/PROACTIVE_AGENT";
import REACTIVE_AGENT from "../../constants/buttonPermissions/REACTIVE_AGENT";
import MEXICO_TRIAL_PROACTIVE from "../../constants/buttonPermissions/MEXICO_TRIAL_PROACTIVE";
import MEXICO_TRIAL_REACTIVE from "../../constants/buttonPermissions/MEXICO_TRIAL_REACTIVE";
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
import TEACHERS_STRIKE_USERS from "../../constants/buttonPermissions/TEACHERS_STRIKE_USERS";
import FINANCE_ADMIN from "../../constants/buttonPermissions/FINANCE_ADMIN";
import COMMUNITY_OPS from "../../constants/buttonPermissions/COMMUNITY_OPS";
import BTL_SM from "../../constants/buttonPermissions/BTL_SM";
import { reduce, path, curry } from "ramda";
import { withRouter } from "react-router-dom";

import PAGE_ADMIN from "../../constants/permissions/ADMIN";
import PAGE_PROACTIVE_AGENT from "../../constants/permissions/PROACTIVE_AGENT";
import PAGE_REACTIVE_AGENT from "../../constants/permissions/REACTIVE_AGENT";
import PAGE_SLOT_BOOKING from "../../constants/permissions/SLOT_BOOKING";
import PAGE_STUDENT_OPS from "../../constants/permissions/STUDENT_OPS";
import PAGE_TEACHER_OPS from "../../constants/permissions/TEACHER_OPS";
import PAGE_MASTER_DATA_MANAGER from "../../constants/permissions/MASTER_DATA_MANAGER";
import PAGE_SALES from "../../constants/permissions/SALES";
import PAGE_VENDOR_AGENT from "../../constants/permissions/VENDOR_AGENT";
import PAGE_TEACHER_RECRUITMENT_AGENT from "../../constants/permissions/TEACHER_RECRUITMENT_AGENT";
import PAGE_CRM_PROACTIVE_AGENT from "../../constants/permissions/CRM_PROACTIVE_AGENT";
import PAGE_CRM_REACTIVE_AGENT from "../../constants/permissions/CRM_REACTIVE_AGENT";
import PAGE_BRAZIL_TRIAL_PROACTIVE from "../../constants/permissions/BRAZIL_TRIAL_PROACTIVE";
import PAGE_BRAZIL_TRIAL_REACTIVE from "../../constants/permissions/BRAZIL_TRIAL_REACTIVE";
import PAGE_SUPER_ADMIN from "../../constants/permissions/SUPER_ADMIN";
import PAGE_FINANCE_ADMIN from "../../constants/permissions/FINANCE_ADMIN";
import PAGE_CURRICULUM_ADMIN from "../../constants/permissions/CURRICULUM_ADMIN";
import PAGE_COMMUNITY_OPS from "../../constants/permissions/COMMUNITY_OPS";
import PAGE_CLAP_MANAGER from "../../constants/permissions/CLAP_MANAGER";
import PAGE_MEXICO_TRIAL_PROACTIVE from "../../constants/permissions/MEXICO_TRIAL_PROACTIVE";
import PAGE_MEXICO_TRIAL_REACTIVE from "../../constants/permissions/MEXICO_TRIAL_REACTIVE";
import PAGE_BTL_SM_LIVE_CLASS from "../../constants/permissions/BTL_SM";
import { config } from "../../config";
// TO DO: take this data from API
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
  COMMUNITY_OPS,
  MEXICO_TRIAL_REACTIVE,
  MEXICO_TRIAL_PROACTIVE,
  TEACHERS_STRIKE_USERS,
  BTL_SM
};

const PAGE_PERMISSION_MAP = {
  PAGE_ADMIN,
  PAGE_SUPER_ADMIN,
  PAGE_FINANCE_ADMIN,
  PAGE_CURRICULUM_ADMIN,
  PAGE_PROACTIVE_AGENT,
  PAGE_REACTIVE_AGENT,
  PAGE_SLOT_BOOKING,
  PAGE_STUDENT_OPS,
  PAGE_TEACHER_OPS,
  PAGE_MASTER_DATA_MANAGER,
  PAGE_SALES,
  PAGE_VENDOR_AGENT,
  PAGE_TEACHER_RECRUITMENT_AGENT,
  PAGE_CRM_PROACTIVE_AGENT,
  PAGE_CRM_REACTIVE_AGENT,
  PAGE_BRAZIL_TRIAL_PROACTIVE,
  PAGE_BRAZIL_TRIAL_REACTIVE,
  PAGE_COMMUNITY_OPS,
  PAGE_CLAP_MANAGER,
  PAGE_MEXICO_TRIAL_REACTIVE,
  PAGE_MEXICO_TRIAL_PROACTIVE,
  PAGE_BTL_SM_LIVE_CLASS
};

let getActionsForPermissions = (type, userRoles, permission) => {
  if (config && config.accessControl === "dynamic") {
    return userRoles.reduce((acc, p) => [...acc, ...(permission || [])], []);
  } else {
    const permissionMap =
      type === "action" ? PERMISSION_MAP : PAGE_PERMISSION_MAP;
    return userRoles.reduce(
      (acc, p) => [
        ...acc,
        ...(permissionMap[`${type === "page" ? "PAGE_" : ""}${p}`] || [])
      ],
      []
    );
  }
};

export const userHasAccess = curry(function(user, actions = []) {
  const userRoles = path(["userRoles"], user) || [];
  const permission = path(["permission"], user) || [];
  let pagePermission = permission.filter(i => i.includes("PAGE_"));
  const userActions = getActionsForPermissions(
    "page",
    userRoles,
    pagePermission
  );
  userActions.push("PAGE_BPM");
  return reduce(
    function(acc, action) {
      return !acc ? false : userActions.indexOf(action) > -1;
    },
    true,
    actions
  );
});

export const userHasActionAccess = props => {
  const userRoles = path(["userRoles"], props.me) || [];
  const permission = path(["permission"], props.me) || [];
  let actionPermission = permission.filter(
    i =>
      i.includes("ACTION_") ||
      i.includes("VIEW_") ||
      i.includes("ACTIONS_") ||
      i.includes("VIEWS_")
  );
  const userActions = getActionsForPermissions(
    "action",
    userRoles,
    actionPermission
  );
  return (
    props && props.me && props.name && userActions.indexOf(props.name) > -1
  );
};

class PermissionProvider extends Component {
  render() {
    const { user, actions, children, me } = this.props;
    console.log(user, actions, children, me, "user, actions, children, me");
    const hasAccess =
      actions && actions.length
        ? userHasAccess(user || me, actions)
        : userHasActionAccess(this.props);
    return <>{hasAccess && children}</>;
  }
}

const mapStateToProps = state => {
  return {
    me: state.entityData.ME
  };
};

export default connect(mapStateToProps)(PermissionProvider);
