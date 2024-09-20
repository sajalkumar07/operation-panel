import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { Link } from "react-router-dom";
import _get from "lodash/get";
import PermissionProvider from "../RBAC/PermissionProvider";

const commonBtn = {
  fontWeight: "bold",
  width: "150px",
  maxWidth: "150px"
};

const styles = theme => ({
  delButton: {
    margin: theme.spacing(1),
    ...commonBtn,
    backgroundColor: "firebrick",
    color: "white",
    "&:hover": {
      backgroundColor: "darkred"
    }
  },
  enableBtn: {
    color: "green",
    ...commonBtn
  },
  disableBtn: {
    color: "firebrick",
    ...commonBtn
  },
  button: {
    ...commonBtn,
    color: theme.palette.primary.main,
    "&:focus": {
      borderRadius: "3px",
      border: "0.5px solid",
      outline: "none"
    }
  },
  linkBtn: {
    ...commonBtn,
    color: theme.palette.secondary.main,
    width: "100%"
  },
  specialBtn: {
    ...commonBtn,
    color: "#fff",
    background: "darkslateblue",
    width: "100%"
  }
});

const ActionWidget = props => {
  const { btnLayers = [], classes, keyProp } = props;

  return (
    <div
      key={`action-widget-${keyProp}`}
      className="d-flex flex-column align-items-center"
    >
      {btnLayers.map(
        (
          {
            onClick,
            btnType,
            btnLabel,
            isActive,
            btnLink,
            cHide,
            permission,
            hidden,
            disabled,
            variant = "contained",
            colorProps = { txt: "#fff", bg: "darkslateblue" }
          },
          key
        ) => {
          let button = null;
          switch (btnType) {
            case "delete":
              button = (
                <Button
                  variant={variant}
                  className={`${classes.delButton} mt-3`}
                  startIcon={<DeleteIcon />}
                  size="small"
                  onClick={() => onClick()}
                  hidden={hidden}
                  disabled={disabled}
                >
                  {btnLabel ? btnLabel : "Delete"}
                </Button>
              );
              break;
            case "toggle":
              button = (
                <Button
                  size="small"
                  className={isActive ? classes.enableBtn : classes.disableBtn}
                  onClick={() => onClick()}
                  hidden={hidden}
                >
                  {btnLabel}
                </Button>
              );
              break;
            case "link":
              button = (
                <Link to={`${btnLink}`}>
                  <Button
                    size="small"
                    className={classes.linkBtn}
                    hidden={hidden}
                  >
                    {btnLabel}
                  </Button>
                </Link>
              );
              break;
            case "chide":
              button = cHide ? (
                <Button
                  size="small"
                  className={classes.button}
                  onClick={() => onClick()}
                  hidden={hidden}
                >
                  {btnLabel}
                </Button>
              ) : (
                <></>
              );
              break;
            case "auditHistory":
              button = (
                <Button
                  size="small"
                  className={classes.button}
                  onClick={() => onClick()}
                  hidden={hidden}
                >
                  {btnLabel ? btnLabel : "Audit History"}
                </Button>
              );
              break;
            case "special":
              button = (
                <Button
                  size="small"
                  variant={variant}
                  className={`${classes.button} ${classes.specialBtn}`}
                  onClick={() => onClick()}
                  hidden={hidden}
                  style={{ color: colorProps.txt, background: colorProps.bg }}
                >
                  {btnLabel ? btnLabel : "Save"}
                </Button>
              );
              break;
            case "chain":
              button = (
                <Button
                  size="small"
                  className={classes.linkBtn}
                  hidden={hidden}
                  onClick={() => onClick()}
                  startIcon={<KeyboardArrowDownIcon />}
                />
              );
              break;
            default:
              button = (
                <Button
                  size="small"
                  className={`${classes.button} mb-2`}
                  onClick={() => onClick()}
                  hidden={hidden}
                  disabled={disabled}
                >
                  {btnLabel}
                </Button>
              );
          }
          if (permission) {
            return (
              <PermissionProvider name={permission}>
                {button}
              </PermissionProvider>
            );
          }
          return button;
        }
      )}
      {props.children}
    </div>
  );
};

export default withStyles(styles)(ActionWidget);
