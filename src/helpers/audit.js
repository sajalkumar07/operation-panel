import _get from "lodash/get";
import { getCookie } from "./cookie";

const LanguageNameMapping = {
  en_GB: "enGb",
  en_US: "enUs",
  en_MX: "esMx",
  pt_BR: "ptBr"
};

const langCode = getCookie("langCode");

export const processAuditResponse = ({ data }) => {
  return function(apiResponseData) {
    let newResponse = [];
    for (const auditRecords of apiResponseData) {
      let record = {};
      let languageName = false;
      for (const auditRecord of auditRecords.aggregatedData) {
        if (auditRecord.tableName === "language_string") {
          const changedData = JSON.parse(_get(auditRecord, "data", {}));
          if (auditRecord.actionName === "CREATE") {
            languageName = Object.keys(changedData).find(
              key => LanguageNameMapping[langCode] === key
            );
          } else {
            languageName = Object.keys(changedData).find(key => key !== "meta");
          }
          record[_get(data, _get(auditRecord, "entityId", ""))] = changedData;
        }
      }

      const auditRecord = auditRecords.aggregatedData.find(
        o => o.tableName !== "language_string"
      );
      if (auditRecord) {
        const changedData = JSON.parse(_get(auditRecord, "data", {}));
        auditRecord.data = { ...changedData, ...record };
        auditRecord.languageName = languageName;
        newResponse.push(auditRecord);
      } else {
        auditRecords.aggregatedData[0].data = { ...record };
        auditRecords.aggregatedData[0].languageName = languageName;
        newResponse.push(_get(auditRecords, "aggregatedData[0]", {}));
      }
    }

    return newResponse;
  };
};

export const isI18n = key => key.search(/I18n$/g) !== -1;

export const findI18nObjects = ({ data }) => {
  const keys = Object.keys(data).filter(key => isI18n(key));
  const I18Objects = {};
  for (const key of keys) {
    I18Objects[data[key]] = key;
  }
  return I18Objects;
};
