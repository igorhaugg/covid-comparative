import { generateBaselineResult } from "../utils/generateBaselineResult";

describe("generateBaselineResult", () => {
  const dataset = [
    { date: "2023-01-01", new_cases: "27", total_cases: "498001" },
    { date: "2023-01-01", new_cases: "0", total_cases: "105095" },
  ];
  it("returns generated results", () => {
    expect(generateBaselineResult(dataset)).toEqual([
      ["Date", "New cases", "Total cases"],
      ["2023-01-01", 27, 498001],
      ["2023-01-01", 0, 105095],
    ]);
  });
  it("returns empty array", () => {
    expect(generateBaselineResult([])).toEqual([]);
  });
});
