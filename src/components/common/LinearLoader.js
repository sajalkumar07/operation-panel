import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import LinearProgress from "@material-ui/core/LinearProgress";

const styles = theme => ({
  loaderContainer: {
    marginBottom: "10px"
  }
});
const LinearLoader = props => {
  const { classes } = props;
  return (
    <div className={classes.loaderContainer}>
      <LinearProgress />
    </div>
  );
};

export default withStyles(styles)(LinearLoader);
