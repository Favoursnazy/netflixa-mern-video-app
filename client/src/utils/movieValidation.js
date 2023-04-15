import * as yup from "yup";

export const ReviewValidation = yup.object().shape({
  comment: yup
    .string()
    .required("Comment is required")
    .max(150, "Comment should be less than 150 charcters"),
  rating: yup.number().required("Rating is required"),
});

export const movieValidation = yup.object().shape({
  title: yup
    .string()
    .required("please enter a movie title")
    .max(50, "Movie name should be less than 50 characters"),
  time: yup.number("Number required").required("Please enter a movie duration"),
  language: yup.string().required("Please enter a movie language"),
  category: yup.string().required("Please select a movie category"),
  year: yup
    .number("Number required")
    .required("Please select a movie release year")
    .min(4, "Not more than four digits is required"),
  desc: yup
    .string()
    .required("Please select a movie description")
    .max(500, "Movie description should be less than 300 characters"),
});

export const castsValidation = yup.object().shape({
  name: yup.string().required("Cast name is required"),
});
