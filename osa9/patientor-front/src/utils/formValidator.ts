import { NewEntry } from "../types";

const isDate = (text: string): boolean => {
  return Boolean(Date.parse(text));
};

const formValidator = (values: NewEntry) => {
  const requiredError = "Field is required";
  const errors: { [field: string]: string } = {};
  if (!values.description) {
    errors.description = requiredError;
  }
  if (!values.date) {
    errors.date = requiredError;
  }
  if (!isDate(values.date)) {
    errors.date = "Check formatting!";
  }
  if (!values.specialist) {
    errors.specialist = requiredError;
  }
  if (values.type === "HealthCheck" && !values.healthCheckRating ) {
    errors.healthCheckRating = requiredError;
  }
  if (values.type === "Hospital" && !values.discharge.date) {
    errors.dischargeDate = requiredError;
  }
  if (values.type === "Hospital" && !isDate(values.discharge.date)) {
    errors.discharge = "Check discharge date formatting!";
  }
  if (values.type === "Hospital" && !values.discharge.criteria) {
    errors.discharge = requiredError;
  }
  if (values.type === "OccupationalHealthcare" && !values.employerName ) {
    errors.employerName = requiredError;
  }
  if (values.type === "OccupationalHealthcare" && values.sickLeave?.startDate && !isDate(values.sickLeave.startDate) ) {
    errors.sickLeave = "Check date formatting!";
  }
  if (values.type === "OccupationalHealthcare" && values.sickLeave?.endDate && !isDate(values.sickLeave.endDate)  ) {
    errors.sickLeave = "Check date formatting!";
  }
  return errors;
};

export default formValidator;