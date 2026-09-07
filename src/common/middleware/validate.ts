import type { RequestHandler } from "express";
import type { AnyZodObject, ZodTypeAny } from "zod";

type RequestSchema = {
  body?: AnyZodObject;
  params?: AnyZodObject;
  query?: AnyZodObject | ZodTypeAny;
};

export const validate =
  (schema: RequestSchema): RequestHandler =>
  (req, _res, next) => {
    if (schema.body) {
      req.body = schema.body.parse(req.body);
    }

    if (schema.params) {
      req.params = schema.params.parse(req.params);
    }

    if (schema.query) {
      req.query = schema.query.parse(req.query);
    }

    next();
  };
