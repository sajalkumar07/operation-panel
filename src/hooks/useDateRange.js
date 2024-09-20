import { useState } from "react";
import moment from "moment";

export default function({ fromDate, toDate, onChange }) {
  const [fd, setFD] = useState(fromDate || moment());
  const [td, setTD] = useState(toDate || moment());

  let newSetFD = function(date) {
    setFD(date);
    onChange(date, td);
  };

  let newSetTD = function(date) {
    setTD(date);
    onChange(fd, date);
  };

  return [fd, td, newSetFD, newSetTD];
}
