import { generateFilterOptions } from "../utils/generateFilterOptions";

describe("generateFilterOptions", () => {
  const data = [
    "Asia",
    "Oceania",
    "Europe",
    "Africa",
    "North America",
    "South America",
  ];
  it("returns generated results", () => {
    expect(generateFilterOptions(data)).toEqual([
      {
        label: "Asia",
        value: "Asia",
      },
      {
        label: "Oceania",
        value: "Oceania",
      },
      {
        label: "Europe",
        value: "Europe",
      },
      {
        label: "Africa",
        value: "Africa",
      },
      {
        label: "North America",
        value: "North America",
      },
      {
        label: "South America",
        value: "South America",
      },
    ]);
  });
  it("returns empty array", () => {
    expect(generateFilterOptions([])).toEqual([]);
  });
});
