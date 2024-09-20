import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import PermissionProvider from "../RBAC/PermissionProvider";

export const Sidenav = function({ me }) {
  return (
    <div className="sidenav">
      <nav className="main-menu">
        <ul>
          <PermissionProvider
            actions={[
              "PAGE_STUDENTS",
              "PAGE_STUDENT_DETAILS",
              "PAGE_TEACHERS",
              "PAGE_TEACHER_DETAILS",
              "PAGE_SESSIONS",
              "PAGE_BPM",
              "PAGE_TASK",
              "PAGE_CONCENTRIX",
              "PAGE_SLASH_RTC",
              "PAGE_SYKES",
              "PAGE_BULK_UPLOAD",
              "PAGE_MY_TASK",
              "PAGE_CALL_LOGS",
              "PAGE_CALL_FRAMEWORK"
            ]}
          >
            <li className="has-subnav">
              <div className="grey_color_dark-txt cursorPointer anchor">
                <div className="head">
                  <span className="sidenav-icon fa-2x">
                    <i className="icon-icon-2"></i>
                  </span>
                  <span className="nav-text">Ops</span>
                </div>
                <div className="accordion">
                  <PermissionProvider user={me} actions={["PAGE_STUDENTS"]}>
                    <NavLink
                      to={`/students`}
                      exact={true}
                      className="sub__nav-item"
                      activeClassName="text-white"
                    >
                      <div className="heading5_sb py-2">Students</div>
                    </NavLink>
                  </PermissionProvider>
                  <PermissionProvider user={me} actions={["PAGE_BULK_UPLOAD"]}>
                    <NavLink
                      to={`/bulk-upload`}
                      exact={true}
                      className="sub__nav-item"
                      activeClassName="text-white"
                    >
                      <div className="heading5_sb py-2">Bulk Uploads</div>
                    </NavLink>
                  </PermissionProvider>
                  <PermissionProvider user={me} actions={["PAGE_TEACHERS"]}>
                    <NavLink
                      to={`/teachers`}
                      exact={true}
                      className="sub__nav-item"
                      activeClassName="text-white"
                    >
                      <div className="heading5_sb py-2">Teachers</div>
                    </NavLink>
                  </PermissionProvider>
                  <PermissionProvider actions={["PAGE_SESSIONS"]}>
                    <NavLink
                      to="/sessions"
                      exact={true}
                      className="sub__nav-item"
                      activeClassName="text-white"
                    >
                      <div className="heading5_sb py-2">Sessions</div>
                    </NavLink>
                  </PermissionProvider>
                  <PermissionProvider actions={["PAGE_BPM"]}>
                    <NavLink
                      to="/BPM"
                      exact={true}
                      className="sub__nav-item"
                      activeClassName="text-white"
                    >
                      <div className="heading5_sb py-2">BPM</div>
                    </NavLink>
                  </PermissionProvider>
                  <PermissionProvider actions={["PAGE_BATCH"]}>
                    <NavLink
                      to="/batch"
                      exact={true}
                      className="sub__nav-item"
                      activeClassName="text-white"
                    >
                      <div className="heading5_sb py-2">Batch</div>
                    </NavLink>
                  </PermissionProvider>
                  <PermissionProvider actions={["PAGE_CONCENTRIX"]}>
                    <NavLink
                      to="/concentrix"
                      exact={true}
                      className="sub__nav-item"
                      activeClassName="text-white"
                    >
                      <div className="heading5_sb py-2">Concentrix</div>
                    </NavLink>
                  </PermissionProvider>
                  <PermissionProvider actions={["PAGE_SLASH_RTC"]}>
                    <NavLink
                      to="/slashRTC"
                      exact={true}
                      className="sub__nav-item"
                      activeClassName="text-white"
                    >
                      <div className="heading5_sb py-2">Slash RTC</div>
                    </NavLink>
                  </PermissionProvider>
                  <PermissionProvider actions={["PAGE_SYKES"]}>
                    <NavLink
                      to="/sykes"
                      exact={true}
                      className="sub__nav-item"
                      activeClassName="text-white"
                    >
                      <div className="heading5_sb py-2">Sykes</div>
                    </NavLink>
                  </PermissionProvider>
                  <PermissionProvider actions={["PAGE_TASK"]}>
                    <NavLink
                      to="/task"
                      exact={true}
                      className="sub__nav-item"
                      activeClassName="text-white"
                    >
                      <div className="heading5_sb py-2">Task</div>
                    </NavLink>
                  </PermissionProvider>
                </div>
              </div>
            </li>
          </PermissionProvider>
          <PermissionProvider
            actions={[
              "PAGE_CLASSES",
              "PAGE_COURSES",
              "PAGE_PROJECTS",
              "PAGE_ACTIVITIES",
              "PAGE_LANGUAGES",
              "PAGE_PAYMENT_PACKAGES",
              "PAGE_COURSE_ITEMS"
            ]}
          >
            <li className="has-subnav">
              <div className="grey_color_dark-txt cursorPointer anchor">
                <div className="head">
                  <span className="sidenav-icon fa-2x">
                    <i className="icon-list"></i>
                  </span>
                  <span className="nav-text">Course</span>
                </div>
                <div className="accordion">
                  <PermissionProvider actions={["PAGE_COURSES"]}>
                    <NavLink
                      to={`/courses`}
                      exact={true}
                      className="sub__nav-item"
                      activeClassName="text-white"
                    >
                      <div className="heading5_sb py-2">Courses</div>
                    </NavLink>
                  </PermissionProvider>
                  <PermissionProvider actions={["PAGE_COURSE_ITEMS"]}>
                    <NavLink
                      to={`/course-items`}
                      exact={true}
                      className="sub__nav-item"
                      activeClassName="text-white"
                    >
                      <div className="heading5_sb py-2">Course Items</div>
                    </NavLink>
                  </PermissionProvider>
                  <PermissionProvider actions={["PAGE_CLASSES"]}>
                    <NavLink
                      to={`/classes`}
                      exact={true}
                      className="sub__nav-item"
                      activeClassName="text-white"
                    >
                      <div className="heading5_sb py-2">Classes</div>
                    </NavLink>
                  </PermissionProvider>
                  <PermissionProvider actions={["PAGE_ACTIVITIES"]}>
                    <NavLink
                      to="/activities"
                      exact={true}
                      className="sub__nav-item"
                      activeClassName="text-white"
                    >
                      <div className="heading5_sb py-2">Activities</div>
                    </NavLink>
                  </PermissionProvider>
                  <PermissionProvider actions={["PAGE_PROJECTS"]}>
                    <NavLink
                      to="/projects"
                      exact={true}
                      className="sub__nav-item"
                      activeClassName="text-white"
                    >
                      <div className="heading5_sb py-2">Project Management</div>
                    </NavLink>
                  </PermissionProvider>
                  <PermissionProvider actions={["PAGE_PAYMENT_PACKAGES"]}>
                    <NavLink
                      to="/payment-packages"
                      exact={true}
                      className="sub__nav-item"
                      activeClassName="text-white"
                    >
                      <div className="heading5_sb py-2">Payment Packages</div>
                    </NavLink>
                  </PermissionProvider>
                  <PermissionProvider actions={["PAGE_VIDEO_RECORDING_DETAIL"]}>
                    <NavLink
                      to="/video-recording-detail"
                      exact={true}
                      className="sub__nav-item"
                      activeClassName="text-white"
                    >
                      <div className="heading5_sb py-2">Video Recording</div>
                    </NavLink>
                  </PermissionProvider>
                </div>
              </div>
            </li>
          </PermissionProvider>
          <PermissionProvider
            actions={[
              "PAGE_CONFIG_DATA",
              "PAGE_SQL_JOB_ENTITY",
              "PAGE_EVENT_COMMAND",
              "PAGE_NOTIFICATIONS",
              "PAGE_CHAT_CONFIG",
              "PAGE_HELP_CENTER",
              "PAGE_FEATURE_CONFIG",
              "PAGE_UTM_CAMPAIGNS_AB",
              "PAGE_NEW_UTM_CAMPAIGNS_AB",
              "PAGE_AB_SETUP_UTILITY",
              "PAGE_TEMPLATES",
              "PAGE_EXPERIMENTS",
              "PAGE_NOTIFICATION_RULES"
            ]}
          >
            <li className="has-subnav">
              <div className="grey_color_dark-txt cursorPointer anchor">
                <div className="head">
                  <span className="sidenav-icon fa-2x">
                    <i className="icon-icon-1"></i>
                  </span>
                  <span className="nav-text">Master Data</span>
                </div>
                <div className="accordion">
                  <PermissionProvider actions={["PAGE_CONFIG_DATA"]}>
                    <NavLink
                      to="/config-data"
                      exact={true}
                      className="sub__nav-item"
                      activeClassName="text-white"
                    >
                      <div className="heading5_sb py-2">Config Data</div>
                    </NavLink>
                  </PermissionProvider>
                  <PermissionProvider actions={["PAGE_FEATURE_CONFIG"]}>
                    <NavLink
                      to="/feature-config"
                      exact={true}
                      className="sub__nav-item"
                      activeClassName="text-white"
                    >
                      <div className="heading5_sb py-2">Feature Config</div>
                    </NavLink>
                  </PermissionProvider>
                  <PermissionProvider actions={["PAGE_FEATURE_CONFIG"]}>
                    <NavLink
                      to="/notification-campaign"
                      exact={true}
                      className="sub__nav-item"
                      activeClassName="text-white"
                    >
                      <div className="heading5_sb py-2">
                        In-class notification
                      </div>
                    </NavLink>
                  </PermissionProvider>
                  <PermissionProvider actions={["PAGE_CRON_CONFIG"]}>
                    <NavLink
                      to="/cron-config"
                      exact={true}
                      className="sub__nav-item"
                      activeClassName="text-white"
                    >
                      <div className="heading5_sb py-2">Cron Config</div>
                    </NavLink>
                  </PermissionProvider>
                  <PermissionProvider actions={["PAGE_SQL_JOB_ENTITY"]}>
                    <NavLink
                      to="/sql-job-entity"
                      exact={true}
                      className="sub__nav-item"
                      activeClassName="text-white"
                    >
                      <div className="heading5_sb py-2">Sql Job Entity</div>
                    </NavLink>
                  </PermissionProvider>
                  <PermissionProvider actions={["PAGE_EVENT_COMMAND"]}>
                    <NavLink
                      to="/event-command"
                      exact={true}
                      className="sub__nav-item"
                      activeClassName="text-white"
                    >
                      <div className="heading5_sb py-2">Event Command</div>
                    </NavLink>
                  </PermissionProvider>
                  <PermissionProvider actions={["PAGE_NOTIFICATIONS"]}>
                    <NavLink
                      to="/notifications"
                      exact={true}
                      className="sub__nav-item"
                      activeClassName="text-white"
                    >
                      <div className="heading5_sb py-2">Notifications</div>
                    </NavLink>
                  </PermissionProvider>
                  <PermissionProvider actions={["PAGE_NOTIFICATIONS"]}>
                    <NavLink
                      to="/fetch-v3-notifications"
                      exact={true}
                      className="sub__nav-item"
                      activeClassName="text-white"
                    >
                      <div className="heading5_sb py-2">
                        Fetch V3Notifications
                      </div>
                    </NavLink>
                  </PermissionProvider>
                  <PermissionProvider actions={["PAGE_NOTIFICATIONS_INSIGHTS"]}>
                    <NavLink
                      to="/notifications-insight"
                      exact={true}
                      className="sub__nav-item"
                      activeClassName="text-white"
                    >
                      <div className="heading5_sb py-2">
                        Notifications Insights
                      </div>
                    </NavLink>
                  </PermissionProvider>
                  <PermissionProvider actions={["PAGE_TEMPLATES"]}>
                    <NavLink
                      to="/templates"
                      exact={true}
                      className="sub__nav-item"
                      activeClassName="text-white"
                    >
                      <div className="heading5_sb py-2">Templates</div>
                    </NavLink>
                  </PermissionProvider>
                  <PermissionProvider actions={["PAGE_EXPERIMENTS"]}>
                    <NavLink
                      to="/experiments"
                      exact={true}
                      className="sub__nav-item"
                      activeClassName="text-white"
                    >
                      <div className="heading5_sb py-2">Experiments</div>
                    </NavLink>
                  </PermissionProvider>
                  <PermissionProvider actions={["PAGE_WHATSAPP_LIMIT"]}>
                    <NavLink
                      to="/whatsapp-capacity"
                      exact={true}
                      className="sub__nav-item"
                      activeClassName="text-white"
                    >
                      <div className="heading5_sb py-2">Whatsapp Capacity</div>
                    </NavLink>
                  </PermissionProvider>
                  <PermissionProvider actions={["PAGE_CHAT_CONFIG"]}>
                    <NavLink
                      to="/chat-config"
                      exact={true}
                      className="sub__nav-item"
                      activeClassName="text-white"
                    >
                      <div className="heading5_sb py-2">Chat Config</div>
                    </NavLink>
                  </PermissionProvider>
                </div>
              </div>
            </li>
          </PermissionProvider>
          <PermissionProvider
            actions={["PAGE_COUNTRIES", "PAGE_REGIONS", "PAGE_LANGUAGES"]}
          >
            <li className="has-subnav">
              <div className="grey_color_dark-txt cursorPointer anchor">
                <div className="head">
                  <span className="sidenav-icon fa-2x">
                    <i className="icon-noun_skills_225624"></i>
                  </span>
                  <span className="nav-text">Region Data</span>
                </div>
                <div className="accordion">
                  <PermissionProvider actions={["PAGE_CLASSES"]}>
                    <NavLink
                      to="/regions"
                      exact={true}
                      className="sub__nav-item"
                      activeClassName="text-white"
                    >
                      <div className="heading5_sb py-2">Region</div>
                    </NavLink>
                  </PermissionProvider>
                  <PermissionProvider actions={["PAGE_LANGUAGES"]}>
                    <NavLink
                      to="/languages"
                      exact={true}
                      className="sub__nav-item"
                      activeClassName="text-white"
                    >
                      <div className="heading5_sb py-2">Language</div>
                    </NavLink>
                  </PermissionProvider>
                  <PermissionProvider actions={["PAGE_COUNTRIES"]}>
                    <NavLink
                      to="/countries"
                      exact={true}
                      className="sub__nav-item"
                      activeClassName="text-white"
                    >
                      <div className="heading5_sb py-2">Country</div>
                    </NavLink>
                  </PermissionProvider>
                </div>
              </div>
            </li>
          </PermissionProvider>
          <PermissionProvider actions={["PAGE_USER_MANAGEMENT"]}>
            <li className="has-subnav">
              <div className="grey_color_dark-txt cursorPointer anchor">
                <div className="head">
                  <span className="sidenav-icon fa-2x">
                    <i className="icon-user"></i>
                  </span>
                  <span className="nav-text">User Management</span>
                </div>
                <div className="accordion">
                  <NavLink
                    to="/user-management"
                    exact={true}
                    className="sub__nav-item"
                    activeClassName="text-white"
                  >
                    <div className="heading5_sb py-2">Users</div>
                  </NavLink>
                </div>
              </div>
            </li>
          </PermissionProvider>
        </ul>
      </nav>
    </div>
  );
};

export default withRouter(Sidenav);
