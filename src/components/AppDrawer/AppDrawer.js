import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import Collapse from "@material-ui/core/Collapse";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useTheme from "@material-ui/core/styles/useTheme";
import PermissionProvider, {
  userHasAccess
} from "../../components/RBAC/PermissionProvider";
import { curry, map } from "ramda";
import NAV_CONFIG from "./config";
import addIndex from "ramda/src/addIndex";
import { reduce } from "ramda";
import { makeStyles } from "@material-ui/core/styles";
import PopOverTooltip from "../../components/popover/popover";

const useStyles = makeStyles({
  selectList: {
    backgroundColor: prop => (prop ? " rgb(255, 101, 2 , 0.7)" : "#fff"),
    color: prop => (prop ? "#fff" : "#000"),
    borderRadius: prop => (prop ? "10px" : "0")
  },
  selectIcon: {
    color: prop => (prop ? "#fff" : "rgba(0, 0, 0, 0.54)"),
    minWidth: "46px"
  },
  selectListArea: {
    background: "#f7c3ae",
    overflowX: "hidden",
    "& .sidebar-visited-link": {
      background: "darksalmon",
      borderBottomRightRadius: "10em",
      borderTopRightRadius: "2em"
      // overflow: "auto"
    },
    "& .sidebar-to-link": {
      textDecoration: "none",
      color: "maroon", //'chocolate',
      fontWeight: "700",
      // paddingLeft:'0.4em',
      "&:hover": {
        textDecoration: "none",
        backgroundColor: "rgba(0, 0, 0, 0.04)"
      },
      "& div.MuiListItem-button": {
        // overflow: "auto"
      }
    }
  }
});

const getChildListItem = curry(
  (me, setOpen, { primary, to, permissions, icon = <></> }) => {
    let listItem = (
      <ListItem button>
        {/* <ListItemIcon className="ml-2">{icon}</ListItemIcon> */}
        <ListItemText className={"pl-3"} primary={primary} />
      </ListItem>
    );
    let listNameCount = primary ? primary.length : 0;
    return (
      <PermissionProvider key={primary} user={me} actions={permissions}>
        {window.location.pathname !== to ? (
          <Link
            to={to}
            onClick={() => {
              //setOpen(false); // close drawer on click
            }}
            className={`sidebar-to-link`}
          >
            {listNameCount < 20 ? (
              listItem
            ) : (
              <PopOverTooltip
                btnText={listItem}
                isHelperText={false}
                mouseOver={true}
                ContentView={() => listItem}
              />
            )}
          </Link>
        ) : (
          <div className={`sidebar-visited-link`}>
            {listNameCount < 20 ? (
              listItem
            ) : (
              <PopOverTooltip
                btnText={listItem}
                isHelperText={false}
                mouseOver={true}
                ContentView={() => listItem}
              />
            )}
          </div>
        )}
      </PermissionProvider>
    );
  }
);

const mapChildListItem = (me, setOpen) => map(getChildListItem(me, setOpen));

const getListNav = (
  me,
  drawerOpen,
  selectedMenu,
  setSelectedMenu,
  onItemClick,
  setOpen
) => {
  return ({ icon = <></>, primary, list }, i) => {
    const showCategory = reduce(
      function(acc, { permissions }) {
        return acc ? acc : userHasAccess(me, permissions);
      },
      false,
      list
    );
    const classes = useStyles(selectedMenu === i);
    return (
      showCategory && (
        <List className={classes.selectList} key={i} disablePadding>
          <ListItem
            button
            onClick={() => {
              onItemClick();
              setSelectedMenu(i === selectedMenu ? -1 : i);
            }}
          >
            <ListItemIcon className={`${classes.selectIcon} ml-2`}>
              {icon}
            </ListItemIcon>
            <ListItemText primary={primary} />
            {selectedMenu === i ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse
            in={drawerOpen && selectedMenu === i}
            timeout="auto"
            unmountOnExit
            className={classes.selectListArea}
          >
            <Divider />
            <List component="div" disablePadding>
              {mapChildListItem(me, setOpen)(list)}
            </List>
          </Collapse>
          {drawerOpen && selectedMenu === i ? <Divider /> : ""}
        </List>
      )
    );
  };
};

const mapListNav = (
  me,
  open,
  selectedMenu,
  setSelectedMenu,
  onItemClick,
  setOpen
) =>
  addIndex(map)(
    getListNav(me, open, selectedMenu, setSelectedMenu, onItemClick, setOpen)
  );

export const AppDrawer = function({ me, classes, open, setOpen, onItemClick }) {
  const theme = useTheme();

  const drawerOpen = {
    [classes.drawerOpen]: open,
    [classes.drawerClose]: !open
  };
  const drawerClassName = clsx(classes.drawer, drawerOpen);
  const drawerClasses = { paper: clsx(drawerOpen) };
  const directionIcon =
    theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />;

  const [selectedMenu, setSelectedMenu] = useState(-1);

  return (
    <>
      <Drawer
        variant="permanent"
        className={`${drawerClassName} ${classes.whiteColor}`}
        classes={drawerClasses}
        open={open}
      >
        <div className={`${classes.toolbar}`}>
          <div className="flex-grow-1">
            <Link to={"/dashboard"}>
              <img
                src="https://d1dfulrx35zf6g.cloudfront.net/website/images/whitehatjr.png"
                alt="programming sites for kids"
                width="170px"
              />
            </Link>
          </div>
          <IconButton
            onClick={() => {
              setSelectedMenu(-1);
              setOpen(false);
            }}
          >
            {directionIcon}
          </IconButton>
        </div>
        <Divider />
        {mapListNav(
          me,
          open,
          selectedMenu,
          setSelectedMenu,
          onItemClick,
          setOpen
        )(NAV_CONFIG)}
      </Drawer>
    </>
  );
};
