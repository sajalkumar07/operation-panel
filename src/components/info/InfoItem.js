import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit,
    display: "flex",
    flexDirection: "column",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 2}px ${theme.spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  description: {
    margin: theme.spacing.unit
  }
});

const InformationItem = props => {
  const { classes, header, description, children } = props;

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Avatar className={classes.avatar}>{children}</Avatar>
        <Typography component="h1" variant="h5">
          {header}
        </Typography>
      </div>
      <Typography
        component="h1"
        variant="body1"
        className={classes.description}
      >
        {description}
      </Typography>
    </div>
  );
};

InformationItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InformationItem);
