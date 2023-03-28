import express, { NextFunction, Request, Response } from "express";
import CustomError from "../class/ErrorClass";

export const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next?: NextFunction
) => {
  console.log(err instanceof CustomError ? "custom error" : "fallback error");
  if (err instanceof CustomError) {
    const status = err.status || 500;
    return res.status(status).json({
      error: {
        message: err.message,
        status,
      },
    });
  }
  return res.status(505).json({
    msg: "Something went wrong",
  });
};
