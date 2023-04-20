import { FilterType } from "../types";
import { validateFields } from "./validateFields";

describe("validateFields", () => {
  it("returns array of errors with date and metrics", () => {
    const data = { location: "string" };
    expect(validateFields(data)).toEqual([
      { message: "Please select a date" },
      { message: "Please select at least one metric" },
    ]);
  });
  it("returns array of errors with location and metrics", () => {
    const data = { date: "2023/01/01" };
    expect(validateFields(data)).toEqual([
      { message: "Please select a continent or a location" },
      { message: "Please select at least one metric" },
    ]);
  });
  it("returns array of errors with appended string", () => {
    const data = {};
    expect(validateFields(data, "dataset-test")).toEqual([
      { message: "Please select a continent or a location (dataset-test)" },
      { message: "Please select a date (dataset-test)" },
      { message: "Please select at least one metric (dataset-test)" },
    ]);
  });
  it("returns no errors", () => {
    const data: FilterType = {
      continent: "string",
      date: "2023/01/01",
      metrics: ["test"],
      limit: 100,
    };
    expect(validateFields(data)).toEqual([]);
  });
});
