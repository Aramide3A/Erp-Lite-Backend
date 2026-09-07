import type { ErrorRequestHandler, RequestHandler } from "express";
import { ZodError } from "zod";
import { AppError } from "../errors/app-error";

export const notFoundHandler: RequestHandler = (req, _res, next) => {
  next(new AppError(`Route ${req.method} ${req.originalUrl} was not found.`, 404));
};

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  void _next;

  if (error instanceof ZodError) {
    res.status(422).json({
      message: "Validation failed.",
      issues: error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
    return;
  }

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      message: error.message,
      details: error.details,
    });
    return;
  }

  console.error(error);

  res.status(500).json({
    message: "An unexpected server error occurred.",
  });
};
