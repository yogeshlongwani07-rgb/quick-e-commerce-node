import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { AppError } from "../utils/app-error.js";
type RequestProperty = "body" | "params" | "query";

export function valdiate(
  schema: ObjectSchema,
  property: RequestProperty = "body",
) {
  return function (req: Request, res: Response, next: NextFunction) {
    const { error, value } = schema.validate(req[property]);
    if (error) {
      const msg = error.details.map(({ message }) => message).join(", ");
      return next(new AppError(msg, 400));
    }
    req[property] = value;
    next();
  };
}
