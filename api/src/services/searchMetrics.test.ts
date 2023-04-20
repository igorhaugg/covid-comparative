import { Request, Response } from "express";

import { searchMetrics } from "./searchMetrics";

const metrics = [
  { date: "2023-01-01", total_cases: 332794, new_cases: 26 },
  { date: "2023-01-01", total_cases: 47751, new_cases: 0 },
];

jest.mock("../client", () => ({
  metrics: {
    findMany: () => metrics,
  },
}));

const mockRequest = {
  body: {
    continent: "continent",
    location: "location",
    date: "2022/01/01",
    metrics: ["total_cases", "new_cases"],
  },
} as Request;

const mockRequestError = {
  body: {
    continent: "continent",
    location: "location",
    date: "2022/01/01",
  },
} as Request;

const mockResponse = {} as unknown as Response;
mockResponse.json = jest.fn();
mockResponse.status = jest.fn(() => mockResponse);

describe("searchMetrics", () => {
  it("returns metrics", async () => {
    await searchMetrics(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledWith(metrics);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });
  it("fails on validation", async () => {
    await searchMetrics(mockRequestError, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
  });
});
