import { DatasetType } from "../types";

export const generateComparisonResult = (
  dataset1: DatasetType[],
  dataset1Labels: string[],
  dataset2: DatasetType[],
  dataset2Labels: string[]
) => {
  const columns = Object.keys(dataset1?.[0] || {}).filter(
    (col) => col !== "date"
  );
  const result = dataset1.map((d: DatasetType, index: number) => {
    return [
      d.date,
      ...columns.map((col) => Number(d[col])),
      ...columns.map((col) => Number(dataset2?.[index]?.[col] || 0)),
    ];
  });
  if (!columns.length) {
    return [];
  }
  const header = ["Date", ...dataset1Labels, ...dataset2Labels];
  result.unshift(header);
  return result;
};
