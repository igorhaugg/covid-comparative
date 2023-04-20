export type Fields = {
  continent?: string;
  location?: string;
};

export type ValuesType = {
  baselineFields: Fields;
  comparisonFields: Fields;
  selectedDate: string;
  selectedMetrics: string[];
  limit: number;
};

export type FormUpdate = {
  field: string;
  value: string | string[] | number;
  type: string;
};

export enum FieldsType {
  BASELINE = "BASELINE",
  COMPARISON = "COMPARISON",
  METRICS = "METRICS",
  DATE = "DATE",
  LIMIT = "LIMIT",
}

export type DatasetType = {
  [key: string]: string;
};
