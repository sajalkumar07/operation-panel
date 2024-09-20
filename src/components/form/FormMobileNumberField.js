import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Link from "react-router-dom/Link";
import {
  checkIsCustom,
  formatCountryMobile,
  formatMobileNumber
} from "../../helpers/utils";

const styles = () => ({
  textField: {
    width: "100%"
  }
});

const FormMobileNumberField = props => {
  const {
    id,
    dialCodeField = "dialCode",
    label,
    touched = {},
    errors = {},
    onChange,
    classes,
    type,
    fieldClasses,
    required = true,
    margin = "normal",
    showLoginLink = false,
    fullWidth = false,
    isUsNumber = false,
    inputLabelRequired = false,
    values,
    placeholder = ""
  } = props;

  let isCustom = checkIsCustom(values, dialCodeField, id);

  let mobileNumber = values[id];
  if (isUsNumber || isCustom) {
    mobileNumber = formatCountryMobile(values[id], "US");
  }

  const changeEvent = (name, flgBlur, e) => {
    const mobile = formatMobileNumber(e.target.value);
    onChange(name, flgBlur, {
      target: {
        id: id,
        name: id,
        value: mobile
      }
    });
  };

  return (
    <TextField
      fullWidth={fullWidth}
      type={type}
      required={required}
      name={id}
      id={id}
      placeholder={placeholder}
      label={label}
      showLoginLink={showLoginLink}
      helperText={
        touched[id] ? (
          errors[id] ? (
            <span className={"d-flex justify-content-between"}>
              <span>{errors[id]}</span>
              {showLoginLink ? (
                <span className={"text_blue"}>
                  <Link className={"text_dec_none text_blue heading_bold"}>
                    LOGIN HERE
                  </Link>
                </span>
              ) : (
                ""
              )}
            </span>
          ) : (
            ""
          )
        ) : (
          ""
        )
      }
      error={touched[id] && Boolean(errors[id])}
      onChange={changeEvent.bind(null, id, false)}
      onBlur={changeEvent.bind(null, id, false)}
      value={mobileNumber}
      margin={margin}
      className={props.className || classes.textField}
      classes={fieldClasses ? fieldClasses : {}}
      InputLabelProps={{
        required: inputLabelRequired
      }}
    />
  );
};

export default withStyles(styles)(FormMobileNumberField);
