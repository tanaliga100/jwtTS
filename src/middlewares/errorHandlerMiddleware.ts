import express, { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors/CustomError";

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
      message: err.message,
      status,
    });
  }
  res.status(505).json({
    msg: "Something went wrong",
  });
};
