import { reduce, curry, path } from "ramda";
import React from "react";

import ADMIN from "./ADMIN";
import PROACTIVE_AGENT from "./PROACTIVE_AGENT";
import REACTIVE_AGENT from "./REACTIVE_AGENT";
import SLOT_BOOKING from "./SLOT_BOOKING";
import STUDENT_OPS from "./STUDENT_OPS";
import TEACHER_OPS from "./TEACHER_OPS";
import MASTER_DATA_MANAGER from "./MASTER_DATA_MANAGER";
import SALES from "./SALES";
import VENDOR_AGENT from "./VENDOR_AGENT";
import TEACHER_RECRUITMENT_AGENT from "./TEACHER_RECRUITMENT_AGENT";
import CRM_PROACTIVE_AGENT from "./CRM_PROACTIVE_AGENT";
import CRM_REACTIVE_AGENT from "./CRM_REACTIVE_AGENT";
import BRAZIL_TRIAL_PROACTIVE from "./BRAZIL_TRIAL_PROACTIVE";
import BRAZIL_TRIAL_REACTIVE from "./BRAZIL_TRIAL_REACTIVE";
import MEXICO_TRIAL_PROACTIVE from "./MEXICO_TRIAL_PROACTIVE";
import MEXICO_TRIAL_REACTIVE from "./MEXICO_TRIAL_REACTIVE";
import SUPER_ADMIN from "./SUPER_ADMIN";
import FINANCE_ADMIN from "./FINANCE_ADMIN";
import CURRICULUM_ADMIN from "./CURRICULUM_ADMIN";
import COMMUNITY_OPS from "./COMMUNITY_OPS";
import CLAP_MANAGER from "./CLAP_MANAGER";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import BTL_SM from "./BTL_SM";

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
  MASTER_DATA_MANAGER,
  SALES,
  VENDOR_AGENT,
  TEACHER_RECRUITMENT_AGENT,
  CRM_PROACTIVE_AGENT,
  CRM_REACTIVE_AGENT,
  BRAZIL_TRIAL_PROACTIVE,
  BRAZIL_TRIAL_REACTIVE,
  MEXICO_TRIAL_PROACTIVE,
  MEXICO_TRIAL_REACTIVE,
  COMMUNITY_OPS,
  CLAP_MANAGER,
  BTL_SM
};

let getActionsForPermissions = reduce(
  (acc, p) => [...acc, ...(PERMISSION_MAP[p] || [])],
  []
);

export const userHasAccess = curry(function(user, actions = []) {
  const userRoles = path(["userRoles"], user) || [];
  const userActions = getActionsForPermissions(userRoles);
  return reduce(
    function(acc, action) {
      return !acc ? false : userActions.indexOf(action) > -1;
    },
    true,
    actions
  );
});

const mapStateToProps = state => {
  return {
    me: state.entityData.ME
  };
};

export default connect(mapStateToProps)(
  withRouter(function({ user, actions, children, me }) {
    const hasAccess = userHasAccess(user || me, actions);
    return <>{hasAccess && children}</>;
  })
);
