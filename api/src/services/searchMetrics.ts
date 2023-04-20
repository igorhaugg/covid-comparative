import { Request, Response } from "express";
import { format, sub } from "date-fns";

import prisma from "../client";
import { MetricsType } from "../types";
import { generateFilters } from "../utils/generateFilters";
import { validateFields } from "../utils/validateFields";

/* 
  Endpoint /api/metrics
  Search on "metrics" column
  Returns a single query result
*/
export const searchMetrics = async (req: Request, res: Response) => {
  const errors = validateFields(req.body);

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  const { date, metrics, limit } = req.body;
  const filters = generateFilters(req.body);

  // Filters date by 1|2|3|5 years
  const selectedDate = format(
    sub(new Date(), {
      years: Number(date),
    }),
    "yyyy/MM/dd"
  );

  // Adds all selected metrics to "select", to make sure they are being returned
  const mappedMetrics: MetricsType = {};
  metrics.forEach((filter: string) => {
    mappedMetrics[filter] = true;
  });

  const result = await prisma.metrics.findMany({
    take: limit,
    where: {
      ...filters,
      date: {
        gte: selectedDate,
      },
    },
    orderBy: [{ date: "asc" }],
    select: {
      date: true,
      ...mappedMetrics,
    },
  });
  res.status(200).json(result);
};
