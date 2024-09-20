import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const AutoComplete = ({
  id,
  options,
  optionLabel,
  label,
  value,
  field,
  width,
  helperText,
  error,
  name,
  onChange,
  cls,
  variant,
  textFldWidth
}) => {
  return (
    <Autocomplete
      id={id}
      name={name}
      options={options}
      renderInput={params => (
        <TextField
          style={{ width: textFldWidth }}
          {...params}
          name={name}
          id={id}
          label={label}
          error={error}
          helperText={helperText}
          variant={variant}
          className={cls}
        />
      )}
      getOptionLabel={optionLabel}
      className={`m-0 mr-3`}
      style={{ width: width ? width : 600 }}
      value={value}
      onChange={onChange}
    />
  );
};

export default AutoComplete;
