import type { RequestHandler } from "express";
import { asyncHandler } from "../../common/middleware/async-handler";
import { dashboardService } from "./dashboard.service";

export const dashboardController = {
  summary: asyncHandler(async (_req, res) => {
    const data = await dashboardService.getSummary();
    res.json({ data });
  }) as RequestHandler,
};
