import { DatasetType } from "../types";

export const generateBaselineResult = (dataset: DatasetType[]) => {
  const columns = Object.keys(dataset?.[0] || {}).filter(
    (col) => col !== "date"
  );
  const result = dataset.map((d: DatasetType) => {
    return [d.date, ...columns.map((col) => Number(d[col]))];
  });
  if (!columns.length) {
    return [];
  }
  result.unshift([
    "Date",
    ...columns.map((col) => {
      return col
        .replace("_", " ")
        .replace(/(^|_)./g, (s) => s.slice(-1).toUpperCase());
    }),
  ]);
  return result;
};
