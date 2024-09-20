import React, { useMemo } from "react";
import _get from "lodash/get";

const DynamicFormViewer = ({ labels, values = {} }) => {
  return (
    <>
      {Object.keys(labels).map(key => {
        let item = _get(labels, key);
        let label = _get(item, "label", "");
        let val = _get(values, key);
        let value = _get(val, "value", _get(item, "value", ""));
        let options = _get(item, "options");
        if (Array.isArray(options)) {
          let option = options.filter(option => option.value === value);
          if (option.length > 0) value = option[0].key;
        }
        if (value === false) {
          value = "false";
        }
        if (value === true) value = "true";
        return (
          <div class="container">
            <div class="row pb-2">
              <div class="col-8">{label ? label : key}</div>
              <div class="col-4">{value}</div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default DynamicFormViewer;
