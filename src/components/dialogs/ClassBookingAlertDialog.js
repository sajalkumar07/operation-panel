import React, { useState, useEffect } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import BaseDialog from "./BaseDialog";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import _get from "lodash/get";
import moment from "moment-timezone";
import { styles } from "./../.styles.js";
import { capitalizeName } from "./../../helpers/utils";

const ClassBookingAlertDialog = ({
  booking,
  course,
  open,
  onClose,
  onDialogSubmit
}) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <BaseDialog open={open} onClose={onClose}>
        <div className="text-center mb-4">
          <div className="heading3_b mb-3" style={{ color: "red" }}>
            <strong>ALERT!</strong>
          </div>

          <div className="mb-3">
            <strong>You are about to book an already completed class.</strong>
          </div>

          <div className="mb-3">
            <strong>
              A {course ? capitalizeName(course.toLowerCase()) : null} Class was
              already completed on
              <br />
              {booking &&
                moment(booking.data.endTime).format("DD MMMM YYYY, h:mm a")}
            </strong>
          </div>
          <FormControlLabel
            control={
              <Checkbox
                checked={!!isChecked}
                onChange={e => setIsChecked(e.target.checked)}
              />
            }
            label="I confirm that I want to proceed with the booking."
          />
          <div className="text-center d-flex justify-content-center mt-4">
            <button
              disabled={!isChecked}
              className="mt-3 btn btn-dark"
              type="submit"
              onClick={() => {
                setIsChecked(false);
                onDialogSubmit();
              }}
            >
              OK
            </button>
          </div>
        </div>
      </BaseDialog>
    </>
  );
};

export default withStyles(styles)(ClassBookingAlertDialog);
