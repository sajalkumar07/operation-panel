export const SUB_ACTIONS = {
  RESCHEDULE_TRIAL: {
    common: [
      {
        key: "STUDENT_BUSY_SCHOOL_WORK",
        label: "Student Busy with school work"
      },
      { key: "STUDENT_TRAVEL", label: "Student travelling" },
      { key: "PARENT_TRAVEL", label: "Parent Travelling" },
      { key: "STUDENT_BUSY_SPORTS", label: "Student busy with Sports" },
      { key: "PARENT_BUSY", label: "Parent Busy" },
      {
        key: "STUDENT_BUSY_OTHERS",
        label: "Student Busy with other Activities"
      },
      { key: "OTHERS", label: "Others" }
    ]
  },
  STUDENT_ABSENT: {
    common: [
      {
        key: "STUDENT_BUSY_SCHOOL_WORK",
        label: "Student busy with School work"
      },
      { key: "STUDENT_UNAVAILABLE", label: "Exams/School function/ Holiday" },
      { key: "STUDENT_TRAVEL", label: "Student travelling" },
      { key: "PARENT_TRAVEL", label: "Parent Travelling" },
      { key: "STUDENT_BUSY_SPORTS", label: "Student busy with Sports" },
      { key: "PARENT_BUSY", label: "Parent Busy" },
      { key: "OTHERS", label: "Others" }
    ],
    cancelled: [
      { key: "PARENT_NOT_INTERESTED", label: "Parent not Interested" },
      { key: "STUDENT_NOT_INTERESTED", label: "Student not Interested" },
      {
        key: "INTERESTED_IN_ANOTHER_PLATFORM",
        label: "Interested in another Platform"
      }
    ],
    not_completed: [
      { key: "STUDENT_BUSY_OTHERS", label: "Studen busy in other activities" }
    ]
  },
  STUDENT_TECH_ISSUE: {
    common: [
      { key: "STUDENT_INTERNET_ISSUE", label: "Student Internet Issue" },
      { key: "LANGUAGE_BARRIER", label: "Language Barrier" },
      { key: "STUDENT_MISMATCHED", label: "Student Mismatched" },

      { key: "STUDENT_SYSTEM_ISSUE", label: "Student System Issue" },
      { key: "STUDENT_POWER_ISSUE", label: "Student Power Issue" },
      { key: "OTHERS", label: "Others" }
    ],
    cancelled: [
      { key: "STUDENT_SYSTEM_UNAVAILABLE", label: "Student System unavailable" }
    ],
    not_completed: [
      {
        key: "STUDENT_BROWSER_SERVER_ISSUE",
        label: "Student Browser or server Issue"
      }
    ]
  },
  TEACHER_ABSENT: {
    common: [
      { key: "TEACHER_BUSY_OTHER_JOB", label: "Teacher busy with other job" },
      { key: "TEACHER_TRAVEL", label: "Teacher travelling" },
      { key: "TEACHER_URGENT_WORK", label: "Teacher urgent work" },
      { key: "TEACHER_NOT_INTERESTED", label: "Teacher not Interested" },
      { key: "TEACHER_SICK", label: "Teacher Sick" },
      { key: "OTHERS", label: "Others" }
    ]
  },
  TEACHER_TECH_ISSUE: {
    common: [
      { key: "TEACHER_INTERNET_ISSUE", label: "Teacher Internet Issue" },
      { key: "TIME_TABLE_MISMATCH", label: "Time table mismatch" },
      {
        key: "TEACHER_BROWSER_SERVER_ISSUE",
        label: "Teacher Browser Server Issue"
      },
      { key: "TEACHER_SYSTEM_ISSUE", label: "Teacher System Issue" },
      { key: "TEACHER_POWER_ISSUE", label: "Teacher power Issue" },
      { key: "OTHERS", label: "Others" }
    ]
  }
};
