const TEACHER_JOIN_CLASS = {
  NO_DOCUMENT: "No Document Available",
  NO_PROJECT: "No Projects Available"
};

export const NO_TRENDING_PROJECTS =
  "No Trending Projects are available at the moment";

export const EMAIL_ALREADY_EXISTS = "An account with this email already exists";

export const PHONE_NUMBER_ALREADY_EXISTS = "Number already exists";

export const DEFAULT_STUDENT_CALL_LOG_PARAM =
  "platform=OPS&openCallModal=1&callType=OUTBOUND";

export const DEFAULT_TEACHER_CALL_LOG_PARAM =
  "platform=OPS&openCallModal=1&callType=OUTBOUND";

export const INDIA_DIAL_NO = "+91";
export const INDIA_CALL_PROVIDER = "EXOTEL";
export const NON_INDIA_CALL_PROVIDER = "PLIVO";
export const INDIA_CALL_PROVIDER_SALESKEN = "SALESKEN";

export const defaultStudentParam = provider =>
  `platform=OPS&openCallModal=1&callType=OUTBOUND&callProvider=${provider}`;

export default TEACHER_JOIN_CLASS;

export const Languages = [
  { langCode: "en_US", name: "English US" },
  { langCode: "es_MX", name: "Spanish (Mexican)" },
  { langCode: "pt_BR", name: "Portuguese (Brazil)" }
];

export const TemplateTypes = [
  { key: "English", label: "English" },
  { key: "English_withoutsplit", label: "English_withoutsplit" },
  { key: "Mexico", label: "Mexico" },
  { key: "Brazil", label: "Brazil" }
];

export const COURSE_SKILL_ATTRIBUTES = [
  { key: "ONE_TO_ONE" },
  { key: "ONE_TO_TWO" },
  { key: "ONE_TO_MANY" },
  { key: "ONE_TO_MANY_LAPTOP" },
  { key: "ONE_TO_MANY_TABLET" },
  { key: "ONE_CLASS_PER_WEEK" },
  { key: "TWO_CLASS_PER_WEEK" },
  { key: "THREE_CLASS_PER_WEEK" },
  { key: "FOUR_CLASS_PER_WEEK" },
  { key: "FIVE_CLASS_PER_WEEK" },
  { key: "SIX_CLASS_PER_WEEK" },
  { key: "SEVEN_CLASS_PER_WEEK" }
  // { key: "TRIAL_NOT_ALLOWED" },
  // { key: "PAID_NOT_ALLOWED" },
];

export const COURSE_CURRICULUM_ATTRIBUTES = [
  { key: "ADV" },
  { key: "PRO" },
  { key: "BEG" },
  { key: "INT" }
  // { key: "MG1" },
  // { key: "MG2" },
  // { key: "MG3" },
  // { key: "MG4" },
  // { key: "MG5" },
  // { key: "MG6" },
  // { key: "MG7" }
];

export const ALL_COURSE_ATTRIBUTES = [
  { key: "ONE_TO_ONE" },
  { key: "ONE_TO_TWO" },
  { key: "ONE_TO_MANY" },
  { key: "TRIAL_NOT_ALLOWED" },
  { key: "PAID_NOT_ALLOWED" },
  { key: "BATCH" }
];

export const ACTIVE_COUNTRY_LIST = [
  { key: "IN" },
  { key: "AU" },
  { key: "MX" },
  { key: "BR" },
  { key: "US" },
  { key: "GB" }
];

export const REGION_SKILL_ATTRIBUTES = []; //[{ key: "TRIAL_NOT_ALLOWED" }, { key: "PAID_NOT_ALLOWED" }];

export const COURSE_VERSION_CREDITS = [
  { key: "business_rule", label: "As per business rule" },
  { key: 0, label: "ZERO" },
  { key: 1, label: "ONE" },
  { key: 2, label: "TWO" }
];

export const COURSE_VERSION_ATTRIBUTES = [
  { key: "laptop", label: "Laptop" },
  { key: "tablet", label: "Tablet" }
];

export const WEEK_DAYS = [
  { name: "Monday", dayOfWeek: 1 },
  { name: "Tuesday", dayOfWeek: 2 },
  { name: "Wednesday", dayOfWeek: 3 },
  { name: "Thursday", dayOfWeek: 4 },
  { name: "Friday", dayOfWeek: 5 },
  { name: "Saturday", dayOfWeek: 6 },
  { name: "Sunday", dayOfWeek: 7 }
];

export const PACE_VALUE = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" }
];

export const NOTIFICATION_TYPE_OPTIONS = [
  { value: "email", label: "Email" },
  { value: "sms", label: "SMS" },
  { value: "ivr", label: "IVR" },
  { value: "whatsapp", label: "Whatsapp" },
  { value: "url", label: "URL" }
];

export const IS_LAPTOP_OPTIONS = [
  { value: "1", label: "Any" },
  { value: "true", label: "Laptop" },
  { value: "false", label: "No Laptop" }
];

export const RECEIVER_OPTIONS = [
  { value: "1", label: "Any" },
  { value: "student", label: "Student" },
  { value: "teacher", label: "Teacher" }
];
export const LANGUAGE_OPTIONS = [
  { value: "en_GB", label: "EN-GB" },
  { value: "en_US", label: "EN-US" },
  { value: "es_MX", label: "ES-MX" },
  { value: "pt_BR", label: "PT-BR" }
];

export const BRAND_OPTIONS = [
  { value: "BYJU", label: "Byju" },
  { value: "WHJR", label: "WhiteHat Jr" },
  { value: "TYNKER", label: "Tynker" },
  { value: "BYJUS_CODING", label: "byjus_coding" },
  { value: "BYJU_BELP", label: "BYJU_BELP" },
  { value: "BYJU_BELP_D4", label: "BYJU_BELP_D4" },
  { value: "BYJU_BELP_WEB", label: "BYJU_BELP_WEB" },
  { value: "TYNKER_LIVE", label: "TYNKER_LIVE" }
];

export const UI_VERSION = [
  { key: "V2", label: "V2" },
  { key: "V3", label: "V3" }
];

export const SUBSTITUTE_TEACHER_PREFERENCE = [
  { key: "YES", label: "YES" },
  { key: "NO", label: "NO" }
];

export const CLASS_BOOK_BY_TEACHER_ALLOWED = [
  { key: "true", label: "YES" },
  { key: "false", label: "NO" }
];
