import React from "react";
import TextField from "@material-ui/core/TextField";
import FilterListIcon from "@material-ui/icons/FilterList";

const Filter = props => {
  return (
    <div className="MuiInputBase-root MuiInput-underline MuiInputBase-formControl">
      <FilterListIcon />
      <TextField
        value={props.value}
        placeholder={props.placeholder}
        onChange={e =>
          props.onChange(
            props.name,
            props.key1,
            props.key2,
            props.key3,
            e.target.value
          )
        }
      />
    </div>
  );
};

export default React.memo(Filter);
