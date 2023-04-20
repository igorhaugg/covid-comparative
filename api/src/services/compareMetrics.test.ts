import { Request, Response } from "express";

import { compareMetrics } from "./compareMetrics";

const metrics = [
  { date: "2023-01-01", total_cases: 332794 },
  { date: "2023-01-01", total_cases: 47751 },
];

jest.mock("../client", () => ({
  metrics: {
    findMany: () => metrics,
  },
}));

const mockRequest = {
  body: {
    dataset1: { continent: "Europe" },
    dataset2: { continent: "North America" },
    date: "1",
    metrics: ["total_cases"],
    limit: 100,
  },
} as Request;

const mockRequestError = {
  body: {
    dataset1: {},
    dataset2: {},
    date: "1",
    metrics: ["total_cases"],
    limit: 100,
  },
} as Request;

const mockResponse = {} as unknown as Response;
mockResponse.json = jest.fn();
mockResponse.status = jest.fn(() => mockResponse);

describe("compareMetrics", () => {
  it("returns metrics", async () => {
    await compareMetrics(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledWith({
      dataset1: [
        { date: "2023-01-01", total_cases: 332794 },
        { date: "2023-01-01", total_cases: 47751 },
      ],
      dataset2: [
        { date: "2023-01-01", total_cases: 332794 },
        { date: "2023-01-01", total_cases: 47751 },
      ],
    });
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });
  it("fails on validation", async () => {
    await compareMetrics(mockRequestError, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledWith({
      errors: [
        { message: "Please select a continent or a location (dataset1)" },
        { message: "Please select a continent or a location (dataset2)" },
      ],
    });
    expect(mockResponse.status).toHaveBeenCalledWith(400);
  });
});
