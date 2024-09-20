import { makeStyles } from "@material-ui/core";
import React from "react";

const DoteAnimation = props => {
  const useStyles = makeStyles(theme => ({
    "@keyframes pulse": {
      "0%": {
        transform: "scale(0.95)",
        boxShadow: `0 0 0 0 ${props.shadowColor || "rgba(28, 213, 42, 0.7)"}`
      },
      "70%": {
        transform: "scale(1)",
        boxShadow: `0 0 0 10px ${props.plainShadowColor ||
          "rgba(28, 213, 42, 0)"}`
      },
      "100%": {
        transform: "scale(0.95)",
        boxShadow: `0 0 0 0 ${props.plainShadowColor || "rgba(28, 213, 42, 0)"}`
      }
    },
    basicDot: {
      background: props.color || "rgba(28, 213, 42, 1)",
      borderRadius: "50%",
      boxShadow: `0 0 0 0 ${props.color || "rgba(28, 213, 42, 1)"}`,
      height: props.height || "12px",
      width: props.width || "12px",
      transform: "scale(1)",
      animation: "$pulse 2s infinite"
    }
  }));

  const classes = useStyles();
  return (
    <div>
      <div className={classes.basicDot} id="liveDot"></div>
    </div>
  );
};
export default DoteAnimation;
