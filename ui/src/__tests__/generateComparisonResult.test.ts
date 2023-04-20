import { generateComparisonResult } from "../utils/generateComparisonResult";

describe("generateBaselineResult", () => {
  const datasets = {
    dataset1: [
      {
        date: "2023-01-01",
        total_cases: "207579",
        new_cases: "25",
      },
      {
        date: "2023-01-01",
        total_cases: "445620",
        new_cases: "0",
      },
    ],
    dataset1Labels: ["Asia - Total cases", "Asia - New cases"],
    dataset2: [
      {
        date: "2023-01-01",
        total_cases: "271217",
        new_cases: "0",
      },
      {
        date: "2023-01-01",
        total_cases: "105095",
        new_cases: "0",
      },
    ],
    dataset2Labels: ["Africa - Total cases", "Africa - New cases"],
  };

  it("returns generated results", () => {
    expect(
      generateComparisonResult(
        datasets.dataset1,
        datasets.dataset1Labels,
        datasets.dataset2,
        datasets.dataset2Labels
      )
    ).toEqual([
      [
        "Date",
        "Asia - Total cases",
        "Asia - New cases",
        "Africa - Total cases",
        "Africa - New cases",
      ],
      ["2023-01-01", 207579, 25, 271217, 0],
      ["2023-01-01", 445620, 0, 105095, 0],
    ]);
  });
  it("returns empty array", () => {
    expect(generateComparisonResult([], [], [], [])).toEqual([]);
  });
});
