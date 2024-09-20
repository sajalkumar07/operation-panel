import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import React from "react";

const logoImg = require("../../images/whiteHatLogo.png");

const styles = theme => ({
  avatar: {
    margin: theme.spacing.unit
  }
});

const Logo = props => {
  const { classes } = props;
  return (
    <div className={`${classes.avatar} header_logo`}>
      <Typography variant="h6" noWrap>
        <img width={props.width} height={props.height} src={logoImg} alt="" />
      </Typography>
    </div>
  );
};

export default withStyles(styles)(Logo);
