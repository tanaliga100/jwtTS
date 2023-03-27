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
        text: "you catch the custom error",
      },
    });
  }
  res.status(505).json({
    message: "Something went wrong",
    text: "you catch the last error",
  });
};
