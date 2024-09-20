import _get from "lodash/get";

export const u__genericMasking = ({ entityData }) => {
  let userData = _get(entityData, "ME");
  let commPreferences = _get(entityData, "STUDENT_COMMUNICATION");
  let dndStatus = _get(commPreferences, "subscriptionStatus.noCall", false);
  const permission = _get(userData, "permission", []);
  let genericMasking = true;
  if (permission && permission.length > 0) {
    if (permission.includes("VIEW_PII_UNMASK") && !dndStatus) {
      genericMasking = true;
    }
    if (permission.includes("VIEW_PII_WITHOUT_MASK")) {
      genericMasking = false;
    }
  }
  return genericMasking;
};
