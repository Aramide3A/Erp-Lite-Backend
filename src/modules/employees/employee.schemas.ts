import { z } from "zod";
import { EmployeeStatus } from "./employee.entity";

export const createEmployeeSchema = z.object({
  employeeCode: z.string().trim().min(1).max(30),
  name: z.string().trim().min(1).max(150),
  initials: z.string().trim().min(1).max(10),
  department: z.string().trim().min(1).max(100),
  position: z.string().trim().min(1).max(120),
  salary: z.coerce.number().nonnegative(),
  status: z.nativeEnum(EmployeeStatus).default(EmployeeStatus.Active),
  joinedAt: z.coerce.date(),
});

export const updateEmployeeSchema = createEmployeeSchema.partial();

export type CreateEmployeeInput = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeInput = z.infer<typeof updateEmployeeSchema>;
