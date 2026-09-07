import "dotenv/config";
import { z } from "zod";

const booleanFromEnv = z.preprocess((value) => {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    return ["true", "1", "yes"].includes(value.toLowerCase());
  }

  return false;
}, z.boolean());

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  API_PREFIX: z.string().default("/api/v1"),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
  DB_HOST: z.string().default("localhost"),
  DB_PORT: z.coerce.number().int().positive().default(5432),
  DB_USERNAME: z.string().default("postgres"),
  DB_PASSWORD: z.string().default(""),
  DB_DATABASE: z.string().default("erp_lite"),
  DB_SSL: booleanFromEnv.default(false),
  DB_SYNCHRONIZE: booleanFromEnv.default(false),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  throw new Error(`Invalid environment variables: ${parsedEnv.error.message}`);
}

const values = parsedEnv.data;

export const env = {
  nodeEnv: values.NODE_ENV,
  port: values.PORT,
  apiPrefix: values.API_PREFIX,
  corsOrigins: values.CORS_ORIGIN.split(",").map((origin) => origin.trim()),
  database: {
    host: values.DB_HOST,
    port: values.DB_PORT,
    username: values.DB_USERNAME,
    password: values.DB_PASSWORD,
    database: values.DB_DATABASE,
    ssl: values.DB_SSL,
    synchronize: values.DB_SYNCHRONIZE && values.NODE_ENV !== "production",
  },
};
