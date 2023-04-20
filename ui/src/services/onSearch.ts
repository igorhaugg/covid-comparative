import { ValuesType } from "../types";
import { generateLabels } from "../utils/generateLabels";
import { generateComparisonResult } from "../utils/generateComparisonResult";
import { generateBaselineResult } from "../utils/generateBaselineResult";

const HEADERS = {
  "content-type": "application/json",
} as const;

export const onSearch = async (
  values: ValuesType
): Promise<string[] | (string | number)[][]> => {
  // Uses a different URL if comparison fields were provided
  const isComparison = Object.keys(values?.comparisonFields || {}).length > 0;
  const url = isComparison ? "api/compare" : "api/metrics";

  const options = {
    method: "POST",
    body: isComparison
      ? JSON.stringify({
          dataset1: values.baselineFields,
          dataset2: values.comparisonFields,
          date: values.selectedDate,
          metrics: values.selectedMetrics,
          limit: values.limit,
        })
      : JSON.stringify({
          ...values.baselineFields,
          date: values.selectedDate,
          metrics: values.selectedMetrics,
          limit: values.limit,
        }),
    headers: HEADERS,
  };

  if (!values.selectedMetrics?.length) {
    throw Error("Please select a metric for the results");
  }

  if (Object.keys(values.baselineFields || {}).length === 0) {
    throw Error("Please select a baseline field (Continent or Country)");
  }

  const response = await fetch(url, options);
  const parsedData = await response.json();

  // In the comparison result, there are multiple datasets
  // the Chart data looks like ['Date', number, number]
  if (isComparison) {
    const baselineResult = parsedData.dataset1;
    const comparisonResult = parsedData.dataset2;
    let dataset1;
    let dataset2;
    let dataset1Label;
    let dataset2Label;

    if (baselineResult.length > comparisonResult.length) {
      dataset1 = baselineResult;
      dataset2 = comparisonResult;
      dataset1Label = generateLabels(
        values.baselineFields.continent,
        values.baselineFields.location,
        values.selectedMetrics
      );
      dataset2Label = generateLabels(
        values.comparisonFields.continent,
        values.comparisonFields.location,
        values.selectedMetrics
      );
    } else {
      dataset1 = comparisonResult;
      dataset2 = baselineResult;
      dataset1Label = generateLabels(
        values.comparisonFields.continent,
        values.comparisonFields.location,
        values.selectedMetrics
      );
      dataset2Label = generateLabels(
        values.baselineFields.continent,
        values.baselineFields.location,
        values.selectedMetrics
      );
    }

    return generateComparisonResult(
      dataset1,
      dataset1Label,
      dataset2,
      dataset2Label
    );
  }

  // The baseline only returns ['Date', ...columns]
  return generateBaselineResult(parsedData);
};
