import moment from "moment";

export const shortUpperCaseId = (id) => {
  return id.slice(0, 8).toUpperCase();
};

export const DateFormat = (date) => {
  return moment(date).format("LL");
};
