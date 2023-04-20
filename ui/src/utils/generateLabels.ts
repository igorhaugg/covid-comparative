export const generateLabels = (
  continent?: string,
  location?: string,
  selectedMetrics?: string[] | []
): string[] | [] => {
  const prefix = continent || location;
  if (!prefix) {
    return [];
  }
  if (!selectedMetrics) {
    return [];
  }
  return selectedMetrics.map((metric) => {
    return `${prefix} - ${metric
      .replace("_", " ")
      .replace(/(^|_)./g, (s) => s.slice(-1).toUpperCase())}`;
  });
};
