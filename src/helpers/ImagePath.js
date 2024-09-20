import _get from "lodash/get";
import { isValidUrl } from "./utils";

const formatImagePath = path => {
  const REACT_APP_PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;
  const windowUrl = _get(window, "location.origin");
  const domainUrl = isValidUrl(REACT_APP_PUBLIC_URL)
    ? REACT_APP_PUBLIC_URL
    : windowUrl;
  return `${domainUrl}/images/${path}`;
};

export const PAGE_SVG_ICON = formatImagePath("svc/page.svg");
export const PREV_IMG_ICON = formatImagePath("svc/previous.svg");
export const NO_PREFERENCE_IMG = formatImagePath("no_preference.png");
export const COMPANY_LOGO = formatImagePath("whj_logo.png");
export const WHITE_COMPANY_LOGO = formatImagePath("whitehatjr-white.png");
export const GREEN_CALL_GIF = formatImagePath("inCall.gif");
export const KEY_ENTER = formatImagePath("key_enter.png");
export const MIC_OFF_WHITE = formatImagePath(
  "InClassVideo/mic_off-white-18dp.svg"
);
export const MIC_WHITE = formatImagePath("InClassVideo/mic-white-18dp.svg");
export const VIDEO_CAM_OFF_WHITE = formatImagePath(
  "InClassVideo/videocam_off-white-18dp.svg"
);
export const VIDEO_CAM_WHITE = formatImagePath(
  "InClassVideo/videocam-white-18dp.svg"
);

export const BACK_BTN = formatImagePath("backBtn.png");
export const EDIT_BTN = formatImagePath("edit.png");
export const DELETE_BTN = formatImagePath("delete.png");
export const CALENDAR_ICON = formatImagePath("calendar.png");
export const ACTIONS_ICON = formatImagePath("helpSection/actionsIcon.png");
export const ADD_NEW_NODE_ICON = formatImagePath("helpSection/addNewNode.png");
export const VIEW_NODE_ICON = formatImagePath("helpSection/viewNode.png");
export const EDIT_NODE_ICON = formatImagePath("helpSection/editNode.png");
export const DELETE_NODE_ICON = formatImagePath("helpSection/deleteNode.png");
export const EDIT_NODE_ICON_BLUE = formatImagePath(
  "helpSection/editNode_Blue.png"
);
export const DELETE_NODE_ICON_BLUE = formatImagePath(
  "helpSection/deleteNode_Blue.png"
);
export const WARNING_ICON = formatImagePath("helpSection/warningIcon.png");
export const BULLET_ICON = formatImagePath("helpSection/bulletIcon.png");
export const BACK_ARROW_ICON = formatImagePath("helpSection/backArrow.png");
export const DEACTIVATE_NODE_ICON = formatImagePath(
  "helpSection/deactivateNode.png"
);
export const CLOSE_BTN = formatImagePath("close-button.png");
export const ACTIVATE_NODE_ICON = formatImagePath(
  "teacherStrike/activateIcon.png"
);
export const VIEW_AUDIT_HISTORY_ICON = formatImagePath(
  "teacherStrike/viewAuditHistory.png"
);
