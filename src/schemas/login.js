import * as Yup from "yup";
import * as yup from "yup";
import { DIGIT_REGEX, EMAIL_REGEX } from "../helpers/regex";

export const initValues = {
  emailOrMobile: "",
  password: "",
  mobile: ""
};

export const validationSchema = Yup.object().shape({
  emailOrMobile: Yup.string("Enter a parent email or mobile")
    /* 
// ! Removing this as Few agents needs to test settings on stage
.test("whitehat email test", "Whitehatjr Emails are not allowed", email => {
      if (!email) return true;
      let idx = email.indexOf("@");
      if (idx !== -1) {
        let domain = email.substr(idx + 1);
        if (
          domain.toLowerCase().indexOf("whitehatjr") !== -1 &&
          domain.toLowerCase().indexOf("whitehatjrclass") === -1
        ) {
          return false;
        }
      }
      return true;
    }) */
    .required("This field is required."),
  mobile: yup.string().matches(DIGIT_REGEX, {
    message: "Only numeric values are allowed",
    excludeEmptyString: true
  }),
  password: Yup.string("Enter the password").required("This field is required.")
});

export const validationSchemaOTP = Yup.object().shape({
  password: Yup.string("Enter the password").required("This field is required.")
});
