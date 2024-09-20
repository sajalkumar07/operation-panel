import React, { useState } from "react";
import { fileSizeCheck } from "../../helpers/utils";

export const SelectFiles = function({
  placeholder = "Upload",
  onSelect,
  formDataKey = "files",
  accept = "",
  multiple = false,
  disabled = false
}) {
  const [error, setError] = useState(false);
  const onChange = ({ target }) => {
    let formData = new FormData();
    let files = Array.from(target.files);
    if (
      target &&
      target.files &&
      target.files.length > 0 &&
      fileSizeCheck(target.files[0].size)
    ) {
      setError(true);
    } else {
      setError(false);
      for (let i = 0; i < files.length; i++) {
        formData.append(formDataKey, files[i]);
      }

      target.value = "";
      onSelect(formData);
    }
  };

  return (
    <>
      <label className={"btn btn-dark m-0" + (disabled ? " disabled" : "")}>
        <input
          multiple={multiple}
          type="file"
          disabled={disabled}
          accept={accept}
          onChange={onChange}
          hidden
        />
        {placeholder}
      </label>
      <div className="m-0">
        {error ? (
          <span style={errorStyle}>File Size should be less than 6mb</span>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
const errorStyle = {
  color: "#ba000d"
};

export default SelectFiles;
