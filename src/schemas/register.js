import * as Yup from "yup";

export const initValues = {
  email: "",
  parentName: "",
  mobile: "",
  studentName: "",
  grade: "",
  isLaptop: "",
  countryDialCode: ""
};

export const validationSchema = Yup.object().shape({
  email: Yup.string("Enter a parent email")
    .required("Parent's Email is required")
    .email("Enter a valid email"),
  parentName: Yup.string("Enter the parent's name").required(
    "Parent's Name is required"
  ),
  mobile: Yup.string("Enter the Parent's Mobile")
    .required("Parent's Mobile is required")
    .matches(/^\d{10}$/, {
      message: "Please enter a mobile no of 10 digits",
      excludeEmptyString: false
    }),
  studentName: Yup.string("Enter the kid's name").required(
    "Kid's Name is required"
  ),
  grade: Yup.number("Select the kid's grade")
    .required("Kid's Grade is required")
    .notOneOf([0], "Kid's Grade is required"),
  countryDialCode: Yup.string("Select the Country Code")
    .required("Country Code is required to send otp")
    .notOneOf([0], "Country Code is required to send OTP"),
  isLaptop: Yup.string("Enter your password").required("Confirm your password")
});
