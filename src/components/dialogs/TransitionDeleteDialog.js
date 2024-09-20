import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Slide from "@material-ui/core/Slide";
import { StyledTextContainer } from "../typo/StyleTextContainer";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DEFAULT_TEXT = "Are you sure you want to delete this record?";

const TransitionDeleteDialog = ({
  open,
  onClose,
  onYes,
  deletemodalVisibleid,
  labelText = DEFAULT_TEXT
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={onClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      className="p-3"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <StyledTextContainer className="heading_reg font16">
            {labelText}
          </StyledTextContainer>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="primary"
          className="heading_bold text_blue font14 text-capitalize"
        >
          No
        </Button>
        <Button
          onClick={e => onYes(deletemodalVisibleid)}
          color="primary"
          className="heading_bold text_blue font14 text-capitalize"
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransitionDeleteDialog;
