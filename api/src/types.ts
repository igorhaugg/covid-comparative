export type FilterType = {
  location?: string;
  continent?: string;
  date?: string;
  limit?: number;
  metrics?: string[];
};

export type MetricsType = {
  [key: string]: string | { not: null } | boolean;
};
