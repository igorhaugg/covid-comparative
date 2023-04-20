import { generateLabels } from "../utils/generateLabels";

describe("generateLabels", () => {
  const data = {
    continent: "Asia",
    location: "",
    selectedMetrics: ["total_cases", "new_cases"],
  };
  it("returns generated results", () => {
    expect(
      generateLabels(data.continent, data.location, data.selectedMetrics)
    ).toEqual(["Asia - Total cases", "Asia - New cases"]);
  });
  it("returns empty array if no prefix", () => {
    expect(generateLabels("", "", ["total_cases", "new_cases"])).toEqual([]);
  });
  it("returns empty array if no metrics", () => {
    expect(generateLabels("", "location", [])).toEqual([]);
  });
});
