import React, { useEffect, useState, useRef, useHistory } from "react";
import { Route, Switch, withRouter, Router } from "react-router-dom";
import Login from "../pages/Login";
import AdminLanding from "../components/AdminLanding/AdminLanding";

import { connect } from "react-redux";

import Dashboard from "../pages/Dashboard/Dashboard";

import SnackBarCustom from "../components/snackbar/snackbar";
import { dispatchWithRequest, logout } from "../actions";
import Redirect from "react-router-dom/Redirect";
import { map } from "ramda";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import PermissionProvider from "../components/RBAC/PermissionProvider";
import { Alert } from "@material-ui/lab";
import MenuIcon from "@material-ui/icons/Menu";

import withStyles from "@material-ui/core/styles/withStyles";

import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import { AppDrawer } from "../components/AppDrawer/AppDrawer";
import Button from "@material-ui/core/Button";

import BaseDialog from "../components/dialogs/BaseDialog";

import NoticeDialog from "./NoticeDialog";
import moment from "moment";
import { CONFIG_NAME_LIST } from "../constants/requiredConfigsForOps";
import ViewAssessments from "../components/ViewAssessment/ViewAssessment";
import ViewCandidates from "../components/ViewCandidates/ViewCandidates";
import OrganizationManagement from "../components/OrganizationManagement/OrganizationManagement";
import ActiveUsers from "../components/ActiveUsers/ActiveUsers";

const drawerWidth = 240;
let timeoutId = null;
const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    // backgroundColor: "#343a40",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor: "#343a40",
    whiteSpace: "nowrap"
  },
  colorWhite: {
    color: "#ffffff"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: "hidden",
    boxShadow:
      "1px 2px 10px 1px rgba(0,0,0,0.2), 2px 1px 20px 2px rgba(0,0,0,0.14), 6px 1px 1px -6px rgba(0,0,0,0.12)"
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    overflow: "hidden",
    background: "#eaeaea",
    padding: theme.spacing(3)
  },
  button: {
    color: "#ffffff",
    borderColor: "#ffffff",
    textDecoration: "none"
  }
});

const ROUTES = [
  {
    path: "/dashboard",
    required: ["PAGE_DASHBOARD"],
    Component: Dashboard
  }
];

const AppRoutes = ({
  classes,
  history,
  location,
  request_status,
  request_state,
  getMe,
  me = {},
  loggedIn,
  doLogout,
  error_message,
  callConnect,
  routerPath,
  getAllCountries,
  getOpsConfig
}) => {
  const notifRef = useRef();
  const [callNotification, setCallNotification] = useState(false);
  const [open, setOpen] = useState(true);
  const [snackBar, setSnackBar] = useState({
    open: false,
    variant: "warning",
    message: ""
  });

  const [call, setCall] = useState({
    open: false,
    success: false,
    data: {},
    msg: ""
  });

  const [deleteEntity, setDeleteEntity] = useState({
    open: false,
    data: {}
  });

  let onYes = function() {
    const { fn, data } = deleteEntity;
    if (fn) fn(data);
    setDeleteEntity({
      open: false,
      data: {},
      fn: null
    });
  };

  let confirmDelete = function(fn, data) {
    setDeleteEntity({
      open: true,
      fn,
      data
    });
  };

  let confirmCall = function(data, msg) {
    setCall({
      open: true,
      success: false,
      msg,
      data
    });
  };

  let notLogin = location.pathname !== "/";
  let notLogout = location.pathname !== "/logout";

  const VARIANT_MAP = {
    success: "success",
    fetching: "info",
    failure: "error"
  };

  const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);

  let currentVersion = window.clientBuildVersion;
  let newVersion = window.newVersion;

  const [modalVisible, setModalVisible] = useState(false);
  const [isLoggerSet, setLogger] = useState(false);

  function localStoreDateGreaterThanDay(dateStr) {
    let hours = moment().diff(moment(dateStr), "hours");
    if (hours > 12) {
      return true;
    } else return false;
  }

  function getModalVisible() {
    let localStoreDate = localStorage.getItem("lastLoginPopupDate");
    if (!localStorage.getItem("tk")) {
      return false;
    }
    if (!localStoreDate) {
      return true;
    }
    if (localStoreDate && localStoreDateGreaterThanDay(localStoreDate)) {
      return true;
    }
    return false;
  }
  function handleModalClose() {
    localStorage.setItem("lastLoginPopupDate", new Date());
    setModalVisible(false);
  }

  function openModal() {
    setModalVisible(true);
  }

  useEffect(() => {
    // if a new version has come reload the app
    if (currentVersion && newVersion && newVersion > currentVersion) {
      window.location.reload();
      return;
    }
    if (localStorage.getItem("tk")) {
      setModalVisible(getModalVisible());
    }
  }, [routerPath]);

  useEffect(function() {
    if (notLogout && loggedIn) getMe();
    if (window.location.pathname === "/" && loggedIn)
      history.push("/dashboard");
    document.addEventListener("datadogLoaded", () => {
      setLogger(true);
    });
  }, []);

  useEffect(() => {
    if (me && me.id) {
      getAllCountries();
      getOpsConfig(CONFIG_NAME_LIST);
    }
  }, [me]);

  useEffect(
    function() {
      if (request_status && request_status !== "NA") {
        let message =
          request_status === "failure"
            ? error_message
            : capitalize(
                request_state === "QUEUED"
                  ? "Your request has been queued"
                  : request_status
              );
        setSnackBar({
          open: true,
          message,
          variant: VARIANT_MAP[request_status]
        });
        if (["failure", "success", "savedSuccess"].includes(request_status)) {
          setTimeout(function() {
            setSnackBar({
              ...snackBar,
              open: false,
              message: ""
            });
          }, 2000);
        }
      }
    },
    [request_status]
  );
  const hideCallNotification = () => setCallNotification(false);

  const RemoveCallBox = () => {
    if (callNotification) {
      timeoutId = setTimeout(function() {
        hideCallNotification();
        clearTimeout(timeoutId);
      }, 15000);
    }
  };

  const notificationSound = () => {
    notifRef && notifRef.current && notifRef.current.play();
  };

  useEffect(() => {
    if (loggedIn && typeof loggedIn === "string") {
      if (!sessionStorage.getItem("loggedInSesson")) {
        sessionStorage.setItem("loggedInSesson", loggedIn);
      }
    }
  }, [loggedIn]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  let getRoutes = map(function({ path, required, Component }) {
    return (
      <Route
        key={path}
        exact
        path={path}
        render={() => (
          <PermissionProvider actions={required}>
            <Component
              me={me}
              confirmDelete={confirmDelete}
              setSnackBar={setSnackBar}
              requestSuccess={request_status === "success"}
            />
          </PermissionProvider>
        )}
      />
    );
  });

  if (notLogout && notLogin) {
    if (!me.id && !localStorage.getItem("redirectURL")) {
      localStorage.setItem(
        "redirectURL",
        `${window.location.pathname}${window.location.search}`
      );
    } else if (localStorage.getItem("redirectURL") && me.id) {
      history.push(localStorage.getItem("redirectURL"));
      localStorage.removeItem("redirectURL");
    }
  }

  return (
    <>
      <Router history={history}>
        {/* {loggedIn ? (
          <>
            <div className={classes.root}>
              <NoticeDialog
                openModal={openModal}
                handleModalClose={handleModalClose}
                modalVisible={modalVisible}
              ></NoticeDialog>
              <AppBar
                position="fixed"
                className={`${clsx(classes.appBar, {
                  [classes.appBarShift]: open,
                })} `}
              >
                <Toolbar>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, {
                      [classes.hide]: open,
                    })}
                  >
                    <MenuIcon />
                  </IconButton>
                  <div className="mr-auto"></div>
                  <Button
                    onClick={() => {
                      doLogout();
                    }}
                    variant="outlined"
                    className={classes.button}
                  >
                    Logout
                  </Button>
                </Toolbar>
              </AppBar>
              <AppDrawer
                me={me}
                open={open}
                setOpen={setOpen}
                classes={classes}
                onItemClick={handleDrawerOpen}
              />
              <main className={`${classes.content} mt-5 pt-2 testClass`}>
                <div className="p-4">
                  <Switch>
                    <Route exact path="/robots.txt">
                      <Redirect to="/robots.txt" />
                    </Route>
                    {getRoutes(ROUTES)}
                    <Route exact path="/" component={Dashboard} />
                    {notLogout ? <Redirect to="/dashboard" /> : <></>}
                  </Switch>
                </div>
              </main>
            </div>
          </>
        ) : (
          <>
            <Switch>
              <Route exact path="/robots.txt">
                <Redirect to="/robots.txt" />
              </Route>
              <Route exact path="/" component={Login} />
              <Redirect to="/" />
            </Switch>
          </>
        )} */}
        <Switch>
          <Route exact path="/" component={AdminLanding} />
          <Route exact path="/view-assessments" component={ViewAssessments} />
          <Route
            exact
            path="/view-assessments/:orgId/:userId"
            component={ViewAssessments}
          />
          <Route exact path="/new-tab/:id" component={ViewAssessments} />

          <Route exact path="/view-candidate" component={ViewCandidates} />
          <Route exact path="/view-candidate/:id" component={ViewCandidates} />
          <Route
            exact
            path="/organization-management"
            component={OrganizationManagement}
          />
          <Route exact path="/view-active-users" component={ActiveUsers} />
          <Route exact path="/view-active-users/:id" component={ActiveUsers} />
          <Redirect to="/" />
        </Switch>
      </Router>

      <BaseDialog
        open={call.success}
        onClose={() => {
          setCall({ open: false, success: false, data: {}, msg: "" });
        }}
      >
        <div className="heading3_b mb-0 mb-3">
          Your request has been acknowledged by our system
        </div>
        <div className="mb-3">
          Our help desk team will soon connect with you
        </div>
        <div className="text-center">
          <button
            className="mb-5 btn btn-dark"
            onClick={() => {
              setCall({
                open: false,
                success: false,
                data: {},
                msg: ""
              });
            }}
          >
            Ok
          </button>
        </div>
      </BaseDialog>

      <BaseDialog
        open={call.open}
        onClose={() => {
          setCall({ open: false, success: false, data: {}, msg: "" });
        }}
      >
        <div className="heading3_b mb-0 mb-3">{call.msg}</div>
        <div className="text-center mb-5">
          <div className="mb-3">
            Once you proceed to call, help desk will be notified and
            <br />
            you will soon receive a call on your registered mobile.
          </div>
          <button
            className="btn btn-dark"
            onClick={() => {
              callConnect(call.data);
              setCall({
                open: false,
                success: false,
                data: {},
                msg: ""
              });
            }}
          >
            Send
          </button>
        </div>
      </BaseDialog>

      <SnackBarCustom
        snackObj={snackBar}
        onClose={() => setSnackBar({ ...snackBar, open: false, message: "" })}
      />
    </>
  );
};

const mapStateToProps = state => {
  return {
    request_status: state.entityData.request_status,
    request_state: state.entityData.request_state,
    error_message: state.entityData.errorMsg,
    me: state.entityData.ME,
    loggedIn:
      (state.entityData.ME && state.entityData.ME.id) ||
      JSON.parse(localStorage.getItem("loggedIn")),
    routerPath: state.router.location.pathname
  };
};

const mapDispatchToProps = dispatchWithRequest((dispatch, req, reset) => {
  return {
    getMe: req({ entityName: "ME", action: "LIST" }),
    doLogout: data => {
      dispatch(logout.request(data));
    }
  };
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(AppRoutes)));
