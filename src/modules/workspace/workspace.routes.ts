import { Router } from "express";
import { z } from "zod";
import { asyncHandler } from "../../common/middleware/async-handler";
import { validate } from "../../common/middleware/validate";
import { workspaceService } from "./workspace.service";

export const workspaceRouter = Router();
workspaceRouter.get("/", asyncHandler(async (_req, res) => {
  res.json({ data: await workspaceService.getData() });
}));
workspaceRouter.put("/company", validate({ body: z.object({
  name: z.string().trim().min(1).max(160), industry: z.string().max(160),
  location: z.string().max(250), currency: z.string().length(3),
  registrationNumber: z.string().max(80), phone: z.string().max(50),
  email: z.string().email(), country: z.string().max(100), fiscalYear: z.string().max(100),
}) }), asyncHandler(async (req, res) => {
  res.json({ data: await workspaceService.updateCompany(req.body) });
}));
workspaceRouter.patch("/salaries/:id/paid", validate({
  params: z.object({ id: z.string().uuid() }),
  body: z.object({ paymentDate: z.string().date() }),
}), asyncHandler(async (req, res) => {
  res.json({ data: await workspaceService.markSalaryPaid(req.params.id, req.body.paymentDate) });
}));
