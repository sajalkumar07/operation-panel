import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link, withRouter } from "react-router-dom";

const styles = theme => ({});

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      menuDrawer: false
    };
  }

  handleChange(event, value) {
    this.setState({ value });
  }

  mobileMenuOpen(event) {
    this.setState({ menuDrawer: true });
  }

  mobileMenuClose(event) {
    this.setState({ menuDrawer: false });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="bg-white footer_container">
        <div className="row align-items-center p-2">
          <div className="col-md-6">
            <div className="text-xl-left text-lg-left text-md-left text-center heading4_reg">
              © 2019 made with Love by, Whitehat Education Technology PVT LTD.
            </div>
          </div>
          <div className="col-md-6">
            <div className="text-xl-right text-lg-right text-md-right text-center ">
              <span className="footer p-2 d-block">
                {/* <img src={footerLogo} className="img-fluid" /> */}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Footer));
