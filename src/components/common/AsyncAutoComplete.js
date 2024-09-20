import React, { useEffect, useState, Fragment, useCallback } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import debounce from "lodash.debounce";

export default function AsyncAutoComplete({
  fetchOptions,
  options,
  label,
  searchKey,
  value,
  onChange
}) {
  const [open, setOpen] = useState(false);
  const loading = open && options.length === 0;
  const [inputValue, setInputValue] = useState("");
  const debouncedFetch = useCallback(
    debounce(nextValue => fetchOptions(nextValue), 1000),
    []
  );

  useEffect(() => {
    if (inputValue.length > 4) debouncedFetch(inputValue);
  }, [inputValue]);

  return (
    <Autocomplete
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      getOptionSelected={(option, value) =>
        option[searchKey] === value[searchKey]
      }
      getOptionLabel={option => option[searchKey]}
      options={options}
      loading={loading}
      value={value}
      onChange={(event, newValue) => {
        newValue && onChange(newValue[searchKey]);
      }}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </Fragment>
            )
          }}
        />
      )}
    />
  );
}
