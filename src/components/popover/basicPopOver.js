import React from "react";
import Popover from "@material-ui/core/Popover";

const BasicPopOver = props => {
  const {
    children,
    anchorEl = null,
    onClose,
    anchorOrigin = { vertical: "top", horizontal: 90 },
    transformOrigin,
    open = false,
    paperProps = "p-2"
  } = props;
  return (
    <Popover
      id={open ? "simple-popover" : undefined}
      open={open && Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      classes={{
        paper: paperProps
      }}
    >
      {children}
    </Popover>
  );
};

export default BasicPopOver;
