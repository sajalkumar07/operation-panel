import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";

const styles = () => ({
  text: {
    color: "red"
  }
});

class SubTitle extends Component {
  render() {
    const { classes, subTitle, count } = this.props;

    return (
      <div className={`pt-2 pb-2 heading_bold`}>
        {subTitle} <span className={classes.text}>{count}</span>
      </div>
    );
  }
}

export default withStyles(styles)(SubTitle);
