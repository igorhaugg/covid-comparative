import { onSearch } from "../services/onSearch";
import { ValuesType } from "../types";

const valuesBaseline = {
  baselineFields: {
    continent: "Africa",
  },
  comparisonFields: {},
  selectedDate: "1",
  selectedMetrics: ["total_cases", "new_cases"],
  limit: 100,
} as ValuesType;

const valuesComparison = {
  baselineFields: {
    continent: "Africa",
  },
  comparisonFields: {
    continent: "Oceania",
  },
  selectedDate: "1",
  selectedMetrics: ["total_cases", "new_cases"],
  limit: 2,
} as ValuesType;

const metricsError = {
  baselineFields: {
    continent: "Africa",
  },
  comparisonFields: {
    continent: "Oceania",
  },
  selectedDate: "1",
  limit: 2,
} as ValuesType;

const baselineError = {
  comparisonFields: {
    continent: "Oceania",
  },
  selectedMetrics: ["total_cases", "new_cases"],
  selectedDate: "1",
  limit: 2,
} as ValuesType;

describe("onSearch", () => {
  it("throws error when no metrics selected", async () => {
    global.fetch = jest.fn().mockImplementationOnce(() => ({
      json: async () => undefined,
    }));
    await expect(onSearch(metricsError)).rejects.toThrow(
      "Please select a metric for the results"
    );
  });

  it("throws error when no baseline fields selected", async () => {
    global.fetch = jest.fn().mockImplementationOnce(() => ({
      json: async () => undefined,
    }));
    await expect(onSearch(baselineError)).rejects.toThrow(
      "Please select a baseline field (Continent or Country)"
    );
  });

  it("returns results for baseline search", async () => {
    global.fetch = jest.fn().mockImplementationOnce(() => ({
      json: async () => {
        return [
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
        ];
      },
    }));

    expect(await onSearch(valuesBaseline)).toEqual([
      ["Date", "Total cases", "New cases"],
      ["2023-01-01", 271217, 0],
      ["2023-01-01", 105095, 0],
    ]);
  });

  it("returns results for comparison search", async () => {
    global.fetch = jest.fn().mockImplementationOnce(() => ({
      json: async () => {
        return {
          dataset1: [
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
          dataset2: [
            {
              date: "2023-01-01",
              total_cases: "8285",
              new_cases: "0",
            },
            {
              date: "2023-01-01",
              total_cases: "10849817",
              new_cases: "64258",
            },
          ],
        };
      },
    }));

    expect(await onSearch(valuesComparison)).toEqual([
      [
        "Date",
        "Oceania - Total cases",
        "Oceania - New cases",
        "Africa - Total cases",
        "Africa - New cases",
      ],
      ["2023-01-01", 8285, 0, 271217, 0],
      ["2023-01-01", 10849817, 64258, 105095, 0],
    ]);
  });
});
