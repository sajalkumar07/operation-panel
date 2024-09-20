import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";

export default function(props) {
  const {
    confirmDialogOpen = false,
    setConfirmDialogOpen = () => {},
    dialog = {},
    noBtn = {},
    yesBtn = {},
    autoFocus
  } = props;
  return (
    <>
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {dialog.title && (
          <DialogTitle id="alert-dialog-title">{dialog.title}</DialogTitle>
        )}
        <DialogContent>
          {dialog.content && (
            <DialogContentText id="alert-dialog-description text-monospace p-2">
              {dialog.content}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          {noBtn.label && (
            <Button
              variant={`${autoFocus ? "text" : "contained"}`}
              onClick={() => {
                noBtn.cb();
                setConfirmDialogOpen(false);
              }}
              color="primary"
              autoFocus
            >
              {noBtn.label}
            </Button>
          )}
          {yesBtn.label && (
            <Button
              onClick={() => {
                yesBtn.cb();
                setConfirmDialogOpen(false);
              }}
              color="primary"
              variant={`${!autoFocus ? "text" : "contained"}`}
            >
              {yesBtn.label}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
