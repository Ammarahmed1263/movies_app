import { emailRegex } from "../constants";
import * as yup from "yup";

const signupSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .matches(emailRegex, "Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm password is required"),
});

export default signupSchema;