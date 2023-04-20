import { generateFilters } from "./generateFilters";

describe("generateFilters", () => {
  it("returns all filters", () => {
    const values = {
      location: "string",
      continent: "string",
      metrics: ["metric1", "metric2"],
    };
    expect(generateFilters(values)).toEqual({
      continent: "string",
      location: "string",
      metric1: { not: null },
      metric2: { not: null },
    });
  });
  it("returns metrics and continent", () => {
    const values = {
      continent: "string",
      metrics: ["metric1", "metric2"],
    };
    expect(generateFilters(values)).toEqual({
      continent: "string",
      metric1: { not: null },
      metric2: { not: null },
    });
  });
  it("returns location only", () => {
    const values = {
      location: "string",
    };
    expect(generateFilters(values)).toEqual({
      location: "string",
    });
  });
});
