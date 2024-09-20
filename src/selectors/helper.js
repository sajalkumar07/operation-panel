import { createSelector } from "reselect";
import _get from "lodash/get";
import _cloneDeep from "lodash/cloneDeep";

const getCountries = state => _get(state, "COUNTRY", []) || [];

export const getConfig = (state, config, name, defaultValue = []) => {
  return config[name] || defaultValue;
};

export const countryRegionMapping = createSelector(
  [getCountries],
  countries => {
    if (!countries) return [];
    let countryRegionMapping = new Map();
    countries.forEach(country => {
      countryRegionMapping.set(
        country.code,
        _get(country, "region_master.name", country.name)
      );
    });
    countryRegionMapping.set("global", "global");
    return countryRegionMapping;
  }
);
