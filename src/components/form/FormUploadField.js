import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  textField: {
    width: "100%"
  }
});

const FormUploadField = props => {
  const { id, label, touched, errors, onChange, classes, type, values } = props;
  return (
    <TextField
      type={type}
      required
      name={id}
      id={id}
      label={label}
      helperText={touched[id] ? errors[id] : ""}
      error={touched[id] && Boolean(errors[id])}
      onChange={onChange.bind(null, id, false)}
      onBlur={onChange.bind(null, id, true)}
      defaultValue={values}
      margin="normal"
      className={classes.textField}
    />
  );
};

export default withStyles(styles)(FormUploadField);
