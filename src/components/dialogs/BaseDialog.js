import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DialogTitle from "@material-ui/core/DialogTitle";

const styles = theme => ({
  container: {
    alignSelf: "stretch",
    flexGrow: 1,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  bottomMargin: {
    marginBottom: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(2),
    top: theme.spacing(2),
    color: theme.palette.grey[500]
  }
});

let BaseDialog = function({
  classes,
  open,
  onClose,
  children = <></>,
  title = "",
  maxWidth = "sm",
  fullWidth = true,
  isDisableBackdropClick
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      scroll="body"
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      disableBackdropClick={isDisableBackdropClick}
      className="modelclass"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      {onClose ? (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
      <DialogContent>
        <div className={classes.container}>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default withStyles(styles)(BaseDialog);
