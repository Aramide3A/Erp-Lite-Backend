import { ILike } from "typeorm";
import { NotFoundError } from "../../common/errors/app-error";
import type { PaginationQuery } from "../../common/pagination";
import { toPaginationMeta } from "../../common/pagination";
import { AppDataSource } from "../../config/data-source";
import { Vendor } from "./vendor.entity";
import type { CreateVendorInput, UpdateVendorInput } from "./vendor.schemas";

const vendorRepository = () => AppDataSource.getRepository(Vendor);

export const vendorService = {
  async findAll(query: PaginationQuery) {
    const where = query.search
      ? [
          { name: ILike(`%${query.search}%`) },
          { category: ILike(`%${query.search}%`) },
          { contact: ILike(`%${query.search}%`) },
        ]
      : undefined;

    const [data, total] = await vendorRepository().findAndCount({
      where,
      order: { createdAt: "DESC" },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });

    return { data, meta: toPaginationMeta(query.page, query.limit, total) };
  },

  async findOne(id: string) {
    const vendor = await vendorRepository().findOneBy({ id });

    if (!vendor) {
      throw new NotFoundError("Vendor");
    }

    return vendor;
  },

  async create(input: CreateVendorInput) {
    const vendor = vendorRepository().create(input);
    return vendorRepository().save(vendor);
  },

  async update(id: string, input: UpdateVendorInput) {
    const vendor = await this.findOne(id);
    vendorRepository().merge(vendor, input);
    return vendorRepository().save(vendor);
  },

  async remove(id: string) {
    const vendor = await this.findOne(id);
    await vendorRepository().remove(vendor);
  },
};
