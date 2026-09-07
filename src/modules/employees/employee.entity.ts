import { Column, Entity, Index } from "typeorm";
import { AppBaseEntity } from "../../common/entities/app-base.entity";
import { numericTransformer } from "../../common/transformers/numeric.transformer";

export enum EmployeeStatus {
  Active = "Active",
  OnLeave = "On Leave",
  Inactive = "Inactive",
}

@Entity({ name: "employees" })
export class Employee extends AppBaseEntity {
  @Index({ unique: true })
  @Column({ name: "employee_code", type: "varchar", length: 30 })
  employeeCode!: string;

  @Column({ type: "varchar", length: 150 })
  name!: string;

  @Column({ type: "varchar", length: 10 })
  initials!: string;

  @Column({ type: "varchar", length: 100 })
  department!: string;

  @Column({ type: "varchar", length: 120 })
  position!: string;

  @Column("numeric", { precision: 14, scale: 2, transformer: numericTransformer })
  salary!: number;

  @Column({ type: "enum", enum: EmployeeStatus, default: EmployeeStatus.Active })
  status!: EmployeeStatus;

  @Column({ name: "joined_at", type: "date" })
  joinedAt!: Date;
}
