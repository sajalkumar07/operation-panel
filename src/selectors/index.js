import { createSelector } from "reselect";
import _get from "lodash/get";

import { countryRegionMapping, getConfig } from "./helper";

const getReassignConfig = (state, config) => {
  return getConfig(state, config, "REASSIGN_LANGUAGE_BOOKING_ALLOWED");
};

const getCoverUpClassConfig = (state, config) => {
  return getConfig(state, config, "COVER_UP_CLASS_CONFIG_OPS");
};

const getCountryCode = (state, config, countryCode = "global") => {
  return countryCode;
};

const selectAppMapping = entities => entities.config.APP_BOOKING_MAP || [];

export const getCountryWiseCoverUpClassConfig = createSelector(
  [countryRegionMapping, getCoverUpClassConfig, getCountryCode],
  (countryRegionMapping, reassignConfigList, countryCode) => {
    const regionName = countryRegionMapping.get(countryCode);

    let reassignConfig = reassignConfigList.find(config => {
      let region = _get(config, "regionName");
      return region === regionName;
    });
    if (!reassignConfig) {
      reassignConfig = reassignConfigList.find(config => {
        let region = _get(config, "regionName") || "global";
        return region === "global";
      });
    }
    return reassignConfig ? JSON.parse(reassignConfig.value) : {};
  }
);

export const getCountryWiseReassignConfig = createSelector(
  [countryRegionMapping, getReassignConfig, getCountryCode],
  (countryRegionMapping, reassignConfigList, countryCode) => {
    const regionName = countryRegionMapping.get(countryCode);

    let reassignConfig = reassignConfigList.find(config => {
      let region = _get(config, "regionName");
      return region === regionName;
    });
    if (!reassignConfig) {
      reassignConfig = reassignConfigList.find(config => {
        let region = _get(config, "regionName") || "global";
        return region === "global";
      });
    }

    return reassignConfig ? reassignConfig.value : 25;
  }
);

export const s__getAppBookingMapping = createSelector(
  selectAppMapping,
  configs => {
    let configValue = {};
    if (configs.length > 0) {
      configValue = JSON.parse(configs[0].value);
    }
    return configValue;
  }
);
