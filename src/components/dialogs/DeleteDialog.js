import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import BaseDialog from "./BaseDialog";
import Button from "@material-ui/core/Button";

import { styles } from "./../.styles.js";

const DeleteDialog = function({ classes, open, onClose, onYes }) {
  return (
    <>
      <BaseDialog open={open} onClose={onClose}>
        <div className="text-center mb-4">
          <div className="heading2_reg">
            Are you sure you
            <br />
            want to delete this?
          </div>
          <button className="mt-3 btn btn-dark" type="submit" onClick={onYes}>
            Yes
          </button>
        </div>
      </BaseDialog>
    </>
  );
};

export default withStyles(styles)(DeleteDialog);
