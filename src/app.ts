import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env";
import { errorHandler, notFoundHandler } from "./common/middleware/error.middleware";
import { router } from "./routes";

export const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: env.corsOrigins.includes("*") ? true : env.corsOrigins,
      credentials: true,
    }),
  );
  app.use(express.json({ limit: "1mb" }));
  app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", service: "erp-lite-backend" });
  });

  app.use(env.apiPrefix, router);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
