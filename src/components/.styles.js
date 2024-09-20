export const styles = theme => ({
  textField: {
    marginBottom: "1rem",
    textAlign: "center"
  },
  margin: {
    width: "100%"
  },
  alertEmiMessage: {
    "& > *": {
      margin: theme.spacing(1),
      padding: theme.spacing(1),
      background: "darkseagreen"
    }
  },
  linkSpan: {
    color: "blue",
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer"
    }
  },
  helperJSONText: {
    fontSize: "12px",
    color: "grey",
    padding: "5px"
  },
  w_25: {
    width: "25%"
  },
  uploadButton: {
    display: "flex",
    alignItems: "center"
  },
  relativeSelect: {
    position: "relative"
  },
  loader: {
    position: "absolute",
    top: "15px",
    right: "25px"
  },
  breakText: {
    wordBreak: "break-word"
  },
  classListContainer: {
    display: "flex",
    flexDirection: "column"
  },
  classItem: {
    display: "grid",
    gridTemplateColumns: "15% 65% 20%",
    fontSize: "14px"
  },
  classSequence: {},
  classFullName: {},
  fs16: {
    fontSize: "16px",
    marginBottom: "10px"
  },

  classNumber: {
    background: "#7add7a",
    fontWeight: "800",
    padding: "10px"
  },

  containerDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "left",
    alignItems: "start"
  },
  radioBtnTitleDiv: {
    marginBottom: "16px",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "18px",
    color: "#191919"
  },
  radioBtnOption: {
    marginRight: "145px",
    marginBottom: "23px",
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "20px",
    color: "#191919"
  },
  textAreaTitleDiv: {
    marginTop: "16px",
    marginBottom: "16px",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "18px",
    color: "#191919"
  },
  radioBtnStyle: {
    marginRight: "16px"
  },
  checkBoxPosition: {
    marginLeft: "-12px"
  },
  datePicketStyle: {
    width: "17rem"
  },
  textAreaDiv: {
    width: "34rem"
  }
});
