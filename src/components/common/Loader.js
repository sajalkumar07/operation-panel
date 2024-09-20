import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  loaderContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "center"
  },
  marginDense: {
    marginTop: "10%"
  }
});
const Loader = props => {
  const { classes, margin, size = 40 } = props;
  return (
    <div
      className={`${classes.loaderContainer} ${
        margin === "normal" ? "my-5" : classes.marginDense
      }`}
    >
      <CircularProgress color="primary" size={size} />
    </div>
  );
};

export default withStyles(styles)(Loader);
