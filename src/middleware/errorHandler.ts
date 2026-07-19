import { AppError } from "../utils/app-error.js";
import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
  if (err instanceof Joi.ValidationError) {
    return res.status(400).json({
      success: false,
      message: err.details.map((d) => d.message),
    });
  }

  console.error("Unhandled error:", {
    message: err.message,
    stack: err.stack,
    path: req.originalUrl,
    method: req.method,
  });

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
}
