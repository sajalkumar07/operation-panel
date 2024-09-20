import { createSelector } from "reselect";
import _get from "lodash/get";
import _cloneDeep from "lodash/cloneDeep";

const getCountries = state => _get(state, "COUNTRY", []) || [];
const getStudentBrandID = (state, config, student) => _get(student, "brandId");
const getTeacherCountryCode = (state, config, teacher) =>
  _get(teacher, "countryCode");
const getConfig = (state, config, name, defaultValue) => {
  return config[name] || defaultValue;
};
const getBrandDetails = (state, config) => {
  return [
    ...getConfig(state, config, "brand_details", []),
    ...getConfig(state, config, "brand_details_byju", [])
  ];
};
const getStudentCountryCode = (state, config, student) =>
  _get(student, "countryCode");

export const getUniqueParsedBrandDetails = (state, config) => {
  let brandNameSet = new Set();
  return getParsedBrandDetails(state, config).filter(brand => {
    if (brandNameSet.has(brand.brandId)) return false;
    brandNameSet.add(brand.brandId);
    return true;
  });
};
const getParsedBrandDetails = (state, config) => {
  let brandDetails = getBrandDetails(state, config) || [];
  return brandDetails.map(brand => {
    return { ...brand, ...JSON.parse(brand.value) };
  });
};

const getAllBrandDetails = createSelector(
  [getCountries, getBrandDetails],
  (countries, brandDetails) => {
    if (!(countries && brandDetails)) return [];
    let brandMap = new Map();
    brandDetails.forEach(brand => {
      let regionName = _get(brand, "regionName", "International");
      if (!regionName) regionName = "International";
      brandMap.set(regionName, brand.value);
    });
    let result = countries.map(country => {
      let regionName = _get(country, "region_master.name", "International");
      if (!brandMap.has(regionName)) regionName = "International";
      return {
        ...country,
        brandDetails:
          brandMap.get(regionName) && JSON.parse(brandMap.get(regionName))
      };
    });
    return result;
  }
);

const getDefaultBrandDetail = createSelector(
  [getBrandDetails],
  brandDetails => {
    if (!brandDetails) return {};
    const brand = brandDetails.find(brand => brand.regionName == null);
    const brandValue = _get(brand, "value", "{}");
    return { brandDetails: JSON.parse(brandValue) };
  }
);

const getRegionDetailsForStudent = (
  countries,
  studentCountryCode,
  brandDetails
) => {
  const region = _get(
    countries.find(country => _get(country, "code") === studentCountryCode),
    "region_master.name",
    "global"
  );

  let availableRegions = brandDetails.map(brand => _get(brand, "regionName"));
  if (availableRegions.includes(region)) return region;
  else return "global";
};

export const getBrandDetailsForStudent = createSelector(
  [
    getCountries,
    getStudentCountryCode,
    getStudentBrandID,
    getParsedBrandDetails
  ],
  (countries, studentCountryCode, studentBrandId, brandDetails) => {
    let studentRegion = getRegionDetailsForStudent(
      countries,
      studentCountryCode,
      brandDetails
    );
    let defaultConfig = brandDetails.find(brand => {
      let region = _get(brand, "regionName") || "global";
      return (
        _get(brand, "name") === "brand_details" && studentRegion === region
      );
    });
    if (studentBrandId === "byju") {
      let overrideConfig = brandDetails.find(brand => {
        let region = _get(brand, "regionName") || "global";
        return (
          _get(brand, "name") === "brand_details_byju" &&
          studentRegion === region
        );
      });
      if (overrideConfig) defaultConfig = overrideConfig;
    }
    return defaultConfig || {};
  }
);

export const getBrandDetailsForTeacher = createSelector(
  [getAllBrandDetails, getTeacherCountryCode, getDefaultBrandDetail],
  (allCountriesBrandDetails, countryCode, defaultBrandDetail) => {
    if (!(allCountriesBrandDetails.length && countryCode)) return {};
    let brand = allCountriesBrandDetails.find(
      country => country.code === countryCode
    );
    if (!brand) brand = defaultBrandDetail;
    return _get(brand, "brandDetails", {});
  }
);
