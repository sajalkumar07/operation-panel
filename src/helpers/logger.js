//Datadog logger utils

import _get from "lodash/get";

export const getCustomLogger = (name, forceCreate = true) => {
  let logger;
  if (_get(window, "DD_LOGS.getLogger")) {
    logger = window.DD_LOGS.getLogger(name);
  }
  if (!logger) {
    if (forceCreate && _get(window, "DD_LOGS.createLogger")) {
      window.DD_LOGS.createLogger(name);
      logger = window.DD_LOGS.getLogger(name);
    }
  }
  return logger;
};
