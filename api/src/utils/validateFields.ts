import { FilterType } from "../types";

// Validates the fields coming from req.body
export const validateFields = (data: FilterType, appendString?: string) => {
  const errors = [];
  // Either continent or location is mandatory
  if (!data.continent && !data.location) {
    errors.push({
      message: `Please select a continent or a location${
        appendString ? ` (${appendString})` : ""
      }`,
    });
  }
  // Date is required
  if (!data.date) {
    errors.push({
      message: `Please select a date${
        appendString ? ` (${appendString})` : ""
      }`,
    });
  }
  // The query should have at least one metric
  if (!data.metrics) {
    errors.push({
      message: `Please select at least one metric${
        appendString ? ` (${appendString})` : ""
      }`,
    });
  }
  return errors;
};
