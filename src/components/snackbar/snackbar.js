import React from "react";
import { WarningSnackbarContent } from "./WarningSnackbarContent";
import Snackbar from "@material-ui/core/Snackbar";

const initSnack = { open: false, variant: "info", message: "" };

const SnackBarCustom = ({ onClose = () => {}, snackObj = initSnack }) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
      ContentProps={{ "aria-describedby": "message-id" }}
      open={snackObj.open}
      autoHideDuration={4000}
      onClose={() => onClose()}
    >
      <WarningSnackbarContent
        variant={snackObj.variant}
        onClose={() => onClose()}
        message={snackObj.message}
      />
    </Snackbar>
  );
};

export default SnackBarCustom;
