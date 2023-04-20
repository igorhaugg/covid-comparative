export const generateFilterOptions = (
  data: string[]
): { label: string; value: string }[] => {
  const options = data.map((d) => ({
    label: d,
    value: d,
  }));
  return options;
};
