import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import withStyles from "@material-ui/core/styles/withStyles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = theme => ({
  container: {
    alignSelf: "stretch",
    flexGrow: 1,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  dialogBox: {
    margin: theme.spacing(1)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(0.5),
    top: theme.spacing(0.5),
    color: theme.palette.grey[500]
  }
});

const TransitionDialog = ({
  classes,
  open,
  onClose,
  children = <></>,
  title = "",
  maxWidth = "sm",
  fullWidth = true,
  disableEscapeKeyDown = false,
  disableBackdropClick = false
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={onClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      className={classes.dialogBox}
      scroll="body"
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      disableEscapeKeyDown={disableEscapeKeyDown}
      disableBackdropClick={disableBackdropClick}
    >
      {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}

      {onClose && (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      )}
      <DialogContent>
        <div className={`${classes.container} py-4`}>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default withStyles(styles)(TransitionDialog);
