import React, { useMemo } from "react";
import TextField from "@material-ui/core/TextField";
import _get from "lodash/get";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const DynamicFormGenerator = ({ config, formik, me }) => {
  const hasPermission = requiredPermission => {
    return !requiredPermission || me.permission.includes(requiredPermission);
  };

  const builder = individualConfig => {
    if (!hasPermission(individualConfig.permission)) return <></>;
    switch (individualConfig.type) {
      case "text":
      case "number":
        return (
          <>
            <div>
              <TextField
                label={individualConfig.label}
                className="m-0 mb-3"
                style={{ ...individualConfig.style }}
                fullWidth
                type={individualConfig.type}
                error={
                  _get(formik.errors, individualConfig.field) &&
                  _get(formik.touched, individualConfig.field)
                }
                autoComplete="off"
                onBlur={formik.handleBlur}
                variant={"outlined"}
                helperText={
                  !!(
                    _get(formik.errors, individualConfig.field) &&
                    _get(formik.touched, individualConfig.field)
                  )
                    ? `( ${_get(formik.errors, individualConfig.field)} )`
                    : ""
                }
                onChange={formik.handleChange}
                name={individualConfig.field}
                placeholder={individualConfig.label}
                value={_get(formik.values, individualConfig.field)}
              />
            </div>
          </>
        );
        break;
      case "checkbox":
        return (
          <>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={formik.handleChange}
                    fullWidth
                    name={individualConfig.field}
                    checked={_get(formik.values, individualConfig.field)}
                  />
                }
                label={individualConfig.label}
              />
            </div>
          </>
        );
      case "select":
        return (
          <>
            <div>
              <TextField
                name={individualConfig.field}
                select
                fullWidth
                label={individualConfig.label}
                onBlur={formik.handleBlur}
                variant={"outlined"}
                className={` m-0 mb-3`}
                onChange={formik.handleChange}
                value={_get(formik.values, individualConfig.field)}
                margin="normal"
                error={
                  _get(formik.errors, individualConfig.field) &&
                  _get(formik.touched, individualConfig.field)
                }
                helperText={
                  !!(
                    _get(formik.errors, individualConfig.field) &&
                    _get(formik.touched, individualConfig.field)
                  )
                    ? `( ${_get(formik.errors, individualConfig.field)} )`
                    : ""
                }
              >
                <MenuItem key="" value="" disabled>
                  --- Select {individualConfig.label} ---
                </MenuItem>
                {(individualConfig.options || []).map(({ key, value }) => (
                  <MenuItem key={key} value={value}>
                    {key}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </>
        );
      case "array":
        return (
          <>
            <div className="mb-2 d-flex justify-content-start">
              {individualConfig.label}
            </div>
            <div className="pl-3">
              <DynamicFormGenerator
                config={individualConfig.children || []}
                formik={formik}
                me={me}
              />
            </div>
          </>
        );
      default:
        return <div>Unsupported field</div>;
    }
  };

  return (
    <>
      {config.map(c => {
        return builder(c);
      })}
    </>
  );
};

export default DynamicFormGenerator;
