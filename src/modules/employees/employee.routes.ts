import { Router } from "express";
import { validate } from "../../common/middleware/validate";
import { paginationQuerySchema } from "../../common/pagination";
import { uuidParamSchema } from "../../common/schemas/common.schemas";
import { employeeController } from "./employee.controller";
import { createEmployeeSchema, updateEmployeeSchema } from "./employee.schemas";

export const employeeRouter = Router();

employeeRouter.get("/", validate({ query: paginationQuerySchema }), employeeController.list);
employeeRouter.post("/", validate({ body: createEmployeeSchema }), employeeController.create);
employeeRouter.get("/:id", validate({ params: uuidParamSchema }), employeeController.get);
employeeRouter.patch(
  "/:id",
  validate({ params: uuidParamSchema, body: updateEmployeeSchema }),
  employeeController.update,
);
employeeRouter.delete("/:id", validate({ params: uuidParamSchema }), employeeController.remove);
