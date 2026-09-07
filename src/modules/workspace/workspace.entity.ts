import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { AppBaseEntity } from "../../common/entities/app-base.entity";
import { numericTransformer } from "../../common/transformers/numeric.transformer";
import { Employee } from "../employees/employee.entity";

const money = { precision: 14, scale: 2, transformer: numericTransformer };

@Entity("workspace_settings")
export class WorkspaceSettings extends AppBaseEntity {
  @Column({ type: "varchar", unique: true }) key!: string;
  @Column({ type: "jsonb" }) company!: {
    name: string; industry: string; location: string; currency: string;
    registrationNumber: string; phone: string; email: string; country: string; fiscalYear: string;
  };
  @Column({ type: "jsonb" }) currentUser!: {
    id: string; name: string; role: string; initials: string; email: string;
  };
  @Column({ type: "jsonb" }) approvalRules!: { label: string; roles: string[] }[];
  @Column({ type: "jsonb" }) paymentMethods!: { name: string; enabled: boolean }[];
}

@Entity("assets")
export class Asset extends AppBaseEntity {
  @Column({ type: "varchar", unique: true }) code!: string;
  @Column({ type: "varchar" }) name!: string;
  @Column({ type: "varchar" }) category!: string;
  @Column({ type: "date" }) purchaseDate!: string;
  @Column("numeric", money) cost!: number;
  @Column("numeric", money) value!: number;
  @Column({ type: "varchar" }) location!: string;
  @Column({ type: "varchar" }) assigned!: string;
  @Column({ type: "varchar" }) status!: string;
}

@Entity("liabilities")
export class Liability extends AppBaseEntity {
  @Column({ type: "varchar", unique: true }) name!: string;
  @Column({ type: "varchar" }) creditor!: string;
  @Column("numeric", money) original!: number;
  @Column("numeric", money) outstanding!: number;
  @Column({ type: "date" }) start!: string;
  @Column({ type: "date" }) due!: string;
  @Column({ type: "varchar" }) status!: string;
}

@Entity("capital_contributions")
export class CapitalContribution extends AppBaseEntity {
  @Column({ type: "varchar", unique: true }) reference!: string;
  @Column({ type: "varchar" }) owner!: string;
  @Column({ type: "varchar" }) type!: string;
  @Column("numeric", money) amount!: number;
  @Column({ type: "date" }) date!: string;
  @Column({ type: "text" }) notes!: string;
}

@Entity("budgets")
export class Budget extends AppBaseEntity {
  @Column({ type: "varchar", unique: true }) category!: string;
  @Column("numeric", money) budget!: number;
}

@Entity("salary_records")
export class SalaryRecord extends AppBaseEntity {
  @Column({ type: "varchar", unique: true }) code!: string;
  @ManyToOne(() => Employee, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "employee_id" }) employee!: Employee;
  @Column({ type: "date" }) period!: string;
  @Column("numeric", money) base!: number;
  @Column("numeric", money) allowance!: number;
  @Column("numeric", money) deduction!: number;
  @Column({ type: "varchar", default: "Pending" }) status!: "Paid" | "Pending";
  @Column({ type: "date", nullable: true }) paymentDate!: string | null;
}

@Entity("recurring_expenses")
export class RecurringExpense extends AppBaseEntity {
  @Column({ type: "varchar", unique: true }) code!: string;
  @Column({ type: "varchar" }) expense!: string;
  @Column("numeric", money) amount!: number;
  @Column({ type: "varchar" }) frequency!: string;
  @Column({ type: "date" }) nextDue!: string;
  @Column({ type: "varchar" }) category!: string;
  @Column({ type: "varchar" }) vendor!: string;
  @Column({ type: "varchar" }) status!: string;
}
