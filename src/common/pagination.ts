import { z } from "zod";

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  search: z.string().trim().optional(),
});

export type PaginationQuery = z.infer<typeof paginationQuerySchema>;

export const toPaginationMeta = (page: number, limit: number, total: number) => ({
  page,
  limit,
  total,
  totalPages: Math.ceil(total / limit),
});
