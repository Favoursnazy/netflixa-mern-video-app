import * as yup from "yup";

//login validation
export const LoginValidation = yup.object().shape({
  email: yup.string().email().required("Email is required").trim(),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at less than 20 characters")
    .matches(/(?=.*[0-9])/, "password must contain a number"),
});

//register validation
export const RegisterValidations = yup.object().shape({
  email: yup.string().email().required("Email is required").trim(),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at less than 20 characters")
    .matches(/(?=.*[0-9])/, "password must contain a number"),
  fullName: yup
    .string()
    .required("Full name is required")
    .max(20, "Full name must not be more than 20 characters")
    .matches(/^[a-zA-Z ]*$/, "full name must contain a leters"),
});

//update user profile
export const ProfileValidation = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .max(20, "Full Name must be less than 20 characters")
    .matches(/^[a-zA-Z ]*$/, "full name must contain a leters"),
  email: yup.string().email().required("Email is required").trim(),
});

export const changePasswordValidation = yup.object().shape({
  oldPassword: yup
    .string()
    .required("oldPassword is required")
    .min(6, "oldPassword must be atleat 6 characters long")
    .max(20, "oldPassword must be atleat 20 characters long")
    .matches(/(?=.*[0-9])/, "oldPassword must contain a number"),
  newPassword: yup
    .string()
    .required("New Password is required")
    .min(6, "New Password must be atleat 6 characters long")
    .max(20, "New Password must be atleat 20 characters long")
    .matches(/(?=.*[0-9])/, "New Password must contain a number"),
  confirmPassword: yup
    .string()
    .required("confirmPassword is required")
    .min(6, "confirmPassword must be atleat 6 characters long")
    .max(20, "confirmPassword must be atleat 20 characters long")
    .matches(/(?=.*[0-9])/, "password must contain a number")
    .oneOf([yup.ref("newPassword"), null], "New Password do not match"),
});
