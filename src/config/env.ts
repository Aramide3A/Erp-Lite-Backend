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
  JWT_SECRET: z.string().optional(),
  SESSION_TTL: z.string().default("8h"),
  ADMIN_EMAIL: z.string().email().optional(),
  ADMIN_PASSWORD: z.string().optional(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  throw new Error(`Invalid environment variables: ${parsedEnv.error.message}`);
}

const values = parsedEnv.data;

if (values.NODE_ENV === "production" && !values.JWT_SECRET) {
  throw new Error("JWT_SECRET must be set in production.");
}

if (values.NODE_ENV === "production" && !values.ADMIN_PASSWORD) {
  throw new Error("ADMIN_PASSWORD must be set in production.");
}

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
  auth: {
    jwtSecret:
      values.JWT_SECRET ?? "local-only-erp-lite-development-secret-change-before-production",
    sessionTtl: values.SESSION_TTL,
    sessionCookieMaxAgeMs: 8 * 60 * 60 * 1000,
    adminEmail: values.ADMIN_EMAIL ?? "admin@erp-lite.local",
    adminPassword: values.ADMIN_PASSWORD ?? "ChangeMe123!",
  },
};
