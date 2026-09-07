import { ILike } from "typeorm";
import { NotFoundError } from "../../common/errors/app-error";
import type { PaginationQuery } from "../../common/pagination";
import { toPaginationMeta } from "../../common/pagination";
import { AppDataSource } from "../../config/data-source";
import { Employee } from "./employee.entity";
import type { CreateEmployeeInput, UpdateEmployeeInput } from "./employee.schemas";

const employeeRepository = () => AppDataSource.getRepository(Employee);

export const employeeService = {
  async findAll(query: PaginationQuery) {
    const where = query.search
      ? [
          { name: ILike(`%${query.search}%`) },
          { department: ILike(`%${query.search}%`) },
          { position: ILike(`%${query.search}%`) },
        ]
      : undefined;

    const [data, total] = await employeeRepository().findAndCount({
      where,
      order: { createdAt: "DESC" },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });

    return { data, meta: toPaginationMeta(query.page, query.limit, total) };
  },

  async findOne(id: string) {
    const employee = await employeeRepository().findOneBy({ id });

    if (!employee) {
      throw new NotFoundError("Employee");
    }

    return employee;
  },

  async create(input: CreateEmployeeInput) {
    const employee = employeeRepository().create(input);
    return employeeRepository().save(employee);
  },

  async update(id: string, input: UpdateEmployeeInput) {
    const employee = await this.findOne(id);
    employeeRepository().merge(employee, input);
    return employeeRepository().save(employee);
  },

  async remove(id: string) {
    const employee = await this.findOne(id);
    await employeeRepository().remove(employee);
  },
};
