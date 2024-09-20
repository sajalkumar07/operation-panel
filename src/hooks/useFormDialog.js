import { useState } from "react";

export default function() {
  const [dialog, setDialog] = useState({
    open: false,
    add: false,
    edit: false,
    data: {}
  });

  let open = function(data) {
    setDialog({
      open: true,
      add: !data.id,
      edit: !!data.id,
      data
    });
  };

  let close = function() {
    setDialog({ open: false, add: false, edit: false, data: {} });
  };

  return [dialog, open, close];
}
