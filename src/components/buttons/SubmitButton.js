import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  primary: {
    color: "white",
    width: "150px"
  },
  spaceTop: {
    marginTop: 5
  }
});

const SubmitButton = function(props) {
  const {
    classes,
    isSubmitting,
    className = "",
    caption = "Submit",
    disabled = false
  } = props;

  return (
    <div className={classes.spaceTop}>
      <Button
        variant="contained"
        type="submit"
        color="primary"
        className={`${classes.primary} ${className}`}
        disabled={isSubmitting || disabled}
      >
        {caption}
      </Button>
    </div>
  );
};

export default withStyles(styles)(SubmitButton);
