import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = err.statusCode ?? 500;
  let status = err.status ?? "error";
  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    status = "failed";
  }
  if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    status = "failed";
  }
  if (err.code === 11000) {
    statusCode = 400;
    status = "failed";
  }
  console.log(err.stack);
  res
    .status(statusCode)
    .json({ status: status, message: err.message || "unexprected error" });
};
