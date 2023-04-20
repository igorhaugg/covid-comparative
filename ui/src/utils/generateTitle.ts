import { Fields } from "../types";

export const generateTitle = (
  baselineFields: Fields,
  comparisonFields: Fields
): string => {
  const locations = [];
  if (baselineFields.location) {
    locations.push(baselineFields.location);
  }
  if (baselineFields.continent) {
    locations.push(baselineFields.continent);
  }
  if (comparisonFields.location) {
    locations.push(comparisonFields.location);
  }
  if (comparisonFields.continent) {
    locations.push(comparisonFields.continent);
  }
  const prefix = `Results (${locations.join(", ")})`;
  return prefix;
};
