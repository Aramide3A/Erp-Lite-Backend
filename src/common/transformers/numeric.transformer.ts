import type { ValueTransformer } from "typeorm";

export const numericTransformer: ValueTransformer = {
  to: (value?: number | null) => value,
  from: (value?: string | null) => {
    if (value === null || value === undefined) {
      return value;
    }

    return Number(value);
  },
};
