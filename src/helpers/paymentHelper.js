import _filter from "lodash/filter";
import _values from "lodash/values";
import _mapValues from "lodash/mapValues";
import _mergeWith from "lodash/mergeWith";
import _isArray from "lodash/isArray";
import _get from "lodash/get";
import _sortBy from "lodash/sortBy";

// next phase move to config
const paymentGatewayInternational = [
  {
    name: "Stripe",
    paymentTypes: ["ONE_TIME", "SUBSCRIPTION"]
  },
  {
    name: "PayPal",
    paymentTypes: ["ONE_TIME"]
  }
];

const paymentGatewayIN = [
  {
    name: "PayU",
    paymentTypes: ["ONE_TIME", "SUBSCRIPTION"]
  },
  {
    name: "RazorPay",
    paymentTypes: ["ONE_TIME"]
  },
  {
    name: "JusPay",
    paymentTypes: ["SUBSCRIPTION"]
  }
];

const paymentGatewayMX = [
  {
    name: "MercadoPago",
    paymentTypes: ["ONE_TIME"]
  },
  {
    name: "Stripe",
    paymentTypes: ["ONE_TIME", "SUBSCRIPTION"]
  }
];

const paymentGatewayBR = [
  {
    name: "MercadoPago",
    paymentTypes: ["ONE_TIME"]
  },
  {
    name: "Stripe",
    paymentTypes: ["ONE_TIME", "SUBSCRIPTION"]
  }
];

const _filterGatewayByType = (gatewayList = [], paymentType) => {
  return _filter(
    gatewayList,
    g => g.paymentTypes && g.paymentTypes.includes(paymentType)
  );
};

export const getGateWayList = (currency, paymentType) => {
  switch (currency) {
    case "INR":
      return _filterGatewayByType(paymentGatewayIN, paymentType);
    case "MXN":
      return _filterGatewayByType(paymentGatewayMX, paymentType);
    case "BRL":
      return _filterGatewayByType(paymentGatewayBR, paymentType);
    default:
      return _filterGatewayByType(paymentGatewayInternational, paymentType);
  }
};

export const getSubscriptionFrequencyMap = mode => {
  switch (mode) {
    case "MONTH":
      return [
        { label: "Monthly", value: "1" },
        { label: "Quarterly", value: "3" },
        { label: "5 Months", value: "5" },
        { label: "Half Yearly", value: "6" },
        { label: "10 Months", value: "10" },
        { label: "Annual", value: "12" },
        { label: "1.5 Years", value: "18" },
        { label: "2 Years", value: "24" }
      ];
    case "DAY":
      return [{ label: "Every Day", value: "1" }];
    case "YEAR":
      return [{ label: "Annual", value: "1" }];
    default:
      return [
        { label: "Monthly", value: "1" },
        { label: "Quarterly", value: "3" },
        { label: "5 Months", value: "5" },
        { label: "Half Yearly", value: "6" },
        { label: "10 Months", value: "10" },
        { label: "Annual", value: "12" },
        { label: "1.5 Years", value: "18" },
        { label: "2 Years", value: "24" }
      ];
  }
};

export const getSubscriptionFrequency = (mode, tenure = "1") => {
  const subscriptionFrequencyMap = getSubscriptionFrequencyMap(mode);
  const subscriptionFrequency = subscriptionFrequencyMap.find(
    sub => sub.value === `${tenure}`
  );
  if (subscriptionFrequency) {
    return subscriptionFrequency.label;
  }
  return `${tenure} ${mode}s`;
};

export const parseWithTryCatch = (jsonStringValue, defaultValue = null) => {
  try {
    return JSON.parse(jsonStringValue);
  } catch (e) {}
  return defaultValue;
};

export const paymentsConfigsMap = {
  payment_config: {
    PAYMENTS_ORDER_MARKETING_SOURCE: "PAYMENTS_ORDER_MARKETING_SOURCE",
    INSTRUMENT_TYPE_CONFIG: "INSTRUMENT_TYPE_CONFIG",
    ORDER_STATUS_CONFIG: "ORDER_STATUS_CONFIG",
    DEVICE_TYPES_CONFIG: "DEVICE_TYPES_CONFIG",
    PAYMENT_LINK_SOURCE_CONFIG: "PAYMENT_LINK_SOURCE_CONFIG",
    ORDER_ADDITIONAL_BENEFITS: "ORDER_ADDITIONAL_BENEFITS",
    ADJUSTMENT_STATUS_CONFIG: "ADJUSTMENT_STATUS_CONFIG",
    INVOICE_TAX_REGIME_CONFIG: "INVOICE_TAX_REGIME_CONFIG"
  },
  default: {
    FINANCIAL_ADJUSTMENTS_DISPOSITIONS: "FINANCIAL_ADJUSTMENTS_DISPOSITIONS"
  }
};

export const paymentsConfigsList = _mapValues(paymentsConfigsMap, (val, key) =>
  _values(val)
);

export const packagesConfigsMap = {
  payment_config: {
    PACKAGES_CURRENCIES_CONFIG: "PACKAGES_CURRENCIES_CONFIG",
    PACKAGES_SUBSCRIPTION_CONFIG: "PACKAGES_SUBSCRIPTION_CONFIG",
    PACKAGES_CONSUMPTION_CYCLE_CONFIG: "PACKAGES_CONSUMPTION_CYCLE_CONFIG",
    PACKAGES_ATTRIBUTES_DEFAULTS: "PACKAGES_ATTRIBUTES_DEFAULTS",
    ORDER_ATTRIBUTES: "orderAttributes",
    MANDATORY_ADDRESS_COUNTRIES: "MANDATORY_ADDRESS_COUNTRIES"
  }
};

export const packagesConfigsList = _mapValues(packagesConfigsMap, (val, key) =>
  _values(val)
);

export const packagesAndPaymentsConsfigsList = _mergeWith(
  {},
  paymentsConfigsList,
  packagesConfigsList,
  (obj, src) => {
    if (_isArray(obj)) {
      return obj.concat(src);
    }
    return undefined;
  }
);

export const getOrderDefaultAttributes = (
  orderAttributesConfig,
  courseType,
  coursePrice,
  voucherOrderAttributes,
  isTrial
) => {
  // const defaultConfig = {
  //   "enabled": true,
  //   "attributes": {
  //     "default": {
  //       "defaultAttribute1": "value1"
  //     },
  //     "CODING": {
  //       "defaultAttribute1Overrride": "overrideValue1"
  //     }
  //   },
  //   "packageNameOverrides": [
  //     {
  //       "names": ["basic", "expert"],
  //       "attributes": {}
  //     }
  //   ],
  //   "packageTypeOverrides": [
  //     {
  //       "types": ["ONE_TIME"],
  //       "attributes": {}
  //     }
  //   ],
  //   "packageIdOverrides": [
  //     {
  //       "disabled": true,
  //       "ids": [1, 10, 456],
  //       "attributes": {}
  //     }
  //   ],
  //   "learningJourneyOverrides": [
  //     {
  //       "disabled": true,
  //       "shortCodes": ["FC"],
  //       "attributes": {}
  //     }
  //   ]
  // }
  const attributes = {
    weeklyPace: 2,
    assignTeacher: true,
    welcomeCallNeeded: true
  };
  if (orderAttributesConfig.enabled) {
    const defaultAttributes = orderAttributesConfig.attributes;
    if (defaultAttributes) {
      Object.assign(attributes, {
        ...defaultAttributes.default,
        ...defaultAttributes[courseType]
      });
    }

    if (coursePrice) {
      if (orderAttributesConfig.packageNameOverrides) {
        const namedAttributesOverrides = _filter(
          orderAttributesConfig.packageNameOverrides,
          att =>
            (att.names || []).includes(coursePrice.name) &&
            att.disabled !== true
        );
        for (const att of namedAttributesOverrides) {
          const defaultNameAttributes = att.attributes;
          if (defaultNameAttributes) {
            Object.assign(attributes, {
              ...defaultNameAttributes.default,
              ...defaultNameAttributes[courseType]
            });
          }
        }
      }
      if (orderAttributesConfig.packageTypeOverrides) {
        const typeesAttributesOverrides = _filter(
          orderAttributesConfig.packageTypeOverrides,
          att =>
            (att.types || []).includes(coursePrice.type) &&
            att.disabled !== true
        );
        for (const att of typeesAttributesOverrides) {
          const defaultTypeAttributes = att.attributes;
          if (defaultTypeAttributes) {
            Object.assign(attributes, {
              ...defaultTypeAttributes.default,
              ...defaultTypeAttributes[courseType]
            });
          }
        }
      }
      if (orderAttributesConfig.packageIdOverrides) {
        const idAttributesOverrides = _filter(
          orderAttributesConfig.packageIdOverrides,
          att =>
            (att.ids || []).includes(coursePrice.id) && att.disabled !== true
        );
        for (const att of idAttributesOverrides) {
          const defaultIdAttributes = att.attributes;
          if (defaultIdAttributes) {
            Object.assign(attributes, {
              ...defaultIdAttributes.default,
              ...defaultIdAttributes[courseType]
            });
          }
        }
      }
      if (
        coursePrice.learning_journey &&
        orderAttributesConfig.learningJourneyOverrides
      ) {
        const ljOverrides = _filter(
          orderAttributesConfig.learningJourneyOverrides,
          att =>
            (att.shortCodes || []).includes(
              coursePrice.learning_journey.shortCode
            ) && att.disabled !== true
        );
        for (const att of ljOverrides) {
          const defaultLearingJourneyAttributes = att.attributes;
          if (defaultLearingJourneyAttributes) {
            Object.assign(attributes, {
              ...defaultLearingJourneyAttributes.default,
              ...defaultLearingJourneyAttributes[courseType]
            });
          }
        }
      }
    }
  }
  Object.assign(attributes, {
    ...coursePrice.orderAttributes,
    ...voucherOrderAttributes
  });
  if (!isTrial) {
    attributes.c1GracePeriod = 0;
  }
  return attributes;
};

export const isAddressComplete = addresses => {
  if (addresses.length > 0) {
    const userAddress = addresses.filter(
      ({ addressType }) => addressType === "shipping"
    );
    if (userAddress && userAddress.length) {
      const { addressLine1, city, country, state, zipCode } =
        userAddress[0] || {};
      const hasCompleteAddress = !!(
        addressLine1 &&
        city &&
        country &&
        state &&
        zipCode
      );
      return hasCompleteAddress;
    }
  }
  return false;
};

export const regionFilteredLearningJourney = (
  allLearningJourneys,
  regionId
) => {
  return _filter(allLearningJourneys, lj => {
    const regions = lj.regions || [];
    if (regions.includes(regionId) || regions.includes("global")) {
      return true;
    }
    return false;
  });
};

export const minClassPriceForPackage = (coursePrice, totalCreditsAllotted) => {
  const {
    minClassPrice,
    roofCredits,
    rooftopRpc,
    packageAdditionalInfo
  } = coursePrice;
  const minClassPriceGrid = _get(packageAdditionalInfo, "minClassPriceGrid");
  let rpcValue = minClassPrice;

  if (roofCredits > 0 && rooftopRpc > 0 && totalCreditsAllotted > roofCredits) {
    rpcValue = rooftopRpc;
  }

  if (minClassPriceGrid && _get(minClassPriceGrid, "enabled")) {
    const grid = _get(minClassPriceGrid, "grid");
    // const grid = [ { maxCredits: 2, minClassPrice: 2 } ]
    if (Array.isArray(grid)) {
      const rpcGrid = _sortBy(grid, ["minCredits", "maxCredits"]).reverse();
      for (const gridItem of rpcGrid) {
        const minRpc = _get(gridItem, "minClassPrice");
        if (
          minRpc >= 0 &&
          _get(gridItem, "minCredits") <= totalCreditsAllotted &&
          (_get(gridItem, "maxCredits") == null ||
            _get(gridItem, "maxCredits") >= totalCreditsAllotted)
        ) {
          rpcValue = minRpc;
          break;
        }
      }
    }
  }

  return rpcValue;
};
