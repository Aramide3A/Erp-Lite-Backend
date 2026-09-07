import { Router } from "express";
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

router.use("/accounts", accountRouter);
router.use("/audit-logs", auditLogRouter);
router.use("/dashboard", dashboardRouter);
router.use("/employees", employeeRouter);
router.use("/financial-records", financialRecordRouter);
router.use("/journal-entries", journalEntryRouter);
router.use("/payments", paymentRouter);
router.use("/requests", requestRouter);
router.use("/vendors", vendorRouter);
router.use("/workspace", workspaceRouter);
