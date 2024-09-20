import { useState } from "react";

export default function() {
  const [entity, setEntity] = useState({
    open: false,
    data: {},
    fn: null
  });

  let confirm = function(fn, data) {
    setEntity({
      open: true,
      data: {},
      fn: null
    });
  };

  let approve = function() {
    const { fn, data } = entity;
    if (fn) fn(data);
    setEntity({
      open: false,
      data: {},
      fn: null
    });
  };

  let cancel = function() {
    setEntity({ open: false, data: {} });
  };

  return [entity, confirm, approve, cancel];
}
