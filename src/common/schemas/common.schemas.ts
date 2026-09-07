import { z } from "zod";

export const uuidParamSchema = z.object({
  id: z.string().uuid(),
});

export const optionalDateSchema = z.coerce.date().optional();
