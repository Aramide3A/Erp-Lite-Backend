import { Router } from "express";
import { authRouter } from "./modules/auth/auth.routes";
import { requireAuth, requirePermission } from "./modules/auth/auth.middleware";
import { permissionRouter, roleRouter, userRouter } from "./modules/auth/rbac.routes";
import { accountRouter } from "./modules/accounting/account.routes";
import { journalEntryRouter } from "./modules/accounting/journal-entry.routes";
import { auditLogRouter } from "./modules/audit/audit-log.routes";
import { dashboardRouter } from "./modules/dashboard/dashboard.routes";
import { employeeRouter } from "./modules/employees/employee.routes";
import { financialRecordRouter } from "./modules/financial-records/financial-record.routes";
import { paymentRouter } from "./modules/payments/payment.routes";
import { requestRouter } from "./modules/requests/request.routes";
import { vendorRouter } from "./modules/vendors/vendor.routes";

import { workspaceRouter } from "./modules/workspace/workspace.routes";

export const router = Router();

router.use("/auth", authRouter);
router.use(requireAuth);
router.use("/permissions", permissionRouter);
router.use("/roles", roleRouter);
router.use("/users", userRouter);
router.use("/accounts", requirePermission("accounting", "view"), accountRouter);
router.use("/audit-logs", requirePermission("audit-log", "view"), auditLogRouter);
router.use("/dashboard", requirePermission("dashboard", "view"), dashboardRouter);
router.use("/employees", requirePermission("employees", "view"), employeeRouter);
router.use("/financial-records", financialRecordRouter);
router.use("/journal-entries", requirePermission("accounting", "view"), journalEntryRouter);
router.use("/payments", requirePermission("payments", "view"), paymentRouter);
router.use("/requests", requirePermission("requests", "view"), requestRouter);
router.use("/vendors", requirePermission("vendors", "view"), vendorRouter);
router.use("/workspace", workspaceRouter);
