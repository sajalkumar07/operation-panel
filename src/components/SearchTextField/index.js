import React, { useCallback, useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import debounce from "lodash/debounce";
import _get from "lodash/get";
import { makeStyles } from "@material-ui/core/styles";

const DEFAULT_DEBOUNCE_TIME = 200;
const DEFAULT_OPTION_SEARCH_KEY = "name";

const useStyles = makeStyles({
  option: {
    fontSize: 14
  },
  popper: {
    minWidth: "300px !important",
    background: "#f9f9f9 !important",
    position: "absolute !important"
  }
});

const SearchTextField = props => {
  const {
    label = "",
    variant = "outlined",
    onChange,
    options = [],
    optionLabel = DEFAULT_OPTION_SEARCH_KEY,
    debounceTime = DEFAULT_DEBOUNCE_TIME,
    customLabel = DEFAULT_OPTION_SEARCH_KEY,
    isResetValue = false,
    autoHighlight = false,
    helperText = "",
    isLoading = true,
    value,
    error
  } = props;

  const [selectValue, setSelectValue] = useState(value || "");
  const loading = isLoading && options && options.length === 0;
  const classes = useStyles();

  useEffect(() => {
    if (isResetValue) {
      setSelectValue("");
    }
  }, [isResetValue]);

  const handleInputChange = val => setSelectValue(val);

  // Debounce on input field
  const delayedQuery = useCallback(
    debounce(handleInputChange, debounceTime),
    []
  );

  return (
    <>
      <Autocomplete
        {...props}
        fullWidth
        value={selectValue}
        onChange={(event, newValue) => {
          event.persist();
          event.stopPropagation();
          onChange(newValue);
          delayedQuery(newValue);
        }}
        id="combo-box-demo"
        classes={classes}
        autoHighlight={autoHighlight}
        loading={loading}
        options={options.map(item =>
          _get(item, `${[optionLabel]}`, optionLabel)
        )}
        getOptionLabel={option => {
          if (option) {
            let resultData = options.find(
              item => option === _get(item, `${[optionLabel]}`, optionLabel)
            );
            if (resultData) {
              return `${resultData[customLabel]}`;
            }
          }
          return "";
        }}
        renderInput={params => (
          <TextField
            {...params}
            fullWidth
            error={error}
            label={label}
            variant={variant}
            InputProps={{ ...params.InputProps }}
            helperText={helperText}
          />
        )}
      />
    </>
  );
};

export default SearchTextField;
