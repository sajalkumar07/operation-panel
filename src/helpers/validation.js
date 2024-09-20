import { trim } from "lodash-es";
import * as yup from "yup";
import {
  DIGIT_REGEX,
  EMAIL_COMMA_SEPERATED_REGEX,
  EMAIL_REGEX,
  MOBILE_REGEX,
  PAYID_REGEX,
  STRING_NO_SPECIAL_CHAR_REGEX,
  TEN_DIGIT_REGEX,
  WEBSITE_LINK_REGEX
} from "./regex";
import { array } from "yup";

export const SESSION_ACTION_VALIDATION_SCHEMA = action => {
  let getShape = function(action) {
    switch (action) {
      case "REASSIGN":
        return {
          ncReasonCode: yup.string().required(),
          ncReasonDesc: yup.string().required()
        };
      case "STUDENT_ABSENT":
        return {
          ncReasonDesc: yup.string().required()
        };
      case "STUDENT_TECH_ISSUE":
        return {
          ncReasonDesc: yup.string().required()
        };
      case "TEACHER_ABSENT":
        return {
          ncReasonDesc: yup.string().required()
        };
      case "TEACHER_TECH_ISSUE":
        return {
          ncReasonDesc: yup.string().required()
        };
      default:
        return {};
    }
  };
  return yup.object().shape({
    action: yup.string().required(),
    ...getShape(action)
  });
};
export const BATCH_FORM_VALIDATION_SCHEMA = yup.object().shape({
  action: yup.string().required(),
  nextCourseClassVersionId: yup.string().when("action", {
    is: action => action === "changeStartClassNumber",
    then: yup.string().required("Start Class is required")
  })
});
export const CLASS_BOOKING_EDIT_VALIDATION_SCHEMA = action => {
  let getShape = function(action) {
    switch (action) {
      case "REASSIGN_SPECIFIC":
        return {
          newTeacherId: yup.string().required(),
          ncReasonCode: yup.string().required()
        };
      case "REASSIGN":
        return {
          ncReasonCode: yup.string().required()
        };
      case "RESCHEDULE_TRIAL":
        return {
          date: yup.string().required(),
          slotStartTime: yup.string().required()
        };
      case "PROJECT_ASSIGN":
        return {
          courseIndex: yup.string().required(),
          courseItemId: yup.string().required()
        };
      case "STUDENT_ABSENT":
        return {
          ncReasonDesc: yup.string().required()
        };
      case "STUDENT_TECH_ISSUE":
        return {
          ncReasonDesc: yup.string().required()
        };
      case "TEACHER_ABSENT":
        return {
          ncReasonDesc: yup.string().required()
        };
      case "TEACHER_TECH_ISSUE":
        return {
          ncReasonDesc: yup.string().required()
        };
      case "COURSE_CHANGE":
        return {
          courseIndex: yup.string().required("course is a required field"),
          courseVersionId: yup
            .string()
            .required("course version is a required field"),
          courseItemId: yup.string().required("start class is a required field")
        };
      default:
        return {};
    }
  };
  return yup.object().shape({
    action: yup.string().required(),
    ...getShape(action)
  });
};

export const STUDENT_PROJECT_ASSIGN_VALIDATION_SCHEMA = yup.object().shape({
  courseIndex: yup.string().required(),
  courseItemId: yup.string().required()
});

export const TEACHER_SLOT_INFO_SEARCH_VALIDATION_SCHEMA = yup
  .object()
  .shape({});

export const TASK_VALIDATION_SCHEMA = yup.object().shape({
  typeId: yup.string().required(),
  subTypeId: yup.string().required(),
  dispositionTypeId: yup.string().required(),
  subDispositionTypeId: yup.string().required()
});
export const REASSIGN_TASK_VALIDATION_SCHEMA = yup.object().shape({
  user: yup.string().required()
});

export const WEBINAR_VALIDATION_SCHEMA = yup.object().shape({
  courseItemId: yup.string().required(),
  courseClassId: yup.string().required(),
  webinarLink: yup.string().required(),
  hostWebinarLink: yup.string().required()
});

export const STUDENT_POINTS_VALIDATION_SCHEMA = yup.object().shape({
  points: yup
    .string()
    .required()
    .matches(/[50$]/, "Must be in multiples of 5")
});
export const POST_SUBMISSIONS_VALIDATION_SCHEMA = yup.object().shape({
  courseItemId: yup.string().required("Please select a course"),
  courseVersionId: yup.string().required("PLease select version"),
  postType: yup.string().required("Please select post type"),
  submissionType: yup.string().required("Please select submission type"),
  maxSubmissionsCount: yup
    .string()
    .required("Please select number of submissions allowed")
});
export const QUIZ_DATE_EXTEND_VALIDATION_VALIDATION_SCHEMA = yup
  .object()
  .shape({});

export const WEBINAR_TEACHER_VALIDATION_SCHEMA = yup.object().shape({
  teacherId: yup.string().required()
});

export const WEBINAR_SCHEDULE_VALIDATION_SCHEMA = yup.object().shape({
  startMinute: yup.string().required(),
  endMinute: yup.string().required(),
  dayOfWeek: yup.string().required()
});

export const CREATE_TASK_VALIDATION_SCHEMA = yup.object().shape({
  taskTypeId: yup.string().required(),
  subTaskTypeId: yup.string().required(),
  dispositionTypeId: yup.string().required()
});
export const DND_VALIDATION_SCHEMA = indiaOrUs => {
  return yup.object().shape({
    ...{
      noEmail: yup.boolean(),
      noCall: yup.boolean(),
      noWhatsapp: yup.boolean(),
      noSms: yup.boolean(),
      dialCode: yup.string().nullable(),
      mobile: indiaOrUs
        ? yup
            .string()
            .when("noCall", {
              is: (noCall, noWhatsapp, noSms) => {
                return noCall || noWhatsapp || noSms;
              },
              then: yup
                .string()
                .matches(TEN_DIGIT_REGEX, {
                  message: "Must be exactly 10 numbers",
                  excludeEmptyString: true
                })
                .required("Please enter the mobile number")
            })
            .when("noWhatsapp", {
              is: (noCall, noWhatsapp, noSms) => {
                return noCall || noWhatsapp || noSms;
              },
              then: yup
                .string()
                .matches(TEN_DIGIT_REGEX, {
                  message: "Must be exactly 10 numbers",
                  excludeEmptyString: true
                })
                .required("Please enter the mobile number")
            })
            .when("noSms", {
              is: (noCall, noWhatsapp, noSms) => {
                return noCall || noWhatsapp || noSms;
              },
              then: yup
                .string()
                .matches(TEN_DIGIT_REGEX, {
                  message: "Must be exactly 10 numbers",
                  excludeEmptyString: true
                })
                .required("Please enter the mobile number")
            })
        : yup
            .string()
            .when("noCall", {
              is: (noCall, noWhatsapp, noSms) => {
                return noCall || noWhatsapp || noSms;
              },
              then: yup
                .string()
                .matches(DIGIT_REGEX, {
                  message: "Only numeric values are allowed",
                  excludeEmptyString: true
                })
                .required("Please enter the mobile number")
            })
            .when("noWhatsapp", {
              is: (noCall, noWhatsapp, noSms) => {
                return noCall || noWhatsapp || noSms;
              },
              then: yup
                .string()
                .matches(DIGIT_REGEX, {
                  message: "Only numeric values are allowed",
                  excludeEmptyString: true
                })
                .required("Please enter the mobile number")
            })
            .when("noSms", {
              is: (noCall, noWhatsapp, noSms) => {
                return noCall || noWhatsapp || noSms;
              },
              then: yup
                .string()
                .matches(DIGIT_REGEX, {
                  message: "Only numeric values are allowed",
                  excludeEmptyString: true
                })
                .required("Please enter the mobile number")
            }),
      email: yup
        .string()
        .when("noEmail", {
          is: true,
          then: yup
            .string()
            .email("Invalid Email")
            .required("Please enter the Email")
        })
        .nullable(),
      dndReason: yup.string().when("noCall", {
        is: true,
        then: yup.string().required("Please select DND reason")
      })
    }
  });
};

export const STUDENT_VALIDATION_SCHEMA = (indiaOrUs, id) => {
  return yup.object().shape({
    ...{
      name: yup
        .string()
        .trim()
        .required("Student Name is required")
        .min(3, "Name can’t be less than 3 characters")
        .max(30, "Name can’t be more than 30 characters"),
      parentName: yup
        .string()
        .trim()
        .required("Parent Name is required")
        .min(3, "Name can’t be less than 3 characters")
        .max(30, "Name can’t be more than 30 characters"),
      email: yup
        .string()
        .email("Not a valid email")
        .required("Required"),
      grade: yup
        .number()
        .positive()
        .integer()
        .required(),
      mobile:
        indiaOrUs && !id
          ? yup
              .string()
              .matches(TEN_DIGIT_REGEX, {
                message: "Must be exactly 10 numbers",
                excludeEmptyString: true
              })
              .nullable()
          : yup
              .string()
              .matches(DIGIT_REGEX, {
                message: "Only numeric values are allowed",
                excludeEmptyString: true
              })
              .nullable(),
      additionalContactNo: yup
        .string()
        .nullable()
        .matches(DIGIT_REGEX, {
          message: "Only numeric values are allowed",
          excludeEmptyString: true
        }),
      additionalDialCode: yup
        .string()
        .nullable()
        .when("additionalContactNo", {
          is: val => val && val.length > 0,
          then: yup.string().required("additional dial code is required")
        })
    }
  });
};
export const STUDENT_EMAIL_SCHEMA = () => {
  return yup.object().shape({
    ...{
      email: yup
        .string()
        .email("Not a valid email")
        .required("Required")
    }
  });
};
export const STUDENT_MOBILE_SCHEMA = () => {
  return yup.object().shape({
    ...{
      dialCode: yup.string().required(),
      mobile: yup
        .string()
        .matches(DIGIT_REGEX, {
          message: "Only numeric values are allowed",
          excludeEmptyString: true
        })
        .required(),
      email: yup.string().email("Not a valid email")
    }
  });
};
export const STUDENT_PASSWORD_SCHEMA = () => {
  return yup.object().shape({
    ...{
      password: yup.string().required("Password is required ")
    }
  });
};
export const OFFLINE_PAYMENT_VALIDATION_SCHEMA = yup.object().shape({
  credits: yup
    .number()
    .moreThan(-1)
    .required(),
  sellingPrice: yup
    .number()
    .positive()
    .integer()
    .required(),
  currency: yup.string().required(),
  instrument: yup.string().required(),
  orderConfirmedAt: yup.string().required(),
  payId: yup
    .string()
    .nullable()
    .matches(PAYID_REGEX, {
      message: "PayId should be max 80 character",
      excludeEmptyString: true
    })
});

export const TEACHER_VALIDATION_SCHEMA = withPassword => {
  return yup.object().shape({
    ...{
      name: yup.string().required(),
      // state: yup
      //   .string()
      //   .required("State is required")
      //   .nullable(),
      email: yup
        .string()
        .matches(EMAIL_REGEX, "Not a valid email")
        .required(),
      dialCode: yup.string().required(),
      mobile: yup
        .string()
        .required()
        .when("dialCode", {
          is: code => code === "+91",
          then: yup.string().matches(MOBILE_REGEX, "Invalid mobile number")
        }),
      // address: yup.string().required(),
      // countryCode: yup.string().required()
      zipcode: yup
        .string()
        //   .matches(ZIPCODE_REGEX, "Zipcode invalid")
        .required()
    }
    // ...(withPassword ? { password: yup.string().required() } : {})
  });
};
export const LOGGED_IN_USER_VALIDATION_SCHEMA = yup.object().shape({
  mobile: yup
    .string()
    .required()
    .when("dialCode", {
      is: code => code === "+91",
      then: yup.string().matches(MOBILE_REGEX, "Invalid mobile number")
    }),
  dialCode: yup.string().required()
});
export const USER_VALIDATION_SCHEMA = withPassword => {
  const schema = {
    email: yup
      .string()
      .matches(EMAIL_REGEX, "Not a valid email")
      .required(),
    mobile: yup
      .string()
      .required()
      .when("dialCode", {
        is: code => code === "+91",
        then: yup.string().matches(MOBILE_REGEX, "Invalid mobile number")
      }),
    role: withPassword
      ? yup.string().required("Please select any role")
      : yup
          .array()
          .of(yup.string())
          .min(1, "Please select at least one role.")
          .required("Please select any role"),
    name: yup
      .string()
      .required()
      .nullable()
  };
  return yup
    .object()
    .shape(
      withPassword ? { ...schema, password: yup.string().required() } : schema
    );
};

export const CONFIRMED_TRIAL_VALIDATION_SCHEMA = filterActive => {
  if (filterActive) {
    yup.object().shape({
      teacherId: yup.string().required()
    });
  } else {
    return yup.object().shape({
      teacherId: yup.string().required(),
      date: yup.string().required(),
      slot: yup
        .number()
        .integer()
        .required()
    });
  }
};

export const CLASS_BOOKING_DIFF_TEACHER_VALIDATION_SCHEMA = yup.object().shape({
  teacherId: yup.string().required(),
  selectedDate: yup.string().required(),
  slot: yup.string().required()
});
export const REFERRAL_WINNER_VALIDATION_SCHEMA = yup.object().shape({
  winnerDeclaredAt: yup.string().required(),
  winnerPicUrl: yup.string().required()
});
export const SEND_EMAIL_VALIDATION_FORM = yup.object().shape({
  from: yup
    .string()
    .matches(EMAIL_REGEX, "Not a valid email")
    .required(),
  subject: yup.string().required(),
  body: yup.string().required(),
  noOfPaidClass: yup.number().integer(),
  noOfTrialClass: yup.number().integer()
});
export const CLASS_BOOKING_VALIDATION_SCHEMA = yup.object().shape({
  selectedDate: yup.string().required(),
  slot: yup
    .number()
    .integer()
    .required()
});

export const CLASS_TRIAL_VALIDATION_SCHEMA = yup.object().shape({
  date: yup.string().required(),
  startTime: yup.string().required()
});

export const REGION_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required(),
  currency: yup.string().required()
});

export const LANGUAGE_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required()
});

export const COUNTRY_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required(),
  code: yup.string().required(),
  regionId: yup.string().required()
});

export const SUBNODE_VALIDATION_SCHEMA = yup.object().shape({
  isTerminal: yup.string(),
  name: yup.string().when("isTerminal", {
    is: "false",
    then: yup.string().required("Field is required")
  }),
  faqId: yup.string().when("isTerminal", {
    is: "true",
    then: yup.string().required("Field is required")
  }),
  user: yup.string().required(),
  courseTypes: yup.string().required(),
  zendeskChat: yup.string().when("chat", {
    is: true,
    then: yup.string().required("Field is required")
  }),
  relatedEmailIds: yup.string().when("email", {
    is: true,
    then: yup.string().required("Field is required")
  })
});

export const TCTEMPLATE_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required(),
  subject: yup.string().required(),
  body: yup.string().required(),
  region: yup.string().required(),
  courses: yup.string().required()
});

export const TEACHERSTRIKE_VALIDATION_SCHEMA = yup.object().shape({
  disposition: yup.string().required(),
  subDisposition: yup.string().required(),
  source: yup.string().required()
});

export const CONFIG_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required(),
  value: yup
    .string()
    .transform((value, input) =>
      input != null && input.toString ? input.toString() : value
    )
    .required(),
  notes: yup.string().required(),
  schema: yup.string().required()
});

export const BPM_WORKFLOW_SCHEMA = yup.object().shape({
  workflowName: yup.string().required(),
  describe: yup.string()
});

export const BPM_METADATA_SCHEMA = yup.object().shape({
  description: yup.string()
});

export const BPM_LEARNING_ACTION_SCHEMA = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  actionType: yup.string(),
  url: yup.string()
});

export const FEATURE_CONFIG_SCHEMA = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  rolloutConfiguration: yup.lazy(value => {
    if (value === "" || value === undefined) {
      return yup.string().required("Rollout configuration is required");
    } else {
      return yup
        .object()
        .shape({
          rolloutPercentage: yup
            .number()
            .required("Rollout percentage is required"),
          userRoles: yup.array().required("User roles are required"),
          rules: yup
            .object()
            .shape({
              platforms: yup.lazy(val =>
                Array.isArray(val)
                  ? yup
                      .array()
                      .of(yup.string())
                      .required()
                  : yup.string().required()
              ),
              courses: yup.lazy(val =>
                Array.isArray(val)
                  ? yup
                      .array()
                      .of(yup.string())
                      .required()
                  : yup.string().required()
              ),
              classTypes: yup.lazy(val =>
                Array.isArray(val)
                  ? yup
                      .array()
                      .of(yup.string())
                      .required()
                  : yup.string().required()
              ),
              origins: yup.lazy(val =>
                Array.isArray(val)
                  ? yup
                      .array()
                      .of(yup.string())
                      .required()
                  : yup.string().required()
              )
            })
            .required("Rules are required")
        })
        .required("Rollout configuration is required");
    }
  })
});

export const TEMPLATE_VALIDATION_SCHEMA = yup.object().shape({
  provider: yup.string().required("Provider name required"),
  type: yup.string().required("Type name required")
  // content: yup.string().required("Content name required")
});

export const FETCH_NOTIFICATION_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Name required"),
  fromEnv: yup.string().required("FromEnv required"),
  type: yup.string().required("Type name required")
});

export const BULK_TESTING_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Notification name required"),
  type: yup.string().required("Type name required"),
  toEmail: yup.string().required("receiver email is required")
});

export const UPDATE_TEMPLATE_VALIDATION_SCHEMA = yup.object().shape({
  provider: yup.string().required()
});

export const CREATE_EXPERIMENT_VALIDATION_SCHEMA = yup.object().shape({
  experimentPercentage: yup.number().required(),
  startDate: yup.string().required(),
  endDate: yup.string().required()
});

export const COURSE_VALIDATION_SCHEMA = yup.object().shape({
  courseShortName: yup.string().required(),
  name: yup.string().required(),
  courseType: yup.string().required(),
  fromGrade: yup.string().required(),
  toGrade: yup.string().required(),
  courseDescription: yup.string().required()
});
export const STUDENT_CONVERSION_UPDATE_VALIDATION_SCHEMA = yup.object().shape({
  teacherId: yup.string().required("teacher is required"),
  startDatePaid: yup.string().required("date is required"),
  startMinutePaid: yup.string().required("time is required")
});
export const COURSE_ITEM_VALIDATION_SCHEMA = yup.object().shape({
  courseId: yup.string().required(),
  classType: yup.string().required(),
  classDuration: yup.string().required()
});

export const CLASS_VALIDATION_SCHEMA = yup.object().shape({
  courseItemId: yup.string().required(),
  name: yup.string().required(),
  sequenceNo: yup.number().required(),
  classNumber: yup.string().required(),
  description: yup.string().required()
});

export const EDIT_ACTIVITY_VALIDATION_SCHEMA = yup.object().shape({
  impactType: yup
    .string()
    .nullable()
    .required()
});

export const ACTIVITY_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required(),
  courseItemId: yup.string().required(),
  courseClassId: yup.string().required()
});

export const COPY_ACTIVITY_VALIDATION_SCHEMA = yup.object().shape({
  courseItemId: yup.string().required(),
  fromCourseClassId: yup.string().required(),
  courseItemIdTo: yup.string().required(),
  toCourseClassId: yup.string().required()
});

export const SHOW_AND_TELL_VALIDATION_SCHEMA = yup.object().shape({
  courseItemId: yup.string().required(),
  courseClassId: yup.string().required(),
  activityLocation: yup.string().required(),
  userType: yup.string().required()
});

export const FEEDBACK_QUESTION_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required(),
  questionType: yup.string().required(),
  questionText: yup.string().required(),
  questionInputType: yup
    .string()
    .nullable()
    .when("courseType", {
      is: val => val === "B2B_CODING",
      then: yup.string().required()
    })
});

export const MINDSET_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("This is a required field"),
  courseType: yup.string().required("This is a required field"),
  description: yup.object().shape({
    studentText: yup
      .array()
      .of(yup.string())
      .test({
        message: "Please fill in the details for atleast one student text",
        test: arr => arr.some(s => !!s)
      })
  }),
  gradingScale: yup.object().shape({
    studentScale: yup.array().of(
      yup.object().shape({
        1: yup.string().required("This is a required field"),
        5: yup.string().required("This is a required field"),
        10: yup.string().required("This is a required field")
      })
    )
  }),
  feedbackQuestions: yup.array().of(
    yup.object().shape({
      questionWeightage: yup
        .number()
        .min(0, "Wightage must be between 0 and 100")
        .max(100, "Wightage must be between 0 and 100")
        .required("This is a required field")
    })
  ),
  systemGeneratedQuestions: yup.array().of(
    yup.object().shape({
      questionWeightage: yup
        .number()
        .min(0, "Wightage must be between 0 and 100")
        .max(100, "Wightage must be between 0 and 100")
        .required("This is a required field")
    })
  )
});

export const FEEDBACK_QUESTIONS_OPTION_VALIDATION_SCHEMA = yup.object().shape({
  feedbackQuestionId: yup.string().required(),
  optionText: yup.string().required(),
  optionInt: yup.number().required()
});

const B2B_FEEDBACK_TYPES = [
  "B2B_IN_CLASS_TEACHER_FEEDBACK",
  "B2B_STUDENT_REPORT_CARD"
];

export const FEEDBACK_TRIGGER_VALIDATION_SCHEMA = yup.object().shape({
  feedbackQuestionId: yup.string().required(),
  entityType: yup.string().required(),
  entityId: yup
    .string()
    .nullable()
    .when("entityType", {
      is: val => !B2B_FEEDBACK_TYPES.includes(val),
      then: yup.string().required()
    })
});

export const TEACHER_DELETE_VALIDATION_SCHEMA = yup.object().shape({
  ncReasonDesc: yup.string().required()
});

export const PROJECT_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required(),
  version: yup.string().required(),
  courseItemId: yup.string().required(),
  courseClassId: yup.string().required(),
  difficulty: yup.string().required(),
  projectType: yup.string().required()
});

export const SONG_VALIDATION_SCHEMA = yup.object().shape({
  songName: yup
    .string()
    .required()
    .max(50),
  artistName: yup
    .string()
    .required()
    .max(25),
  genre: yup.string().required(),
  songDuration: yup
    .number()
    .required()
    .min(0),
  maxPoints: yup
    .number()
    .min(0)
    .max(500),
  courseItemId: yup.string().required(),
  courseClassId: yup.string().required(),
  assetType: yup.string().required(),
  assetTypeUrl: yup.string().required()
});

export const MPM_ACTIVITY_VALIDATION_SCHEMA = yup.object().shape({});

export const SAR_REQUEST_VALIDATION_SCHEMA = yup.object().shape({
  email: yup.string().required(),
  dialCode: yup.string().required(),
  mobile: yup.string().required(),
  requestType: yup.string().required(),
  status: yup.string().required(),
  receiverName: yup.string().required(),
  requestorName: yup.string().required(),
  requestDate: yup.string().required(),
  entryDate: yup.string().required()
});

export const PACKAGE_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required(),
  courseItemId: yup.string().required(),
  regionId: yup.string().required(),
  mrp: yup.number().required(),
  sellingPrice: yup.number().required(),
  credits: yup.number().required(),
  currency: yup.string().required(),
  type: yup.string().required(),
  minClassPrice: yup
    .number()
    .integer()
    .moreThan(-1)
    .required(),
  subscriptionMode: yup
    .string()
    .nullable()
    .when("type", {
      is: val => val === "SUBSCRIPTION",
      then: yup.string().required()
    }),
  totalCredits: yup
    .number()
    .nullable()
    .when("type", {
      is: val => val === "SUBSCRIPTION",
      then: yup.number().required()
    }),
  minCredits: yup
    .number()
    .integer()
    .moreThan(-1)
    .nullable(),
  roofCredits: yup
    .number()
    .integer()
    .moreThan(-1)
    .nullable(),
  rooftopRpc: yup
    .number()
    .integer()
    .moreThan(-1)
    .nullable(),
  addOnEnabled: yup.bool().nullable(),
  addOnProductIds: yup.array().nullable(),
  learningJourneyId: yup.string().nullable()
});

export const REASSGN_MENTEE_VALIDATION_SCHEMA = yup.object().shape({
  mentorId: yup.string().required()
});

export const TEACHER_BANK_DETAILS_VALIDATION_SCHEMA = yup.object().shape({
  bankHolderName: yup.string().required(),
  accountNumber: yup.string().required(),
  ifscCode: yup.string().required()
});

export const TEACHER_REIMBURSEMENT_DETAILS_VALIDATION_SCHEMA = yup
  .object()
  .shape({
    reimbursementType: yup.string().required(),
    documentUrl: yup.string().required(),
    amount: yup.string().required(),
    monthYear: yup.string().required()
  });

export const PAYOUT_CYCLE_VALIDATION_SCHEMA = yup.object().shape({
  cycleType: yup.string().required(),
  status: yup.string().required(),
  startDate: yup.string().required(),
  endDate: yup.string().required(),
  payCycleCode: yup.string().required(),
  payroll_business_unit_id: yup.string().required()
});

export const PAYOUT_CYCLE_BUSINESS_UNIT_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required(),
  code: yup.string().required()
});

export const CRON_CONFIG_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required(),
  cron: yup.string().required(),
  params: yup.string().required(),
  methodName: yup.string().required(),
  serviceName: yup.string().required()
});

export const UPDATE_STUDENT_COURSE_LEVEL_VALIDATION_SCHEMA = yup
  .object()
  .shape({
    courseIndex: yup.string().required(),
    courseVersionId: yup.string().required("Version required"),
    courseItemId: yup.string().required("Class required"),
    ncReasonCode: yup.string().required("Reason is required"),
    ncReasonDesc: yup.string().when("ncReasonCode", {
      is: "OTHERS",
      then: yup
        .string()
        .required("Descripton is required when reason code is Others")
    }),
    lastCompletedClass: yup
      .string()
      .required("Last completed class is required")
  });
export const ASSIGN_STUDENT_PROJECT_VALIDATION_SCHEMA = yup.object().shape({
  courseIndex: yup.string().required(),
  courseVersionId: yup.string().required("Version required"),
  courseItemId: yup.string().required("Class required")
});

export const NOTIFICATION_JSON_VALIDATION_SCHEMA = () => {
  const newV2JsonSchema = {
    name: yup.string().required(),
    config: yup.object().required(),
    notificationType: yup.string().required(),
    isBetaEnabled: yup.boolean().nullable()
  };
  return yup.object().shape(newV2JsonSchema);
};

export const CREATE_NOTIFICATION_RULE_SCHEMA = yup.object().shape({
  isLaptop: yup.string().required("Laptop is required"),
  receiver: yup.array().required("Receiver is required"),
  countryCode: yup.array().required("Country is required"),
  courseType: yup.array().required("Course is required"),
  language: yup.array().required("Language is required"),
  brandId: yup.array().required("Brand is required")
});

export const NOTIFICATION_VALIDATION_SCHEMA = (
  notificationType,
  isNewSchema
) => {
  // ToDo:  Backward compatible to support old config Structure , Requires DELETION LATER
  const oldSchema = {
    name: yup.string().required(),
    templateType: ["sms", "url"].includes(notificationType)
      ? yup.string().nullable()
      : yup.string().required(),
    template:
      notificationType === "url"
        ? yup.string().nullable()
        : yup.string().required(),
    config: yup.object().required(),
    rule: yup.string().required(),
    notificationType: yup.string().required(),
    notificationCategoryMasterId: yup.string().required(),
    isBetaEnabled: yup.boolean().nullable()
  };
  const newSchema = {
    name: yup.string().required(),
    config: yup.object().shape({
      variables: yup.object().required(),
      template: yup.object().shape({
        type: ["sms", "url"].includes(notificationType)
          ? yup.string().nullable()
          : yup.string().required(),
        body:
          notificationType === "url"
            ? yup.string().nullable()
            : yup.string().required()
      }),
      rules: yup.array().of(
        yup.object().shape({
          logic: yup
            .array()
            .of(yup.string().required())
            .min(1),
          template: yup.object().shape({
            type: ["sms", "url"].includes(notificationType)
              ? yup.string().nullable()
              : yup.string().required(),
            body:
              notificationType === "url"
                ? yup.string().nullable()
                : yup.string().required()
          })
        })
      )
    }),
    notificationType: yup.string().required(),
    notificationCategoryMasterId: yup.string().required(),
    isBetaEnabled: yup.boolean().nullable()
  };
  return yup.object().shape(isNewSchema ? newSchema : oldSchema);
};

export const CLASS_VERSION_INFO_VALIDATION_SCHEMA = base => {
  let shape = {
    versionName: yup.string().required(),
    brandId: yup.string().required("Please select the Brand."),
    regions: yup.array().min(1, "Region is required")
  };
  if (base) {
    shape.versionNo = yup.string().required();
  }
  return yup.object().shape(shape);
};
export const COURSE_VERSION_INFO_VALIDATION_SCHEMA = yup.object().shape({});
export const COURSE_VERSION_VALIDATION_SCHEMA = yup.object().shape({
  courseItemId: yup.string().required(),
  versionNo: yup.string().required()
});
export const CALCULATOR_VALIDATION = yup.object().shape({
  amount: yup.string().required(),
  preferredGateway: yup.string().required()
});

export const COURSE_UPDATE_VALIDATION_SCHEMA = credits => {
  return yup.object().shape({
    credits: yup
      .number()
      .integer()
      .moreThan(-1)
      .lessThan(credits + 3)
      .required(),
    ncReasonCode: yup.string().required("Reason is required"),
    journey: yup.string().when("isJourneyEnabled", {
      is: true,
      then: yup.string().required("Please select Learning Journey")
    }),
    moduleCount: yup.number().when("isJourneyEnabled", {
      is: true,
      then: yup
        .number()
        .integer()
        .moreThan(-1)
        .required("Add module count")
    }),
    ncReasonDesc: yup.string().when("ncReasonCode", {
      is: "OTHERS",
      then: yup
        .string()
        .required("Descripton is required when reason code is Others")
    })
  });
};
export const COURSE_UPDATE_VALIDATION_SCHEMA_ADMIN = yup.object().shape({
  credits: yup
    .number()
    .integer()
    .moreThan(-1)
    .lessThan(500)
    .required(),
  ncReasonCode: yup.string().required("Reason is required"),
  journey: yup.string().when("isJourneyEnabled", {
    is: true,
    then: yup.string().required("Please select Learning Journey")
  }),
  moduleCount: yup.number().when("isJourneyEnabled", {
    is: true,
    then: yup
      .number()
      .integer()
      .moreThan(-1)
      .required("Add module count")
  }),
  ncReasonDesc: yup.string().when("ncReasonCode", {
    is: "OTHERS",
    then: yup
      .string()
      .required("Descripton is required when reason code is Others")
  })
});
export const EVENT_COMMAND_CONFIG_VALIDATION_SCHEMA = yup.object().shape({
  eventName: yup.string().required(),
  rule: yup.string().required(),
  command: yup.string().required(),
  commandData: yup.string().required()
});

export const SQL_JOB_ENTITY_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required(),
  notificationType: yup.string().required(),
  notificationName: yup.string().required(),
  sqlQuery: yup.string().required(),
  queryReplacement: yup.string().required()
});

export const SQL_TEST_VALIDATION_SCHEMA = yup.object().shape({
  sqlQuery: yup.string().required()
});

export const EVENT_COMMAND_TEST_VALIDATION_SCHEMA = yup.object().shape({
  eventSchema: yup.string().required()
});

export const PAYMENT_REQUEST_VALIDATION_SCHEMA = isAddOnEnabled => {
  return yup.object().shape({
    credits: yup
      .number()
      .moreThan(-1)
      .required()
      .typeError("you must specify a number"),
    coursePriceId: yup.string().required("Package is a required field"),
    expiry: yup.string().required(),
    additionalDiscount: yup
      .number()
      .moreThan(-1, "must be positive number")
      .typeError("you must specify a number"),
    finalAmount: yup
      .number()
      .moreThan(-1, "must be positive number")
      .typeError("you must specify a number"),
    email: yup.string().matches(EMAIL_REGEX, "Not a valid email"),
    mobile: yup.string().when("dialCode", {
      is: code => code === "+91",
      then: yup.string().matches(MOBILE_REGEX, "Invalid mobile number")
    }),
    addOnEnabled: yup.bool(),
    addOnSelected: isAddOnEnabled ? yup.object().required() : yup.object()
  });
};

export const TEACHER_SKILL_VALIDATION_SCHEMA = yup.object().shape({
  skillName: yup.string().required("Skill type is a required field"),
  skillValue: yup.string().required("Skill value is a required filed")
});

export const TASKROSTER_VALIDATION_SCHEMA = yup.object().shape({
  taskTypes: yup.array().required("Task type is required"),
  user: yup.string().required("Agent is required"),
  regions: yup.array().required("Region is required")
});

export const SITEL_LEAD_SCHEMA = yup.object().shape({
  courseShortName: yup.array().required("At least one course is required"),
  startTime: yup
    .date()
    .nullable()
    .required("Start time is required"),
  endTime: yup
    .date()
    .min(yup.ref("startTime"), "End Date must be later than Start Date")
    .nullable()
    .required("End time is required")
});

export const SLOT_BOOKING_MATH_SCHEMA = yup.object().shape({
  courseType: yup.string().required("Course type is required"),
  leadType: yup.string().required("Lead type is required"),
  courseShortName: yup
    .array()
    .of(yup.string())
    .min(1)
    .required("At least one course is required"),
  callcentre: yup.string().required("Call centre is required"),
  churnFactor: yup.string().required("Churn factor is required"),
  countryCodeList: yup.string().required("At least one country is required"),
  offset: yup
    .number()
    .integer()
    .positive()
    .min(0)
    .max(100000)
    .required("Offset cannot be empty"),
  limit: yup
    .number()
    .integer()
    .positive()
    .min(0)
    .max(10000)
    .required("Limit cannot be empty"),
  startTime: yup
    .date()
    .nullable()
    .required("Start time is required"),
  endTime: yup
    .date()
    .nullable()
    .required("End time is required")
});

export const SLOT_BOOKING_MUSIC_SCHEMA = yup.object().shape({
  courseType: yup.string().required("Course type is required"),
  leadType: yup.string().required("Lead type is required"),
  courseShortName: yup
    .array()
    .of(yup.string())
    .min(1)
    .required("At least one course is required"),
  callcentre: yup.string().required("Call centre is required"),
  churnFactor: yup.string().required("Churn factor is required"),
  countryCodeList: yup.string().required("At least one country is required"),
  offset: yup
    .number()
    .integer()
    .positive()
    .min(0)
    .max(100000)
    .required("Offset cannot be empty"),
  limit: yup
    .number()
    .integer()
    .positive()
    .min(0)
    .max(10000)
    .required("Limit cannot be empty"),
  startTime: yup
    .date()
    .nullable()
    .required("Start time is required"),
  endTime: yup
    .date()
    .nullable()
    .required("End time is required"),
  isLaptop: yup.boolean().nullable()
});

export const SLOT_BOOKING_MUSIC_FOR_ALL_SCHEMA = yup.object().shape({
  courseType: yup.string().required("Course type is required"),
  leadType: yup.string().required("Lead type is required"),
  courseShortName: yup
    .array()
    .of(yup.string())
    .min(1)
    .required("At least one course is required"),
  callcentre: yup.string().required("Call centre is required"),
  churnFactor: yup.string().required("Churn factor is required"),
  countryCodeList: yup.string().required("At least one country is required"),
  offset: yup
    .number()
    .integer()
    .positive()
    .min(0)
    .max(100000)
    .required("Offset cannot be empty"),
  limit: yup
    .number()
    .integer()
    .positive()
    .min(0)
    .max(10000)
    .required("Limit cannot be empty"),
  startTime: yup
    .date()
    .nullable()
    .required("Start time is required"),
  endTime: yup
    .date()
    .nullable()
    .required("End time is required"),
  isLaptop: yup.boolean().nullable()
});

export const SLOT_BOOKING_BFS_SCHEMA = yup.object().shape({
  courseType: yup.string().required("Course type is required"),
  leadType: yup
    .array()
    .of(yup.object().nullable())
    .min(1)
    .required("At least one lead type is required"),
  courseShortName: yup
    .array()
    .of(yup.object().nullable())
    .min(1)
    .required("At least one course is required"),
  callcentre: yup.string().required("Call centre is required"),
  countryCodeList: yup
    .array()
    .of(yup.object().nullable())
    .min(1)
    .required("At least one country is required"),
  offset: yup
    .number()
    .integer()
    .positive()
    .min(0)
    .max(100000)
    .required("Offset cannot be empty"),
  limit: yup
    .number()
    .integer()
    .positive()
    .min(0)
    .max(10000)
    .required("Limit cannot be empty"),
  startTime: yup
    .date()
    .nullable()
    .required("Start time is required"),
  endTime: yup
    .date()
    .nullable()
    .required("End time is required")
});

export const SLOT_BOOKING_ART_SCHEMA = yup.object().shape({
  courseType: yup.string().required("Course type is required"),
  leadType: yup.string().required("Lead type is required"),
  courseShortName: yup
    .array()
    .of(yup.string())
    .min(1)
    .required("At least one course is required"),
  callcentre: yup.string().required("Call centre is required"),
  churnFactor: yup.string().required("Churn factor is required"),
  countryCodeList: yup.string().required("At least one country is required"),
  offset: yup
    .number()
    .integer()
    .positive()
    .min(0)
    .max(100000)
    .required("Offset cannot be empty"),
  limit: yup
    .number()
    .integer()
    .positive()
    .min(0)
    .max(10000)
    .required("Limit cannot be empty"),
  startTime: yup
    .date()
    .nullable()
    .required("Start time is required"),
  endTime: yup
    .date()
    .nullable()
    .required("End time is required")
});

export const BULK_REASSIGN_SCHEMA = yup.object().shape({
  startTime: yup
    .date()
    .nullable()
    .required("Start time is required"),
  endTime: yup
    .date()
    .min(yup.ref("startTime"), "End Date must be later than Start Date")
    .nullable()
    .required("End time is required"),
  limit: yup
    .number()
    .integer()
    .positive()
    .min(0)
    .max(100000)
    .required("Limit is required"),
  taskTypeId: yup.string().required("Task type is required"),
  taskSubTypeId: yup.string().required("Sub Task type is required"),
  regionId: yup.string().required("Region is required"),
  agentType: yup.string().required("Agent Type is required")
});

export const TEACHER_STRIKE = yup.object().shape({});

export const SLOT_BOOKING_SCHEMA = yup.object().shape({
  courseShortName: yup
    .array()
    .of(yup.string())
    .min(1)
    .required("At least one course is required"),
  callcentre: yup.string().required("Call centre is required"),
  countryCodeList: yup.string().required("At least one country is required"),
  churnFactor: yup.string().required("Churn factor is required"),
  offset: yup
    .number()
    .integer()
    .positive()
    .min(0)
    .max(100000)
    .required("Offset cannot be empty"),
  limit: yup
    .number()
    .integer()
    .positive()
    .min(0)
    .max(100000)
    .required("Limit cannot be empty"),
  leadType: yup.string().required("Lead type is required"),
  startTime: yup
    .date()
    .nullable()
    .required("Start time is required"),
  endTime: yup
    .date()
    .min(yup.ref("startTime"), "End Date must be later than Start Date")
    .nullable()
    .required("End time is required")
});

export const SLOT_BOOKING_NO_LAPTOP_SCHEMA = yup.object().shape({
  courseType: yup.string().required("Course type is required"),
  courseShortName: yup
    .array()
    .of(yup.object().nullable())
    .min(1)
    .required("At least one course is required"),
  callcentre: yup.string().required("Call centre is required"),
  countryCodeList: yup
    .array()
    .of(yup.object().nullable())
    .min(1)
    .required("At least one country is required"),
  taskName: yup.string().required("Task type is required"),
  leadType: yup
    .array()
    .of(yup.object().nullable())
    .min(1)
    .required("At least one lead type is required"),
  offset: yup
    .number()
    .integer()
    .positive()
    .min(0)
    .max(100000)
    .required("Offset cannot be empty"),
  limit: yup
    .number()
    .integer()
    .positive()
    .min(0)
    .max(10000)
    .required("Limit cannot be empty"),
  startTime: yup
    .date()
    .nullable()
    .required("Start time is required"),
  endTime: yup
    .date()
    .min(yup.ref("startTime"), "End Date must be later than Start Date")
    .nullable()
    .required("End time is required")
});

export const SLOT_BOOKING_NR_SCHEMA = yup.object().shape({
  source: yup.string().required("Source type is required"),
  courseType: yup.string().required("Course type is required"),
  callcentre: yup.string().required("Call centre is required"),
  offset: yup
    .number()
    .integer()
    .positive()
    .min(0)
    .max(700000)
    .required("Offset cannot be empty"),
  limit: yup
    .number()
    .integer()
    .positive()
    .min(0)
    .max(10000)
    .required("Limit cannot be empty"),
  startTime: yup
    .date()
    .nullable()
    .required("Start time is required"),
  endTime: yup
    .date()
    .min(yup.ref("startTime"), "End Date must be later than Start Date")
    .nullable()
    .required("End time is required")
});

export const SLOT_BOOKING_RE_CHURN_SCHEMA = yup.object().shape({
  regionId: yup.string().required("Country is required"),
  startTime: yup
    .date()
    .nullable()
    .required("Start time is required"),
  callcentre: yup.string().required("Call centre is required"),
  taskTypeId: yup.string().required("Task type is required"),
  subTaskTypeId: yup.string().required("Sub Task type is required"),
  endTime: yup
    .date()
    .min(yup.ref("startTime"), "End date must be 10 days later than start date")
    .nullable()
    .required("End time is required")
});

export const CREATE_EVENTS_VALIDATION_SCHEMA = () => {
  return yup.object().shape({
    ...{
      eventName: yup
        .string()
        .min(2, "Event name must be at least 2 character")
        .max(10, "Event name must be at most 10 character")
        .required("Event name is required"),
      startTime: yup
        .date()
        .nullable()
        .required("Start time is required"),
      endTime: yup
        .date()
        .min(yup.ref("startTime"))
        .nullable()
        .required("End time is required"),
      config: yup.object().shape({
        image: yup
          .string()
          .url()
          .required("Image link is required"),
        description: yup
          .string()
          .min(10, "Event description must be at least 10 character")
          .max(100, "Event description must be at most 100 character")
          .required("Description is required"),
        inviteText: yup.string().required("Invite Text is required"),
        videos: yup
          .object()
          .required()
          .shape({
            LEADERBOARD_STEP_UP: yup
              .string()
              .url("Video link must be a valid URL")
              .required("Video link is required"),
            HACKATHON_OVERVIEW: yup
              .string()
              .url("Video link must be a valid URL")
              .required("Video link is required"),
            HOW_TO_EARN_POINT: yup
              .string()
              .url("Video link must be a valid URL")
              .required("Video link is required")
          }),
        resultPublishDate: yup
          .date()
          .nullable()
          .required("Result publish date is required"),
        banners: yup
          .object()
          .required()
          .shape({
            HERO_BANNER: yup
              .object()
              .required()
              .shape({
                desktop: yup
                  .string()
                  .url("Image link must be a valid URL")
                  .required("Desktop image link is required"),
                mob: yup
                  .string()
                  .url("Image link must be a valid URL")
                  .required("Mobile image link is required")
              }),
            BUY_EXPERT_PLAN: yup
              .object()
              .required()
              .shape({
                desktop: yup
                  .string()
                  .url("Image link must be a valid URL")
                  .required("Desktop image link is required"),
                mob: yup
                  .string()
                  .url("Image link must be a valid URL")
                  .required("Mobile image link is required")
              })
          }),
        dailyChallenges: yup.object().shape({
          description: yup.string().required("Description is required"),
          points: yup
            .number("The value should be a number")
            .nullable()
            .required("Points are required"),
          image: yup
            .string()
            .url("Image link must be a valid URL")
            .required("Image link is required")
        }),
        hackathonChallenge: yup.object().shape({
          description: yup.string().required("Description is required"),
          points: yup
            .number("The value should be a number")
            .nullable()
            .required("Points are required"),
          image: yup
            .string()
            .url("Image link must be a valid URL")
            .required("Image link is required")
        }),
        challengeYourFriends: yup.object().shape({
          description: yup.string().required("Description is required"),
          points: yup
            .object()
            .shape({
              invitation: yup
                .number("The value should be a number")
                .nullable()
                .required("Points are required"),
              paid: yup
                .number("The value should be a number")
                .nullable()
                .required("Points are required")
            })
            .required(),
          image: yup
            .string()
            .url("Image link must be a valid URL")
            .required("Image link is required")
        })
      })
    }
  });
};

export const CREATE_CONTEST_VALIDATION_SCHEMA = () => {
  return yup.object().shape({
    ...{
      courseId: yup.string().required(),
      config: yup
        .object()
        .shape({
          image: yup
            .string()
            .url("Image link must be a valid URL")
            .required("Image link is required"),
          description: yup.string().required("Contest description is required"),
          prizeStructure: yup.array().of(
            yup.object().shape({
              prize: yup
                .string()
                .min(2, "Prize name must be at least 2 character")
                .max(100, "Prize name must be at most 100 character")
                .required("Prize field is required"),
              description: yup
                .string()
                .required("Prize description is required"),
              image: yup
                .string()
                .url("Image link must be a valid URL")
                .required("Image link is required")
            })
          ),
          invitationPrizeStructure: yup.array().of(
            yup.object().shape({
              prize: yup
                .string()
                .min(2, "Prize name must be at least 2 character")
                .max(100, "Prize name must be at most 100 character")
                .required("Prize field is required"),
              description: yup
                .string()
                .required("Prize description is required"),
              image: yup
                .string()
                .url("Image link must be a valid URL")
                .required("Image link is required")
            })
          )
        })
        .required()
    }
  });
};

export const CREATE_DAILY_CONTEST_VALIDATION_SCHEMA = () => {
  return yup.object().shape({
    ...{
      contestType: yup.string().required("Please select contest type"),
      startTime: yup
        .string()
        .nullable()
        .required("Please select start time"),
      config: yup.object().shape({
        image: yup
          .string()
          .url("Image link must be a valid URL")
          .required("Image link is required"),
        description: yup.string().required("Description is required"),
        prizeStructure: yup
          .array()
          .of(
            yup.object().shape({
              prize: yup
                .string()
                .min(2, "Prize name must be at least 2 character")
                .max(100, "Prize name must be at most 100 character")
                .required("Prize field is required"),
              description: yup
                .string()
                .required("Prize description is required"),
              image: yup
                .string()
                .url("Image link must be a valid URL")
                .required("Image link is required")
            })
          )
          .required(),
        invitationPrizeStructure: yup
          .array()
          .of(
            yup.object().shape({
              prize: yup
                .string()
                .min(2, "Prize name must be at least 2 character")
                .max(100, "Prize name must be at most 100 character")
                .required("Prize field is required"),
              description: yup
                .string()
                .required("Prize description is required"),
              image: yup
                .string()
                .url("Image link must be a valid URL")
                .required("Image link is required")
            })
          )
          .required()
      })
    }
  });
};

export const CREATE_CODING_CHALLENGE_VALIDATION_SCHEMA = puzzle => {
  return yup.object().shape({
    difficultyLevel: yup.string().required("Please select difficulty level"),
    config: yup
      .object()
      .shape({
        link: yup.string().required("Link is required"),
        image: yup
          .string()
          .url("Image link must be a valid URL")
          .required("Image link is required"),
        description: yup.string().required("Description is required"),
        video: yup.string().required("Video link is required"),
        code: puzzle ? yup.string().required("Code is required") : yup.string()
      })
      .required()
  });
};

export const CREATE_MCQ_CHALLENGE_VALIDATION_SCHEMA = () => {
  return yup.object().shape({
    difficultyLevel: yup.string().required("Select difficulty level"),
    config: yup
      .object()
      .shape({
        description: yup.string().required("Challenge description is required"),
        image: yup.string(),
        correctAnswer: yup
          .array()
          .max(1)
          .nullable()
          .required("Correct answer is required"),
        options: yup.object().shape({
          A: yup.object().shape({
            value: yup.string().required("Value is required"),
            image: yup.string()
          }),
          B: yup.object().shape({
            value: yup.string().required("Value is required"),
            image: yup.string()
          }),
          C: yup.object().shape({
            value: yup.string().required("Value is required"),
            image: yup.string()
          }),
          D: yup.object().shape({
            value: yup.string().required("Value is required"),
            image: yup.string()
          })
        })
      })
      .required()
  });
};

export const CHALLENGE_AWARD_SCORE_VALIDATION_SCHEMA = () => {
  return yup.object().shape({
    score: yup.number().required("Score is required")
  });
};
export const BATCH_BOOKING_VALIDATION_SCHEMA = yup.object().shape({
  batch: yup.string().required("Batch is required")
});
export const SPECIAL_CLASS_VALIDATION_SCHEMA = yup.object().shape({
  courseVersionId: yup.string().required(),
  courseItemId: yup.string().required(),
  teacherId: yup.string().required(),
  selectedDate: yup.string().required(),
  slot: yup.string().required()
});

export const CHAT_NAME_VALIDATION = yup.object().shape({
  name: yup.string().required()
});
export const CHAT_NAME_SCORE_VALIDATION = yup.object().shape({
  name: yup.string().required(),
  name_es: yup.string().required(),
  name_pt: yup.string().required(),
  score: yup
    .number()
    .integer()
    .min(0)
    .max(100)
});

export const CHAT_DEPARTMENT_VALIDATION = yup.object().shape({
  issue_category: yup.string().required("Issue category is required"),
  support_dept: yup.string().required("Support department is required")
});

export const CONCENTRIX_FORM_VALIDATION = action => {
  let getShape = function(action) {
    if (!action) {
      return {
        startTime: yup.string().required("Pick a callback time")
      };
    } else {
      return {};
    }
  };
  return yup.object().shape({
    typeId: yup.string().required(),
    subTypeId: yup.string().required(),
    dispositionTypeId: yup.string().required(),
    subDispositionTypeId: yup.string().required(),
    remarks: yup
      .string()
      .matches(STRING_NO_SPECIAL_CHAR_REGEX, "No Special characters allowed")
      .nullable(),
    customerRemarks: yup
      .string()
      .matches(STRING_NO_SPECIAL_CHAR_REGEX, "No Special characters allowed")
      .nullable(),
    ...getShape(action)
  });
};

export const CHAT_ALERT_MONITOR = action => {
  let getShape = function(action) {
    if (action == "department") {
      return {
        agents_online: yup
          .number("Must be a number")
          .moreThan(-1, "must be positive number")
          .required("This field is required"),
        assigned_incoming_chats: yup
          .number("Must be a number")
          .moreThan(-1, "must be positive number")
          .required("This field is required"),
        alert_category_id: yup
          .string()
          .required("Support department is required"),
        waiting_time_max: yup
          .number("Must be a number")
          .moreThan(-1, "must be positive number")
          .required("This field is required"),
        active_chats: yup
          .number("Must be a number")
          .moreThan(-1, "must be positive number")
          .required("This field is required"),
        agents_online_overall: yup
          .number("Must be a number")
          .moreThan(-1, "must be positive number"),
        engagement_count: yup
          .number("Must be a number")
          .moreThan(-1, "must be positive number")
      };
    } else if (action == "overall") {
      return {
        agents_online: yup
          .number("Must be a number")
          .moreThan(-1, "must be positive number"),
        assigned_incoming_chats: yup
          .number("Must be a number")
          .moreThan(-1, "must be positive number"),
        waiting_time_max: yup
          .number("Must be a number")
          .moreThan(-1, "must be positive number"),
        active_chats: yup
          .number("Must be a number")
          .moreThan(-1, "must be positive number"),
        agents_online_overall: yup
          .number("Must be a number")
          .moreThan(-1, "must be positive number")
          .required("This field is required"),
        engagement_count: yup
          .number("Must be a number")
          .moreThan(-1, "must be positive number")
          .required("This field is required")
      };
    } else {
      return {};
    }
  };
  return yup.object().shape({
    alert_category: yup.string().required("Alert type is required"),
    start_time: yup.string().required("Start time is required"),
    end_time: yup.string().required("End time is required"),
    send_list: yup
      .string()
      .matches(EMAIL_COMMA_SEPERATED_REGEX, "Not valid email list")
      .required("Send list is required"),
    ...getShape(action)
  });
};
export const REFUND_VALIDATION_SCHEMA = yup.object().shape({
  credits: yup
    .number()
    .integer()
    .moreThan(-1)
    .required("Please enter valid credits"),
  currency: yup.string().required("This field is required"),
  initiatedAt: yup.string().when('adjustmentType', {
    is: (adjustmentType) => (['pending_refund'].includes(adjustmentType) !== true),
    then: (schema) => (schema.required())
  }),
  payId: yup.string().when('adjustmentType', {
    is: (adjustmentType) => (['pending_refund'].includes(adjustmentType) !== true),
    then: (schema) => (schema.required())
  }),
  opsNotes: yup.string().required("This field is required"),
  dispositionType: yup.string().required("This field is required")
});

export const AFFILIATE_VALIDATION_SCHEMA = () => {
  return yup.object().shape({
    ...{
      name: yup.string().required(),
      companyName: yup.string().required(),
      email: yup
        .string()
        .matches(EMAIL_REGEX, "Not a valid email")
        .required(),
      countryCode: yup.string().required(),
      mobile: yup
        .string()
        .matches(DIGIT_REGEX, {
          message: "Only numeric values are allowed",
          excludeEmptyString: true
        })
        .length(10, "mobile should with 10 digits")
        .required(),
      dialCode: yup.string().required()
    }
  });
};

export const LAPTOP_VALIDATION_SCHEMA = () => {
  return yup.object().shape({
    ...{
      productName: yup.string().required(),
      productPrice: yup.number().required(),
      productDetails: yup.string().required(),
      countryCode: yup.string().required(),
      currency: yup.string().required()
    }
  });
};

export const AFFILIATE_ADDRESS_VALIDATION_SCHEMA = () => {
  return yup.object().shape({
    ...{
      addressType: yup.string().required(),
      addressLine1: yup.string().required(),
      landmark: yup.string().required(),
      city: yup.string().required(),
      state: yup.string().required(),
      country: yup.string().required(),
      zipCode: yup.string().required()
    }
  });
};

export const CAMPAIGN_VALIDATION_SCHEMA = () => {
  return yup.object().shape({
    ...{
      name: yup.string().required(),
      description: yup.string().required(),
      startDate: yup.string().required(),
      endDate: yup.string().required(),
      imageUrl: yup.string().required(),
      mobileImageUrl: yup.string().required()
    }
  });
};
export const PERMISSION_VALIDATION_SCHEMA = () => {
  return yup.object().shape({
    ...{
      name: yup.string().required(),
      type: yup.string().required(),
      description: yup.string().required()
    }
  });
};

export const ROLES_VALIDATION_SCHEMA = () => {
  return yup.object().shape({
    ...{
      name: yup.string().required(),
      description: yup.string().required()
    }
  });
};

export const ACTION_SCOPE_VALIDATION_SCHEMA = () => {
  return yup.object().shape({
    ...{
      action_scope: yup.string().required(),
      description: yup.string().required(),
      actionObj: yup.object().required()
    }
  });
};

export const PERMISSION_MAPPING_VALIDATION_SCHEMA = yup.object().shape({
  permissionId: yup.string().required(),
  roleMasterId: yup.string().required()
});
export const PROACTIVE_CUSTOM_GMAIL_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required(),
  email: yup
    .string()
    .matches(EMAIL_REGEX, "Not a valid email")
    .required(),
  username: yup
    .string()
    .matches(EMAIL_REGEX, "Not a valid email")
    .required(),
  password: yup.string().required()
});

export const STUDENT_COURSE_CHANGE_TEACHER = yup.object().shape({
  teacherId: yup.string().required("Teacher selction is required "),
  ncReasonCode: yup.string().required("Reason Code is required "),
  ncReasonDesc: yup.string().when("ncReasonCode", {
    is: "OTHERS",
    then: yup
      .string()
      .required("Descripton is required when reason code is Others")
  })
});

export const STUDENT_COURSE_ASSIGN_ANY_TEACHER = yup.object().shape({
  ncReasonCode: yup.string().required("Reason Code is required "),
  ncReasonDesc: yup.string().when("ncReasonCode", {
    is: "OTHERS",
    then: yup
      .string()
      .required("Descripton is required when reason code is Others")
  })
});

export const STUDENT_WEBINAR_VALIDATION = () => {
  return yup.object().shape({
    zoomLink: yup
      .string()
      .url()
      .required("Webinar Link is Required"),
    // zoomAccountId: yup.string().required("Select a Zoom Account"),
    courseShortName: yup.string().required("Course is Required"),
    startTime: yup.date().required("Start Date is Required")
  });
};

export const BATCH_ENROLMENT_CANCELLATION = () => {
  return yup.object().shape({
    ...{
      reasonCode: yup.string().required("Reason Code is required ")
    }
  });
};

export const BANNER_OBJECT_UPSERT_VALIDATION = yup.object().shape({
  titleText: yup
    .string()
    .trim()
    .required("Title is required")
    .min(3, "Title should have at least 3 characters"),
  descriptionText: yup
    .string()
    .trim()
    .required("Description is required"),
  isExternal: yup.bool(),
  ctaText: yup
    .string()
    .trim()
    .required("CTA text is required")
    .min(3, "Button text should have at least 3 characters"),
  ctaLink: yup
    .string()
    .trim()
    .required("A valid link is required")
    .when("isExternal", {
      is: true,
      then: yup
        .string()
        .test("link_validation", "Enter a valid url", (val = "") => {
          const regex = new RegExp(WEBSITE_LINK_REGEX);
          return !!val.match(regex);
        })
    }),
  desktopImage: yup.string().required("Desktop image is required"),
  mobileImage: yup.string().required("Mobile image link is required")
});

export const WEEKLY_CHALLENGE_EVENT_VALIDATION = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .min(3, "Name should have at least 3 characters"),
  startTime: yup.string().required("Start date is required"),
  endTime: yup.string().required("End time is required"),
  type: yup
    .string()
    .trim()
    .required("Type is required")
});

export const WEEKLY_CHALLENGE_CONTEST_VALIDATION = (contestEventType, edit) =>
  yup.object().shape({
    themeName: yup
      .string()
      .trim()
      .required("Name is required")
      .min(3, "Name should have at least 3 characters"),
    startTime: yup.string().required("Start date is required"),
    endTime: yup.string().required("End time is required"),
    contestType: yup
      .string()
      .trim()
      .required("Contest type is required"),
    // goldAvatarImage: yup.string().required("Avatar image is required"),
    config: yup.lazy(val => {
      if (["gmc_challenge", "gmsa_challenge"].includes(contestEventType)) {
        return yup.object();
      } else {
        if (val === "" || val === undefined) {
          return yup.string().required("Config is required");
        } else {
          return yup.object().shape({
            description: yup
              .string()
              .trim()
              .min(3, "Enter Valid Description")
              .nullable(),
            // points: yup.object().shape({
            //   first: yup
            //     .number()
            //     .typeError("Should be a number")
            //     .moreThan(-1, "must be positive number"),
            //   second: yup
            //     .number()
            //     .typeError("Should be a number")
            //     .moreThan(-1, "must be positive number"),
            //   third: yup
            //     .number()
            //     .typeError("Should be a number")
            //     .moreThan(-1, "must be positive number"),
            //   participate: yup
            //     .number()
            //     .typeError("Should be a number")
            //     .moreThan(-1, "must be positive number")
            // }),
            images: yup.lazy(val => {
              if (
                ["activity_puzzle", "activity_quiz"].includes(contestEventType)
              )
                return yup.object();
              if (val === "" || val === undefined) {
                return yup.string().required("Images is required");
              } else {
                return yup.object().shape({
                  logo: yup
                    .string()
                    .required("Image is required")
                    .nullable()
                });
              }
            })
          });
        }
      }
    }),
    contestMetaData: yup.lazy(val => {
      if (contestEventType === "weekly_challenge") return yup.object();
      if (val === "" || val === undefined) {
        return yup.string().required("Contest meta data is required");
      } else {
        return yup.object().shape({
          poster: yup.lazy(val => {
            if (
              !["activity_puzzle", "activity_quiz"].includes(contestEventType)
            )
              return yup.string();
            if (val === "" || val === undefined) {
              return yup.string().required("Poster is required");
            } else {
              return yup.string().required("Poster is required");
            }
          }),
          bannerImage: yup.string(),
          puzzleGraphic: yup.lazy(val => {
            if (contestEventType !== "activity_puzzle") return yup.string();
            if (val === "" || val === undefined) {
              return yup.string().required("Puzzle graphic is required");
            } else {
              return yup.string().required("Puzzle graphic is required");
            }
          }),
          puzzleTitle: yup.lazy(val => {
            if (contestEventType !== "activity_puzzle") return yup.string();
            if (val === "" || val === undefined) {
              return yup.string().required("Puzzle Title is required");
            } else {
              return yup.string().required("Puzzle Title is required");
            }
          }),
          points: yup.lazy(val => {
            if (
              !["activity_puzzle", "activity_quiz"].includes(contestEventType)
            )
              return yup.string();
            if (val === "" || val === undefined) {
              return yup
                .number("")
                .required("Points is required")
                .typeError("Should be a number")
                .moreThan(-1, "must be positive number");
            } else {
              return yup.number().required("Points is required");
            }
          }),
          timeCap: yup.lazy(val => {
            if (contestEventType !== "activity_quiz") return yup.string();
            if (val === "" || val === undefined) {
              return yup.number().required("Time per contest is required");
            } else {
              return yup.number().required("Time per contest is required");
            }
          }),
          questionCount: yup.lazy(val => {
            if (contestEventType !== "activity_quiz") return yup.string();
            if (val === "" || val === undefined) {
              return yup
                .number()
                .required("Question count per contest is required");
            } else {
              return yup
                .number()
                .required("Question count per contest is required");
            }
          }),
          title: yup.lazy(val => {
            if (!["gmc_challenge", "gmsa_challenge"].includes(contestEventType))
              return yup.string();
            if (val === "" || val === undefined) {
              return yup.string().required("Title is required");
            } else {
              return yup.string().required("Title is required");
            }
          }),
          description: yup.lazy(val => {
            if (!["gmc_challenge", "gmsa_challenge"].includes(contestEventType))
              return yup.string();
            if (val === "" || val === undefined) {
              return yup.string().required("Description is required");
            } else {
              return yup.string().required("Description is required");
            }
          }),
          imageUrl: yup.lazy(val => {
            if (!["gmc_challenge", "gmsa_challenge"].includes(contestEventType))
              return yup.string();
            if (val === "" || val === undefined) {
              return yup.string().required("Image url contest is required");
            } else {
              return yup.string().required("Image url contest is required");
            }
          })
        });
      }
    }),
    // backstoryMetaData: yup.lazy(val => {
    //   if (!["gmc_challenge","gmsa_challenge"].includes(contestEventType)) {
    //     return yup.object();
    //   } else {
    //     if (val === "" || val === undefined) {
    //       return yup.string().required("Backstory is required");
    //     } else {
    //       return yup.object().shape({
    //         description: yup
    //           .string()
    //           .trim()
    //           .min(2, "Enter Valid Description")
    //           .nullable(),
    //         title: yup
    //           .string()
    //           .trim()
    //           .min(2, "Enter Valid title")
    //           .nullable(),
    //         imageUrl: yup
    //           .string()
    //           .required("Image is required")
    //           .nullable()
    //       });
    //     }
    //   }
    // }),

    // certificates: yup.object().shape({
    //   goldIndia: yup.string().required("Gold certificate for India is required"),
    //   goldInternational: yup
    //     .string()
    //     .required("International gold certificate is required"),
    //   silverIndia: yup
    //     .string()
    //     .required("Silver certificate for India is required"),
    //   silverInternational: yup
    //     .string()
    //     .required("International silver certificate is required"),
    //   bronzeIndia: yup
    //     .string()
    //     .required("Bronze certificate for India is required"),
    //   bronzeInternational: yup
    //     .string()
    //     .required("TInternational bronze certificate is required")
    // }),
    courses: yup.lazy(val => {
      if (edit) {
        return yup.array();
      } else {
        return Array.isArray(val)
          ? yup
              .array()
              .of(yup.object())
              .min(1, "Select at least one course")
              .required("Select at least one course")
          : yup.string().required("Select at least one course");
      }
    })
  });

export const WEEKLY_CHALLENGE_QUESTION_VALIDATION = (contestEventType, edit) =>
  yup.object().shape({
    title: yup
      .string()
      .trim()
      .required("Title is required")
      .min(3, "Title should have at least 3 characters"),
    difficultyLevel: yup.string().required("Difficulty is required"),
    config: yup.lazy(val => {
      if (val === "" || val === undefined) {
        return yup.string().required("Config object is required");
      } else {
        return yup.object().shape({
          options: yup.lazy(val => {
            return Array.isArray(val)
              ? yup
                  .array()
                  .min(4)
                  .max(4)
                  .of(
                    yup.object().shape({
                      description: yup
                        .string()
                        .required("All options are necessary"),
                      isCorrect: yup.bool().required()
                    })
                  )
                  .test(
                    "correct_answer",
                    "One of the options should be correct",
                    answers => {
                      return answers.some(answer => answer.isCorrect);
                    }
                  )
              : yup.string().required("Select at least one course");
          }),
          description: yup.string().required("Description is required"),
          explanation: yup.string().required("Explanation is required")
        });
      }
    }),
    courses: yup.lazy(val => {
      if (edit) {
        return yup.array();
      } else {
        return Array.isArray(val)
          ? yup
              .array()
              .of(yup.object())
              .min(1, "Select at least one course")
              .required("Select at least one course")
          : yup.object().required("Select one course");
      }
    }),
    tags: yup.lazy(val => {
      if (!["gmc_challenge", "gmsa_challenge"].includes(contestEventType)) {
        return yup.array();
      } else {
        if (val === "" || val === undefined) {
          return yup.string().required("Tags is required");
        } else {
          return Array.isArray(val)
            ? yup
                .array()
                .of(yup.object())
                .min(1, "Select at least one tag")
                .required("Select at least one tag")
            : yup.string().required("Select at least one tag");
        }
      }
    })
  });

export const INTENT_FORM_VALIDATION_SCHEMA = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required(),
  platform: yup.string().required(),
  sourceView: yup
    .string()
    .trim()
    .required()
});

export const PLATFORM_FORM_VALIDATION_SCHEMA = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required()
});

export const CAMPAIGN_FORM_VALIDATION_SCHEMA = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required()
});

export const EFFECT_FORM_VALIDATION_SCHEMA = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required()
});

export const CF_DISPOSITION_VALIDATION_SCHEMA = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required()
});

export const CF_SUB_DISPOSITION_VALIDATION_SCHEMA = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required()
});

export const CALL_FILTER_VALIDATION_SCHEMA = yup.object().shape({
  platform: yup.string().nullable(),
  initiatorEmail: yup
    .string()
    .matches(EMAIL_REGEX, "Not a valid email")
    .nullable(),
  callIntentType: yup.string().nullable(),
  dispositionId: yup.string().nullable(),
  subDispositionId: yup.string().nullable()
});

export const ADD_CALL_DISPOSE_VALIDATION_SCHEMA = yup.object().shape({
  startDateTime: yup
    .date()
    .min(new Date(), "Date time must be greater than current time")
});

export const COMMUNITY_TAG_VALIDATION = yup.object().shape({
  tagName: yup
    .string()
    .trim()
    .required("Tag Name is required")
    .min(3, "Name should have at least 3 characters"),
  tagDescription: yup
    .string()
    .trim()
    .required("Tag Description is required")
    .min(3, "Tag Description should have at least 3 characters"),
  tagImage: yup.string().required("Image is required"),
  tagType: yup
    .string()
    .trim()
    .required("Type is required"),
  courseType: yup
    .string()
    .trim()
    .required("Type is required")
});

export const NOTIFICATION_CAMPAIGN_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Name is required"),
  headingText: yup
    .string()
    .required("Heading Text is required")
    .test("len", "Must be under 25 characters", (val = "") => val.length < 25),
  helpingText: yup
    .string()
    .required("Helping Text is required")
    .test(
      "len",
      "Must be under 150 characters",
      (val = "") => val.length < 150
    ),
  ctaText: yup
    .string()
    .test("len", "Must be under 20 characters", (val = "") => val.length < 20),
  ctaLink: yup
    .string()
    .trim()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Enter correct url!"
    )
  // 'rules.courses': yup.array()
  //     .of(yup.object())
  //     .min(1, "Select at least one Course")
  //     .required("Course Rules is required"),
  // 'rules.curriculum': yup.array()
  //     .of(yup.object())
  //     .min(1, "Select at least one Curriculum")
  //     .required("Curriculum is required"),
  // 'rules.batchType': yup.array()
  //     .of(yup.object())
  //     .min(1, "Select at least one Batch type")
  //     .required("Batch type is required"),
  // 'rules.country': yup.array()
  //     .of(yup.object())
  //     .min(1, "Select at least one Country")
  //     .required("Country is required"),
  // 'rules.brand': yup.array()
  //     .of(yup.object())
  //     .min(1, "Select at least one Brand")
  //     .required("Brand is required"),
});

export const RECURRING_CLASS_BOOKING_SCHEMA = () => {
  return yup.object().shape({
    numberOfWeeks: yup.string().required(),
    dayOfWeek: yup.string().required(),
    startTime: yup.string().required(),
    endTime: yup.string().nullable(),
    startDate: yup.date().required()
  });
};

export const RECURRING_SCHEDULAR_ADD_SCHEMA = () => {
  return yup.object().shape({
    startMinute: yup.string().required()
  });
};

export const ADD_MODULE_COURSE_MAP_SCHEMA = () => {
  return yup.object().shape({
    moduleName: yup
      .string()
      .trim()
      .required("Module Name is required"),
    moduleDescription: yup
      .string()
      .trim()
      .required("Module Description is required"),

    moduleCode: yup
      .string()
      .trim()
      .required("Module Shortname is required"),
    courseId: yup
      .string()
      .trim()
      .required("Course is required")
  });
};

export const ADD_MODULE_JOURNEY_MAP_SCHEMA = () => {
  return yup.object().shape({
    moduleId: yup
      .string()
      .trim()
      .required("Module is required"),
    classCount: yup
      .number()
      .min(0, "Class count cannot be negative")
      .integer()
  });
};

export const ADD_CLASS_TO_MODULE_SCHEMA = () => {
  return yup.object().shape({
    courseClassId: yup
      .string()
      .trim()
      .required("Class is required"),
    courseItemId: yup
      .string()
      .trim()
      .required("Course is required")
  });
};

export const ADD_JOURNEY_COURSE_SCHEMA = () => {
  return yup.object().shape({
    regions: yup.array().min(1, "Region is required"),
    courseItemId: yup
      .string()
      .trim()
      .required("Course is required"),
    name: yup
      .string()
      .trim()
      .required("Journey name is required"),
    shortCode: yup
      .string()
      .trim()
      .required("Journey Short code is required")
  });
};

export const ADD_STUDENT_JOURNEY_SCHEMA = () => {
  return yup.object().shape({
    learningJourneyId: yup.string().required("Learning Journey is required")
  });
};
export const STUDENT_LANGUAGE_SCHEMA = () => {
  return yup.object().shape({
    ...{
      defaultLang: yup.string().required("Language is required ")
    }
  });
};
export const EDIT_STUDENT_MODULE_SCHEMA = () => {
  return yup.object().shape({
    learningJourneyId: yup.string().required("Learning Journey is required"),
    newModuleId: yup.string().required("Module is required"),
    startClassNumber: yup.string().required("Start class is required"),
    courseModuleVersionId: yup.string().required("Module Version is required"),
    ncReasonCode: yup.string().required("Reason code is required")
  });
};
export const EDIT_STUDENT_MODULE_STATUS_SCHEMA = () => {
  return yup.object().shape({
    status: yup.string().required("Status is required"),
    ncReasonCode: yup.string().required("Reason code is required")
  });
};
export const ADD_STUDENT_MODULE_SCHEMA = () => {
  return yup.object().shape({
    learningJourneyId: yup.string().required("Learning Journey is required"),
    moduleId: yup.string().required("Module is required"),
    courseModuleVersionId: yup.string().required("Module Version is required")
  });
};
