import { Request, Response } from "express";
import { format, sub } from "date-fns";

import prisma from "../client";
import { MetricsType } from "../types";
import { generateFilters } from "../utils/generateFilters";
import { validateFields } from "../utils/validateFields";

/* 
  Endpoint /api/compare
  Search on "metrics" column
  Returns 2 query results to be compared
*/
export const compareMetrics = async (req: Request, res: Response) => {
  const { date, metrics, limit } = req.body;
  const dataset1Filters = generateFilters(req.body.dataset1);
  const dataset2Filters = generateFilters(req.body.dataset2);

  const errorsDataset1 = validateFields(
    { ...dataset1Filters, date, metrics },
    "dataset1"
  );
  const errorsDataset2 = validateFields(
    { ...dataset2Filters, date, metrics },
    "dataset2"
  );
  if (errorsDataset1.length > 0 || errorsDataset2.length > 0) {
    return res
      .status(400)
      .json({ errors: [...errorsDataset1, ...errorsDataset2] });
  }

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

  const dataset1 = await prisma.metrics.findMany({
    take: limit,
    where: {
      ...dataset1Filters,
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

  const dataset2 = await prisma.metrics.findMany({
    take: limit,
    where: {
      ...dataset2Filters,
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

  res.status(200).json({ dataset1, dataset2 });
};
