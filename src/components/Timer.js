import withStyles from "@material-ui/core/styles/withStyles";
import React, { Component, Fragment } from "react";

const styles = theme => ({
  inl_block: {
    display: "inline-block",
    zIndex: "1"
  }
});

class CountdownTimer extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      startTime: parseInt(props.startTimeInSeconds),
      timeRemainingInSeconds: parseInt(props.startTimeInSeconds),
      isResendActive: false,
      handleStopTimer: props.handleStopTimer,
      showResendButton: props.showResendButton || true
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.startTimer();
  }
  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(this.timer);
  }
  startTimer = () => {
    this.timer = setInterval(() => {
      this.decrementTimeRemaining();
    }, 1000);
  };

  leading0 = numVal => {
    if (parseInt(numVal) >= 0 && parseInt(numVal) < 10) {
      return "0" + numVal;
    }
    return numVal;
  };

  decrementTimeRemaining = () => {
    const { timeRemainingInSeconds } = this.state;
    if (parseInt(timeRemainingInSeconds) > 0) {
      this.setState({
        timeRemainingInSeconds: this.leading0(timeRemainingInSeconds - 1),
        isResendActive: false
      });
    } else {
      this.setState({ isResendActive: true }, this.state.handleStopTimer);
      clearInterval(this.timer);
    }
  };

  handleResendClick = () => {
    const { onResendClick } = this.props;
    const { startTime } = this.state;
    onResendClick();
    this.setState(
      { timeRemainingInSeconds: startTime, isResendActive: false },
      () => this.startTimer()
    );
  };

  render() {
    const { isResendActive } = this.state;
    const { classes, showResendButton } = this.props;
    return (
      <Fragment>
        {!isResendActive ? (
          <div className="countdown-timer">
            00:{this.state.timeRemainingInSeconds}
          </div>
        ) : showResendButton ? (
          <div
            className={
              "resend-button heading6_reg text_blue cursor_pointer " +
              classes.inl_block
            }
            onClick={this.handleResendClick}
          >
            Resend OTP
          </div>
        ) : null}
      </Fragment>
    );
  }
}

export default withStyles(styles)(CountdownTimer);
