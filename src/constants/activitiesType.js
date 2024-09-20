export const STUDENT_TYPE = "student_activity";
export const TEACHER_TYPE = "teacher_activity";

export const activityType = [
  { label: "Student", key: "1" },
  { label: "Teacher", key: "2" },
  { label: "LMS", key: "3" }
];

export const lmsType = ["LMS"];
export const nonLmsType = [
  "TA",
  "SA",
  "AA1",
  "AA2",
  "AA3",
  "CA",
  "WRAP_UP",
  "CAPSTONE"
];

export const activityNameTypeList = {
  MATH: [...nonLmsType, ...lmsType],
  ENGLISH: [...nonLmsType, ...lmsType]
};

export const defaultParams = [
  "TA=true",
  "layout=landscape",
  "BFS=true",
  "w=688&h=1138",
  "w=880&h=1035",
  "w=1200&h=900",
  "w=1250&h=650",
  "bw=2023&bh=1138&sw=690&sh=1138"
];

export const activitySkillType = [
  {
    key: "LOGIC",
    value: "Logic",
    courseType: "CODING",
    activityNameType: []
  },
  {
    key: "CREATIVITY",
    value: "Creativity",
    courseType: "CODING",
    activityNameType: []
  },
  {
    key: "LOGIC",
    value: "Logic",
    courseType: "MATH",
    activityNameType: [
      "TA",
      "SA",
      "AA1",
      "AA2",
      "AA3",
      "CA",
      "WRAP_UP",
      "CAPSTONE"
    ]
  },
  {
    key: "CREATIVITY",
    value: "Creativity",
    courseType: "MATH",
    activityNameType: [
      "TA",
      "SA",
      "AA1",
      "AA2",
      "AA3",
      "CA",
      "WRAP_UP",
      "CAPSTONE"
    ]
  },
  {
    key: "LMS-Traceable",
    value: "LMS-Traceable",
    courseType: "MATH",
    activityNameType: ["LMS"]
  },
  {
    key: "LMS-NonTraceable",
    value: "LMS-NonTraceable",
    courseType: "MATH",
    activityNameType: ["LMS"]
  },
  {
    key: "LMS-Quiz",
    value: "LMS-Quiz",
    courseType: "MATH",
    activityNameType: ["LMS"]
  },
  {
    key: "MUSIC_AUDIO",
    value: "MUSIC_AUDIO",
    courseType: "MUSIC",
    activityNameType: ""
  },
  {
    key: "MUSIC_APPLETS",
    value: "MUSIC_APPLETS",
    courseType: "MUSIC",
    activityNameType: ""
  },
  {
    key: "MUSIC_VIDEO",
    value: "MUSIC_VIDEO",
    courseType: "MUSIC",
    activityNameType: ""
  },
  {
    key: "MUSIC_MUSESCORE",
    value: "MUSIC_MUSESCORE",
    courseType: "MUSIC",
    activityNameType: ""
  },
  {
    key: "MUSIC_SHEET_ACTIVITY",
    value: "MUSIC_SHEET_ACTIVITY",
    courseType: "MUSIC",
    activityNameType: ""
  },
  {
    key: "MUSIC_MUSICQUEST",
    value: "MUSIC_MUSICQUEST",
    courseType: "MUSIC",
    activityNameType: ""
  },
  {
    key: "WARM_UP",
    value: "WARM_UP",
    courseType: "ENGLISH",
    activityNameType: [
      "TA",
      "SA",
      "AA1",
      "AA2",
      "AA3",
      "CA",
      "WRAP_UP",
      "CAPSTONE"
    ]
  },
  {
    key: "ENGLISH_APPLETS",
    value: "ENGLISH_APPLETS",
    courseType: "ENGLISH",
    activityNameType: [
      "TA",
      "SA",
      "AA1",
      "AA2",
      "AA3",
      "CA",
      "WRAP_UP",
      "CAPSTONE"
    ]
  },
  {
    key: "WRAP_UP",
    value: "WRAP_UP",
    courseType: "ENGLISH",
    activityNameType: [
      "TA",
      "SA",
      "AA1",
      "AA2",
      "AA3",
      "CA",
      "WRAP_UP",
      "CAPSTONE"
    ]
  },
  {
    key: "TEACHER_ACTIVITY",
    value: "TEACHER_ACTIVITY",
    courseType: "ENGLISH",
    activityNameType: [
      "TA",
      "SA",
      "AA1",
      "AA2",
      "AA3",
      "CA",
      "WRAP_UP",
      "CAPSTONE"
    ]
  },
  {
    key: "MUSIC_SLIDES_ACTIVITY",
    value: "MUSIC_SLIDES_ACTIVITY",
    courseType: "MUSIC",
    activityNameType: ""
  },
  {
    key: "MUSIC_DUMMY_ACTIVITY",
    value: "MUSIC_DUMMY_ACTIVITY",
    courseType: "MUSIC",
    activityNameType: ""
  },
  {
    key: "MUSIC_AUDIO",
    value: "MUSIC_AUDIO",
    courseType: "MUSIC_FOR_ALL",
    activityNameType: ""
  },
  {
    key: "MUSIC_APPLETS",
    value: "MUSIC_APPLETS",
    courseType: "MUSIC_FOR_ALL",
    activityNameType: ""
  },
  {
    key: "MUSIC_VIDEO",
    value: "MUSIC_VIDEO",
    courseType: "MUSIC_FOR_ALL",
    activityNameType: ""
  },
  {
    key: "MUSIC_MUSESCORE",
    value: "MUSIC_MUSESCORE",
    courseType: "MUSIC_FOR_ALL",
    activityNameType: ""
  },
  {
    key: "MUSIC_SHEET_ACTIVITY",
    value: "MUSIC_SHEET_ACTIVITY",
    courseType: "MUSIC_FOR_ALL",
    activityNameType: ""
  },
  {
    key: "MUSIC_MUSICQUEST",
    value: "MUSIC_MUSICQUEST",
    courseType: "MUSIC_FOR_ALL",
    activityNameType: ""
  },
  {
    key: "MUSIC_SLIDES_ACTIVITY",
    value: "MUSIC_SLIDES_ACTIVITY",
    courseType: "MUSIC_FOR_ALL",
    activityNameType: ""
  },
  {
    key: "MUSIC_DUMMY_ACTIVITY",
    value: "MUSIC_DUMMY_ACTIVITY",
    courseType: "MUSIC_FOR_ALL",
    activityNameType: ""
  },
  {
    key: "LOGIC",
    value: "LOGIC",
    courseType: "B2B_CODING",
    activityNameType: ""
  },
  {
    key: "CREATIVITY",
    value: "CREATIVITY",
    courseType: "B2B_CODING",
    activityNameType: ""
  }
];
