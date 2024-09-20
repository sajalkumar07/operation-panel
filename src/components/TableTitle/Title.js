import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";

class Title extends Component {
  render() {
    const { title } = this.props;
    return (
      <div
        className={"heading_bold font16 ml-3 my-3 d-flex align-items-center"}
      >
        {title}
      </div>
    );
  }
}

export default Title;
