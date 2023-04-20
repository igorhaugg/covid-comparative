import { FilterType, MetricsType } from "../types";

// Formats the data to be used for querying the database
export const generateFilters = (values: FilterType): MetricsType => {
  const { location, continent, metrics } = values;
  const filters: MetricsType = {};

  if (location) {
    filters.location = location;
  }
  if (continent) {
    filters.continent = continent;
  }
  if (metrics) {
    metrics.forEach((filter: string) => {
      filters[filter] = {
        not: null,
      };
    });
  }
  return filters;
};
