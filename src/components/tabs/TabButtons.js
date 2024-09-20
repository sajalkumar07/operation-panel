import React from "react";
import * as PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  tabContainer: {
    height: "2rem",
    paddingTop: "0.2rem"
  },
  tab: {
    padding: "0.4rem 1rem",
    cursor: "pointer",
    fontSize: "0.9rem"
  },
  active: {
    backgroundColor: "#2B3467",
    color: "white",
    fontWeight: "bold",
    borderRadius: "8px",
    fontSize: "0.8rem",
    transition: "all 0.3s ease"
  }
});

const TabButtons = ({
  active,
  setTab,
  list,
  mappingKey,
  labelKey = "label"
}) => {
  const classes = useStyles();
  return (
    <div className={classes.tabContainer}>
      {list.map(tab => (
        <span
          key={tab[mappingKey]}
          className={`mr-3 ${classes.tab} ${
            active === tab[mappingKey] ? classes.active : ""
          }`}
          onClick={() => setTab(tab[mappingKey])}
        >
          {`${tab[labelKey]}${
            tab.count && tab.count !== 0 ? ` (${tab.count})` : ""
          }`}
        </span>
      ))}
    </div>
  );
};

TabButtons.propTypes = {
  active: PropTypes.string.isRequired,
  mappingKey: PropTypes.string.isRequired,
  setTab: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
  labelKey: PropTypes.string
};

TabButtons.defaultProps = {
  active: "active",
  mappingKey: "value",
  setTab: () => {},
  list: [
    {
      label: "label",
      value: "value"
    }
  ]
};

export default TabButtons;
