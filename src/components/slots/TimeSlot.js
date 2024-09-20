import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DoneIcon from "@material-ui/icons/DoneOutlined";

import CircularProgress from "@material-ui/core/CircularProgress";
import { byFormat } from "../../helpers/dateHelper";

const displayFormat = "hh:mm A";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  text: {
    marginLeft: `${theme.spacing.unit * 3}px`,
    marginRight: theme.spacing.unit,
    fontSize: "12px",
    fontWeight: "600"
  },
  textOpen: {
    marginLeft: `${theme.spacing.unit * 3}px`,
    marginRight: theme.spacing.unit,
    fontSize: "12px",
    fontWeight: "600"
  },
  icon: {
    fontSize: "16px",
    fontWeight: "bold",
    visibility: "visible"
  },
  iconVisibility: {
    fontSize: "16px",
    fontWeight: "bold",
    visibility: "hidden"
  },
  progress: {}
});

const TimeSlot = props => {
  const {
    slot,
    isSlotUnSelected,
    onSlotClick,
    classes,
    isSlotSaving,
    isSlotDisabled
  } = props;
  return (
    <Button
      variant={isSlotUnSelected(slot) ? "outlined" : "contained"}
      color={"primary"}
      disabled={isSlotDisabled(slot)}
      className={classes.button}
      onClick={() => onSlotClick(slot)}
      size="small"
    >
      <Typography
        color={isSlotUnSelected(slot) ? "default" : "inherit"}
        variant="button"
        className={isSlotUnSelected(slot) ? classes.text : classes.textOpen}
      >
        {byFormat(slot.start_date, displayFormat)}
      </Typography>
      {!isSlotSaving(slot.id) && (
        <DoneIcon
          className={
            isSlotUnSelected(slot) ? classes.iconVisibility : classes.icon
          }
        />
      )}
      {isSlotSaving(slot.id) && (
        <CircularProgress
          className={classes.progress}
          size={15}
          thickness={5}
          color="secondary"
        />
      )}
    </Button>
  );
};

export default withStyles(styles)(TimeSlot);
