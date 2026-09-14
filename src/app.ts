import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env";
import { errorHandler, notFoundHandler } from "./common/middleware/error.middleware";
import { router } from "./routes";

const isAllowedDevOrigin = (origin: string) => {
  try {
    const url = new URL(origin);
    return (
      env.nodeEnv === "development" &&
      ["localhost", "127.0.0.1", "::1"].includes(url.hostname)
    );
  } catch {
    return false;
  }
};

export const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin(origin, callback) {
        if (
          !origin ||
          env.corsOrigins.includes("*") ||
          env.corsOrigins.includes(origin) ||
          isAllowedDevOrigin(origin)
        ) {
          callback(null, true);
          return;
        }

        callback(new Error(`CORS origin ${origin} is not allowed.`));
      },
      credentials: true,
    }),
  );
  app.use(express.json({ limit: "1mb" }));
  app.use(cookieParser());
  app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", service: "erp-lite-backend" });
  });

  app.use(env.apiPrefix, router);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
