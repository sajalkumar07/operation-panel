import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Formik } from "formik";
import TextField from "@material-ui/core/TextField";

export const styles = () => ({
  textField: {
    width: "150px"
  },
  keyboardDatePicker: {
    width: "150px"
  }
});
const newConfigData = () => ({
  name: ""
});

const CommonSearchForm = ({
  values,
  onSubmit,
  searchInputLabel = "Search here..."
}) => {
  values = { ...newConfigData(), ...values };
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={values}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, handleSubmit, isSubmitting }) => {
          return (
            <form
              className="d-inline-block d-flex align-items-center"
              onSubmit={handleSubmit}
            >
              <TextField
                label={searchInputLabel}
                placeholder={searchInputLabel}
                className="m-0 mr-3"
                name="name"
                value={values.name || ""}
                onChange={handleChange}
                margin="normal"
              />
              <button
                className="btn btn-dark ml-3 heading4_reg"
                disabled={isSubmitting}
                type="submit"
              >
                Search
              </button>
            </form>
          );
        }}
      </Formik>
    </>
  );
};

export default withStyles(styles)(CommonSearchForm);
